import { query } from '../../db/query.js';
import { sendTextMessage } from '../evolution/evolution.service.js';
import { logAction } from '../logs/logs.service.js';

export async function sendMessage({ instanceName, number, text, campaignId = null, contactId = null, instanceId = null }) {
  const providerResponse = await sendTextMessage({ instanceName, number, text });

  const log = await logAction({
    campaignId,
    contactId,
    instanceId,
    direction: 'outbound',
    status: 'sent',
    payload: { instanceName, number, text },
    response: providerResponse
  });

  return { providerResponse, log };
}

export async function listMessages({ campaignId, contactId, limit = 100, offset = 0 } = {}) {
  let sql = 'SELECT * FROM message_logs WHERE 1=1';
  const params = [];

  if (campaignId) {
    params.push(campaignId);
    sql += ` AND campaign_id = $${params.length}`;
  }

  if (contactId) {
    params.push(contactId);
    sql += ` AND contact_id = $${params.length}`;
  }

  params.push(limit);
  sql += ` ORDER BY created_at DESC LIMIT $${params.length}`;
  params.push(offset);
  sql += ` OFFSET $${params.length}`;

  const result = await query(sql, params);
  return result.rows;
}
