import { query } from '../../db/query.js';
import { normalizePhone } from '../../utils/phone.js';

export async function listChips() {
  const result = await query('SELECT * FROM chips ORDER BY created_at DESC');
  return result.rows;
}

export async function createChip(data) {
  const result = await query(
    `INSERT INTO chips (name, phone_number, provider, status, notes)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [data.name, normalizePhone(data.phone_number), data.provider || null, data.status || 'inactive', data.notes || null]
  );
  return result.rows[0];
}

export async function updateChip(id, data) {
  const result = await query(
    `UPDATE chips
     SET name = $2,
         phone_number = $3,
         provider = $4,
         status = $5,
         notes = $6,
         updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [id, data.name, normalizePhone(data.phone_number), data.provider || null, data.status || 'inactive', data.notes || null]
  );
  return result.rows[0] || null;
}

export async function deleteChip(id) {
  await query('DELETE FROM chips WHERE id = $1', [id]);
  return { success: true };
}
