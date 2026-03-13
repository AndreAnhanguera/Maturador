import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import authRoutes from './modules/auth/auth.routes.js';
import chipsRoutes from './modules/chips/chips.routes.js';
import contactsRoutes from './modules/contacts/contacts.routes.js';
import campaignsRoutes from './modules/campaigns/campaigns.routes.js';
import instancesRoutes from './modules/instances/instances.routes.js';
import logsRoutes from './modules/logs/logs.routes.js';
import messagesRoutes from './modules/messages/messages.routes.js';
import webhooksRoutes from './modules/webhooks/webhooks.routes.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin === '*' ? true : env.corsOrigin }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'whatsapp-maturador-backend' });
});

app.use('/api/auth', authRoutes);
app.use('/api/chips', chipsRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/campaigns', campaignsRoutes);
app.use('/api/instances', instancesRoutes);
app.use('/api/logs', logsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/webhooks', webhooksRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
