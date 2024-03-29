import { Router } from 'express';
import '../middleware/passport';
import companyMiddleware from '../middleware/company.middleware';
import eventController from '../controllers/event.controller';
import asyncwrapper from '../helpers/asyncwrapper';
import isAuthenticated from '../middleware/authentication';
import eventMiddleware from '../middleware/event.middleware';

const eventRouter = Router();
eventRouter.post(
  '/add/:cid',
  isAuthenticated,
  asyncwrapper(companyMiddleware.companyIdExists),
  asyncwrapper(eventController.addEvent),
);
eventRouter.post(
  '/register/:eid',
  asyncwrapper(eventMiddleware.eventExists),
  asyncwrapper(eventMiddleware.attendeeExists),
  asyncwrapper(eventController.RegisterToEvent),
);

export default eventRouter;
