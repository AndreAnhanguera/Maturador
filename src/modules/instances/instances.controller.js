import { instanceSchema } from './instances.schema.js';
import { createInstance, listInstances } from './instances.service.js';

export async function getAllInstances(req, res) {
  const rows = await listInstances();
  res.json(rows);
}

export async function postInstance(req, res) {
  const data = instanceSchema.parse(req.body);
  const row = await createInstance(data);
  res.status(201).json(row);
}
