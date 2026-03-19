import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { sendMessage } from './messages.controller.js';

const router = Router();
router.use(authMiddleware);
router.post('/send', asyncHandler(sendMessage));

export default router;
