import { sendTextMessage } from '../evolution/evolution.service.js';
import { logAction } from '../logs/logs.service.js';
import { sendMessageSchema } from './messages.schema.js';

export async function sendMessage(req, res) {
  const data = sendMessageSchema.parse(req.body);
  const providerResponse = await sendTextMessage({
    instanceName: data.instance_name,
    number: data.number,
    text: data.text
  });

  const log = await logAction({
    campaignId: data.campaign_id || null,
    contactId: data.contact_id || null,
    instanceId: data.instance_id || null,
    direction: 'outbound',
    status: 'sent',
    payload: data,
    response: providerResponse
  });

  res.json({ ok: true, providerResponse, log });
}
