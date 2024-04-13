import express from 'express';
import paymentController from '../controllers/payment.controller';
import asyncwrapper from '../helpers/asyncwrapper';
import isAuthenticated from '../middleware/authentication';
import checkPermission from '../middleware/checkPermission.middleware';
import eventMiddleware from '../middleware/event.middleware';
import paymentMiddleware from '../middleware/payment.middleware';

const paymentRouter = express.Router();

paymentRouter.get('/token', asyncwrapper(paymentController.generateToken));
paymentRouter.post(
  '/charge/:rid',
  isAuthenticated,
  checkPermission('ATTENDEE'),
  asyncwrapper(eventMiddleware.attendeIdExists),
  asyncwrapper(paymentMiddleware.checkPayedAttendee),
  asyncwrapper(eventMiddleware.eventSlotsOnPayment),
  asyncwrapper(paymentController.makePayment),
);
paymentRouter.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  asyncwrapper(paymentController.webhook),
);
export default paymentRouter;
