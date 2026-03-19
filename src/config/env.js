import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 3001),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  databaseUrl: process.env.DATABASE_URL,
  evolutionBaseUrl: process.env.EVOLUTION_BASE_URL || '',
  evolutionApiKey: process.env.EVOLUTION_API_KEY || '',
  evolutionGlobalWebhook: process.env.EVOLUTION_GLOBAL_WEBHOOK || '',
  n8nWebhookStartUrl: process.env.N8N_WEBHOOK_START_URL || '',
  n8nCallbackSecret: process.env.N8N_CALLBACK_SECRET || ''
};

if (!env.databaseUrl) {
  throw new Error('DATABASE_URL não configurada.');
}
