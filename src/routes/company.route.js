import { Router } from 'express';
import '../middleware/passport';
import companyMiddleware from '../middleware/company.middleware';
import companyController from '../controllers/company.controller';
import asyncwrapper from '../helpers/asyncwrapper';
import isAuthenticated from '../middleware/authentication';
import eventController from '../controllers/event.controller';
import Upload from '../helpers/multer.helper';
import validate from '../middleware/validation.middleware';
import companySchema from '../utils/validationSchemas/companySchema';
import checkPermission from '../middleware/checkPermission.middleware';

const companyRouter = Router();
companyRouter.post(
  '/add',
  Upload,
  validate(companySchema.NewCompany),
  isAuthenticated,
  asyncwrapper(companyMiddleware.companyExists),
  asyncwrapper(companyController.addCOmpany),
);
companyRouter.delete(
  '/delete/:cid',
  isAuthenticated,
  checkPermission('ADMIN'),
  asyncwrapper(companyMiddleware.companyIdExists),
  asyncwrapper(companyController.deleteCompany),
);
companyRouter.get('/all', asyncwrapper(companyController.viewAllCompanies));
companyRouter.get(
  '/user/all',
  isAuthenticated,
  checkPermission('ADMIN'),
  asyncwrapper(companyController.viewAllCompanies),
);
companyRouter.get('/:cid', asyncwrapper(companyController.viewSingleCompany));
companyRouter.get(
  '/events/:cid',
  isAuthenticated,
  asyncwrapper(companyMiddleware.companyIdExists),
  asyncwrapper(eventController.getCompanyEvents),
);
companyRouter.patch(
  '/update/:cid',
  asyncwrapper(companyMiddleware.companyIdExists),
  asyncwrapper(companyController.updateCompanies),
);

export default companyRouter;
