import { query } from '../../db/query.js';
import { normalizePhone } from '../../utils/phone.js';

export async function listContacts() {
  const result = await query('SELECT * FROM contacts ORDER BY created_at DESC');
  return result.rows;
}

export async function createContact(data) {
  const result = await query(
    `INSERT INTO contacts (name, phone_number, email, tags, status)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (phone_number)
     DO UPDATE SET
       name = EXCLUDED.name,
       email = EXCLUDED.email,
       tags = EXCLUDED.tags,
       status = EXCLUDED.status,
       updated_at = NOW()
     RETURNING *`,
    [data.name || null, normalizePhone(data.phone_number), data.email || null, data.tags || null, data.status || 'active']
  );
  return result.rows[0];
}

export async function importContacts(contacts) {
  const saved = [];
  for (const contact of contacts) {
    const row = await createContact(contact);
    saved.push(row);
  }
  return saved;
}

export async function updateContact(id, data) {
  const result = await query(
    `UPDATE contacts
     SET name = $2,
         phone_number = $3,
         email = $4,
         tags = $5,
         status = $6,
         updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [id, data.name || null, normalizePhone(data.phone_number), data.email || null, data.tags || null, data.status || 'active']
  );
  return result.rows[0] || null;
}

export async function deleteContact(id) {
  await query('DELETE FROM contacts WHERE id = $1', [id]);
  return { success: true };
}
