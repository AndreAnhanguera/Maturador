import { query } from '../../db/query.js';
import { createEvolutionInstance, setEvolutionWebhook } from '../evolution/evolution.service.js';

export async function listInstances() {
  const result = await query('SELECT * FROM instances ORDER BY created_at DESC');
  return result.rows;
}

export async function getInstanceById(id) {
  const result = await query('SELECT * FROM instances WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function createInstance(data) {
  const result = await query(
    `INSERT INTO instances (chip_id, instance_name)
     VALUES ($1, $2)
     RETURNING *`,
    [data.chip_id || null, data.instance_name]
  );

  const row = result.rows[0];
  const evo = await createEvolutionInstance({ instanceName: row.instance_name });
  await setEvolutionWebhook({ instanceName: row.instance_name });

  const sessionStatus = evo?.instance?.status || evo?.status || 'pending';
  const qrCode = evo?.qrcode?.base64 || evo?.base64 || null;

  const updated = await query(
    `UPDATE instances
     SET session_status = $2,
         qr_code = $3,
         updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [row.id, sessionStatus, qrCode]
  );

  return updated.rows[0];
}

export async function deleteInstance(id) {
  await query('DELETE FROM instances WHERE id = $1', [id]);
  return { success: true };
}

export async function reconnectInstance(id) {
  const row = await getInstanceById(id);
  if (!row) return null;

  const evo = await createEvolutionInstance({ instanceName: row.instance_name });
  const sessionStatus = evo?.instance?.status || evo?.status || 'pending';
  const qrCode = evo?.qrcode?.base64 || evo?.base64 || null;

  const updated = await query(
    `UPDATE instances
     SET session_status = $2,
         qr_code = COALESCE($3, qr_code),
         updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [id, sessionStatus, qrCode]
  );

  return updated.rows[0];
}

export async function updateInstanceStatusByName(instanceName, sessionStatus, qrCode = null) {
  const result = await query(
    `UPDATE instances
     SET session_status = $2,
         qr_code = COALESCE($3, qr_code),
         last_connection_at = CASE WHEN $2 = 'open' THEN NOW() ELSE last_connection_at END,
         updated_at = NOW()
     WHERE instance_name = $1
     RETURNING *`,
    [instanceName, sessionStatus, qrCode]
  );
  return result.rows[0] || null;
}
