import { env } from '../../config/env.js';
import { query } from '../../db/query.js';
import { updateInstanceStatusByName } from '../instances/instances.service.js';
import { logAction } from '../logs/logs.service.js';

export async function evolutionWebhook(req, res) {
  const payload = req.body;
  await query(
    `INSERT INTO webhook_events (source, event_name, payload, processed)
     VALUES ('evolution', $1, $2, false)`,
    [payload?.event || payload?.type || null, payload]
  );

  const instanceName = payload?.instance || payload?.instanceName || payload?.data?.instanceName;
  const sessionStatus = payload?.data?.state || payload?.state || payload?.status;
  const qrCode = payload?.data?.qrcode?.base64 || payload?.qrcode?.base64 || null;

  if (instanceName && sessionStatus) {
    await updateInstanceStatusByName(instanceName, sessionStatus, qrCode);
  }

  await logAction({
    direction: 'webhook',
    status: 'evolution_event',
    payload
  });

  res.json({ received: true });
}

export async function n8nCallback(req, res) {
  const secret = req.headers['x-callback-secret'];
  if (env.n8nCallbackSecret && secret !== env.n8nCallbackSecret) {
    return res.status(401).json({ error: 'Callback não autorizado.' });
  }

  const payload = req.body;
  await query(
    `INSERT INTO webhook_events (source, event_name, payload, processed)
     VALUES ('n8n', $1, $2, true)`,
    [payload?.event || 'workflow_callback', payload]
  );

  await logAction({
    campaignId: payload?.campaignId || null,
    direction: 'webhook',
    status: payload?.status || 'n8n_callback',
    payload
  });

  res.json({ received: true });
}
