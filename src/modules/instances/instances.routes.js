import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { getAllInstances, getInstance, getInstanceQr, postInstance, postReconnect, removeInstance } from './instances.controller.js';

const router = Router();
router.use(authMiddleware);

router.get('/', asyncHandler(getAllInstances));
router.get('/:id', asyncHandler(getInstance));
router.get('/:id/qr', asyncHandler(getInstanceQr));
router.post('/', asyncHandler(postInstance));
router.post('/:id/reconnect', asyncHandler(postReconnect));
router.delete('/:id', asyncHandler(removeInstance));

export default router;
