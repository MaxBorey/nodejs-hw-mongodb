import { Router } from 'express';
import { deleteContactsController, getContactsController, getContactsIdController, patchContactsController, postContacts as postContactsController } from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', getContactsController);
router.get('/contacts/:contactId', getContactsIdController);
router.post('/contacts', postContactsController);
router.patch('/contacts/:contactId', patchContactsController);
router.delete('/contacts/:contactId', deleteContactsController);


export default router;