import { Router } from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';

const router = Router();

router.use(authRouter);
router.use(contactsRouter);

export default router;