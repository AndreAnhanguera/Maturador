import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { getAllCampaigns, getCampaign, pause, postCampaign, start, stop } from './campaigns.controller.js';

const router = Router();
router.use(authMiddleware);

router.get('/', asyncHandler(getAllCampaigns));
router.get('/:id', asyncHandler(getCampaign));
router.post('/', asyncHandler(postCampaign));
router.post('/:id/start', asyncHandler(start));
router.post('/:id/pause', asyncHandler(pause));
router.post('/:id/stop', asyncHandler(stop));

export default router;
