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
companyRouter.delete(
  '/delete/:id',
  asyncwrapper(companyController.deleteCompany),
);
companyRouter.get('/all', asyncwrapper(companyController.viewAllCompanies));
companyRouter.get('/:cid', asyncwrapper(companyController.viewSingleCompany));
companyRouter.patch(
  '/update/:cid',
  asyncwrapper(companyMiddleware.companyIdExists),
  asyncwrapper(companyController.updateCompanies),
);

export default companyRouter;
