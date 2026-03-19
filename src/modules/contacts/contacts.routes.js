import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { bulkImportContacts, getAllContacts, patchContact, postContact, removeContact } from './contacts.controller.js';

const router = Router();
router.use(authMiddleware);

router.get('/', asyncHandler(getAllContacts));
router.post('/', asyncHandler(postContact));
router.post('/import', asyncHandler(bulkImportContacts));
router.patch('/:id', asyncHandler(patchContact));
router.delete('/:id', asyncHandler(removeContact));

export default router;
