import { Router } from 'express';
import '../middleware/passport';
import userController from '../controllers/user.controller';
import asyncwrapper from '../helpers/asyncwrapper';
import validate from '../middleware/validation.middleware';
import {
  SignUpSchema,
  // loginSchema,
} from '../utils/validationSchemas/authSchema';
import userMiddleware from '../middleware/user.middleware';
import isAuthenticated from '../middleware/authentication';

const userRouter = Router();
userRouter.post(
  '/signup',
  asyncwrapper(userMiddleware.userEmailExists),
  validate(SignUpSchema),
  asyncwrapper(userController.signUp),
);
userRouter.post(
  '/login',
  // validate(loginSchema),
  asyncwrapper(userController.login),
);
userRouter.get(
  '/',
  isAuthenticated,
  checkPermission('SUPER_ADMIN'),
  asyncwrapper(userController.fetchAllUsers),
);

export default userRouter;
