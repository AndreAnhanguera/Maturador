import { listLogs } from './logs.service.js';

export async function getAllLogs(req, res) {
  const rows = await listLogs();
  res.json(rows);
}
