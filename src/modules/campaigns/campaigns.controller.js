import { HttpError } from '../../utils/httpError.js';
import { campaignSchema } from './campaigns.schema.js';
import { createCampaign, getCampaignById, listCampaigns, startCampaign, updateCampaignStatus } from './campaigns.service.js';

export async function getAllCampaigns(req, res) {
  const rows = await listCampaigns();
  res.json(rows);
}

export async function getCampaign(req, res) {
  const row = await getCampaignById(req.params.id);
  if (!row) throw new HttpError(404, 'Campanha não encontrada.');
  res.json(row);
}

export async function postCampaign(req, res) {
  const data = campaignSchema.parse(req.body);
  const row = await createCampaign(data, req.user.sub);
  res.status(201).json(row);
}

export async function start(req, res) {
  const row = await startCampaign(req.params.id);
  if (!row) throw new HttpError(404, 'Campanha não encontrada.');
  res.json(row);
}

export async function pause(req, res) {
  const row = await updateCampaignStatus(req.params.id, 'paused');
  if (!row) throw new HttpError(404, 'Campanha não encontrada.');
  res.json(row);
}

export async function stop(req, res) {
  const row = await updateCampaignStatus(req.params.id, 'stopped');
  if (!row) throw new HttpError(404, 'Campanha não encontrada.');
  res.json(row);
}
