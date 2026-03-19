import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { getAllChips, patchChip, postChip, removeChip } from './chips.controller.js';

const router = Router();
router.use(authMiddleware);

router.get('/', asyncHandler(getAllChips));
router.post('/', asyncHandler(postChip));
router.patch('/:id', asyncHandler(patchChip));
router.delete('/:id', asyncHandler(removeChip));

export default router;
