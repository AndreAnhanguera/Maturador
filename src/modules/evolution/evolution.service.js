import { env } from '../../config/env.js';

function buildHeaders() {
  return {
    'Content-Type': 'application/json',
    apikey: env.evolutionApiKey
  };
}

export async function createEvolutionInstance({ instanceName, webhookUrl }) {
  if (!env.evolutionBaseUrl || !env.evolutionApiKey) {
    return { mocked: true, instance: { instanceName, webhookUrl } };
  }

  const response = await fetch(`${env.evolutionBaseUrl}/instance/create`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify({
      instanceName,
      qrcode: true,
      integration: 'WHATSAPP-BAILEYS',
      webhook: webhookUrl || env.evolutionGlobalWebhook
    })
  });

  return response.json();
}

export async function sendTextMessage({ instanceName, number, text }) {
  if (!env.evolutionBaseUrl || !env.evolutionApiKey) {
    return { mocked: true, key: 'mock-message-id', number, text };
  }

  const response = await fetch(`${env.evolutionBaseUrl}/message/sendText/${instanceName}`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify({
      number,
      text
    })
  });

  return response.json();
}

export async function setEvolutionWebhook({ instanceName, webhookUrl }) {
  if (!env.evolutionBaseUrl || !env.evolutionApiKey) {
    return { mocked: true, instanceName, webhookUrl };
  }

  const response = await fetch(`${env.evolutionBaseUrl}/webhook/set/${instanceName}`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify({
      webhook: {
        enabled: true,
        url: webhookUrl || env.evolutionGlobalWebhook,
        byEvents: false,
        base64: false
      }
    })
  });

  return response.json();
}
