import { query } from '../../db/query.js';

export async function listLogs() {
  const result = await query('SELECT * FROM message_logs ORDER BY created_at DESC LIMIT 500');
  return result.rows;
}

export async function logAction({ campaignId = null, contactId = null, instanceId = null, direction = 'system', status = 'info', payload = null, response = null }) {
  const result = await query(
    `INSERT INTO message_logs (campaign_id, contact_id, instance_id, direction, status, payload, response)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [campaignId, contactId, instanceId, direction, status, payload, response]
  );
  return result.rows[0];
}
