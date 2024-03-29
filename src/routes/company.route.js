import { Router } from 'express';
import '../middleware/passport';
import companyMiddleware from '../middleware/company.middleware';
import companyController from '../controllers/company.controller';
import asyncwrapper from '../helpers/asyncwrapper';
import isAuthenticated from '../middleware/authentication';

const companyRouter = Router();
companyRouter.post(
  '/add',
  isAuthenticated,
  asyncwrapper(companyMiddleware.companyExists),
  asyncwrapper(companyController.addCOmpany),
);

export default companyRouter;
