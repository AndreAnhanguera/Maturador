import { chipSchema } from './chips.schema.js';
import { createChip, deleteChip, listChips, updateChip } from './chips.service.js';
import { HttpError } from '../../utils/httpError.js';

export async function getAllChips(req, res) {
  const rows = await listChips();
  res.json(rows);
}

export async function postChip(req, res) {
  const data = chipSchema.parse(req.body);
  const row = await createChip(data);
  res.status(201).json(row);
}

export async function patchChip(req, res) {
  const data = chipSchema.parse(req.body);
  const row = await updateChip(req.params.id, data);
  if (!row) throw new HttpError(404, 'Chip não encontrado.');
  res.json(row);
}

export async function removeChip(req, res) {
  await deleteChip(req.params.id);
  res.json({ success: true });
}
