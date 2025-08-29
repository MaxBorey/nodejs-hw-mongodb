import { Router } from 'express';
import { deleteContactsController, getContactsController, getContactsIdController, patchContactsController, postContacts as postContactsController } from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactShema, updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

router.get('/contacts', getContactsController);
router.get('/contacts/:contactId', isValidId, getContactsIdController);
router.post('/contacts', upload.single('photo'), validateBody(createContactShema), postContactsController);
router.patch('/contacts/:contactId', upload.single('photo'), isValidId, validateBody(updateContactSchema), patchContactsController);
router.delete('/contacts/:contactId', isValidId, deleteContactsController);


export default router;