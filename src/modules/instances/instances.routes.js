import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { getAllInstances, postInstance } from './instances.controller.js';

const router = Router();
router.use(authMiddleware);

router.get('/', asyncHandler(getAllInstances));
router.post('/', asyncHandler(postInstance));

export default router;
