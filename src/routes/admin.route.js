import express from 'express';
import isAuthenticated from '../middleware/authentication';
import checkPermission from '../middleware/checkPermission.middleware';
import asyncwrapper from '../helpers/asyncwrapper';
import adminController from '../controllers/admin.controller';
import userMiddleware from '../middleware/user.middleware';

const adminRoute = express.Router();

adminRoute.patch(
  '/role/:uid',
  isAuthenticated,
  checkPermission('SUPER_ADMIN'),
  asyncwrapper(userMiddleware.userExists),
  asyncwrapper(adminController.changeUserRole),
);
export default adminRoute;
