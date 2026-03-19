import { sendMessageSchema } from './messages.schema.js';
import { listMessages, sendMessage } from './messages.service.js';

export async function postSendMessage(req, res) {
  const data = sendMessageSchema.parse(req.body);

  const result = await sendMessage({
    instanceName: data.instance_name,
    number: data.number,
    text: data.text,
    campaignId: data.campaign_id || null,
    contactId: data.contact_id || null,
    instanceId: data.instance_id || null
  });

  res.json({ ok: true, ...result });
}

export async function getMessages(req, res) {
  const { campaign_id, contact_id, limit, offset } = req.query;

  const rows = await listMessages({
    campaignId: campaign_id || null,
    contactId: contact_id || null,
    limit: limit ? Number(limit) : 100,
    offset: offset ? Number(offset) : 0
  });

  res.json(rows);
}
