import { Router } from 'express';
import { loginUserSchema, loginWithGoogleOAuthSchema, registerUserSchema, requestResetEmailSchema, resetPasswordSchema } from '../validation/auth.js';
import { getGoogleOAuthUrlController, loginUserController, loginWithGoogleController, logoutUserController, refreshUserSessionController, registerUserController, requestResetEmailController, resetPasswordController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  validateBody(registerUserSchema),
  registerUserController
);

authRouter.post(
  '/auth/login',
  validateBody(loginUserSchema),
  loginUserController,
);

authRouter.post(
  '/auth/refresh',
  refreshUserSessionController
);

authRouter.post(
  '/auth/logout',
  logoutUserController
);

authRouter.post(
  '/auth/request-reset-email',
  validateBody(requestResetEmailSchema),
  requestResetEmailController,
);

authRouter.post(
  '/auth/reset-pwd',
  validateBody(resetPasswordSchema),
  resetPasswordController,
);

authRouter.get(
  '/auth/get-oauth-url',
  getGoogleOAuthUrlController
);

authRouter.post(
  '/auth/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  loginWithGoogleController,
);

export default authRouter;