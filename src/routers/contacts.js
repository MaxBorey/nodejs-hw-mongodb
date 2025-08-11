import { Router } from 'express';
import { deleteContactsController, getContactsController, getContactsIdController, patchContactsController, postContacts as postContactsController } from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactShema, updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/contacts', getContactsController);
router.get('/contacts/:contactId', isValidId, getContactsIdController);
router.post('/contacts', validateBody(createContactShema), postContactsController);
router.patch('/contacts/:contactId', isValidId, validateBody(updateContactSchema), patchContactsController);
router.delete('/contacts/:contactId', isValidId, deleteContactsController);


export default router;