import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { getMessages, postSendMessage } from './messages.controller.js';

const router = Router();
router.use(authMiddleware);

router.get('/', asyncHandler(getMessages));
router.post('/send', asyncHandler(postSendMessage));

export default router;
