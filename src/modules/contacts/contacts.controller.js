import { HttpError } from '../../utils/httpError.js';
import { contactSchema, contactsImportSchema } from './contacts.schema.js';
import { createContact, deleteContact, importContacts, listContacts, updateContact } from './contacts.service.js';

export async function getAllContacts(req, res) {
  const rows = await listContacts();
  res.json(rows);
}

export async function postContact(req, res) {
  const data = contactSchema.parse(req.body);
  const row = await createContact(data);
  res.status(201).json(row);
}

export async function bulkImportContacts(req, res) {
  const data = contactsImportSchema.parse(req.body);
  const rows = await importContacts(data.contacts);
  res.status(201).json({ count: rows.length, rows });
}

export async function patchContact(req, res) {
  const data = contactSchema.parse(req.body);
  const row = await updateContact(req.params.id, data);
  if (!row) throw new HttpError(404, 'Contato não encontrado.');
  res.json(row);
}

export async function removeContact(req, res) {
  await deleteContact(req.params.id);
  res.json({ success: true });
}
