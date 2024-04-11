import express from 'express';

import userRoutes from './user.route';
import companyRouter from './company.route';
import eventRouter from './event.route';
import adminRoute from './admin.route';

const routes = express.Router();

routes.get('/', () => {});
routes.use('/users', userRoutes);
routes.use('/company', companyRouter);
routes.use('/event', eventRouter);
routes.use('/admin', adminRoute);

export default routes;
