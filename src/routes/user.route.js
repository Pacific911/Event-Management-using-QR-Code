import { Router } from 'express';
import '../middleware/passport';
import userController from '../controllers/user.controller';
import asyncwrapper from '../helpers/asyncwrapper';

const userRouter = Router();
userRouter.post('/signup', asyncwrapper(userController.signUp));
userRouter.post('/login', asyncwrapper(userController.login));

export default userRouter;
