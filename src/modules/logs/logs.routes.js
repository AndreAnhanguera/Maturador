import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { getAllLogs } from './logs.controller.js';

const router = Router();
router.use(authMiddleware);
router.get('/', asyncHandler(getAllLogs));

export default router;
