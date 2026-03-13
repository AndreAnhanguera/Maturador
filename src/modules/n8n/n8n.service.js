import { env } from '../../config/env.js';

export async function triggerN8nCampaignStart(payload) {
  if (!env.n8nWebhookStartUrl) {
    return { mocked: true, payload };
  }

  const response = await fetch(env.n8nWebhookStartUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-callback-secret': env.n8nCallbackSecret
    },
    body: JSON.stringify(payload)
  });

  return response.json().catch(() => ({ ok: response.ok }));
}
