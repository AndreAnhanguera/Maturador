import { query } from '../../db/query.js';
import { logAction } from '../logs/logs.service.js';
import { triggerN8nCampaignStart } from '../n8n/n8n.service.js';

export async function listCampaigns() {
  const result = await query('SELECT * FROM campaigns ORDER BY created_at DESC');
  return result.rows;
}

export async function getCampaignById(id) {
  const result = await query('SELECT * FROM campaigns WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function createCampaign(data, userId) {
  const campaign = await query(
    `INSERT INTO campaigns (name, template, chip_id, created_by, interval_seconds, pause_every, pause_seconds)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [data.name, data.template, data.chip_id || null, userId, data.interval_seconds, data.pause_every, data.pause_seconds]
  );

  for (const contactId of data.contact_ids || []) {
    await query(
      `INSERT INTO campaign_contacts (campaign_id, contact_id)
       VALUES ($1, $2)
       ON CONFLICT (campaign_id, contact_id) DO NOTHING`,
      [campaign.rows[0].id, contactId]
    );
  }

  await logAction({
    status: 'created',
    payload: { campaignId: campaign.rows[0].id, contactIds: data.contact_ids || [] }
  });

  return campaign.rows[0];
}

export async function updateCampaignStatus(id, status) {
  const result = await query(
    `UPDATE campaigns
     SET status = $2, updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [id, status]
  );
  return result.rows[0] || null;
}

export async function startCampaign(id) {
  const campaign = await getCampaignById(id);
  if (!campaign) return null;

  const contacts = await query(
    `SELECT c.*
     FROM campaign_contacts cc
     JOIN contacts c ON c.id = cc.contact_id
     WHERE cc.campaign_id = $1
     ORDER BY c.created_at ASC`,
    [id]
  );

  const updated = await updateCampaignStatus(id, 'running');
  await triggerN8nCampaignStart({ ...updated, contacts: contacts.rows });
  return updated;
}
