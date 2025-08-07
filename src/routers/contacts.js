import { Router } from 'express';
import { getContactsController, getContactsIdController } from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', getContactsController);
router.get('/contacts/:contactId', getContactsIdController);



export default router;