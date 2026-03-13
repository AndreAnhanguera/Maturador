import { HttpError } from '../../utils/httpError.js';
import { instanceSchema } from './instances.schema.js';
import { createInstance, deleteInstance, getInstanceById, listInstances, reconnectInstance } from './instances.service.js';

export async function getAllInstances(req, res) {
  const rows = await listInstances();
  res.json(rows);
}

export async function getInstance(req, res) {
  const row = await getInstanceById(req.params.id);
  if (!row) throw new HttpError(404, 'Instância não encontrada.');
  res.json(row);
}

export async function getInstanceQr(req, res) {
  const row = await getInstanceById(req.params.id);
  if (!row) throw new HttpError(404, 'Instância não encontrada.');
  if (!row.qr_code) throw new HttpError(404, 'QR Code não disponível para esta instância.');
  res.json({ qr_code: row.qr_code, session_status: row.session_status });
}

export async function postInstance(req, res) {
  const data = instanceSchema.parse(req.body);
  const row = await createInstance(data);
  res.status(201).json(row);
}

export async function postReconnect(req, res) {
  const row = await reconnectInstance(req.params.id);
  if (!row) throw new HttpError(404, 'Instância não encontrada.');
  res.json(row);
}

export async function removeInstance(req, res) {
  await deleteInstance(req.params.id);
  res.json({ success: true });
}
