import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { evolutionWebhook, n8nCallback } from './webhooks.controller.js';

const router = Router();
router.post('/evolution', asyncHandler(evolutionWebhook));
router.post('/n8n/callback', asyncHandler(n8nCallback));

export default router;
