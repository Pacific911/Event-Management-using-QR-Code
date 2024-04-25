import { Router } from 'express';
import '../middleware/passport';
import companyMiddleware from '../middleware/company.middleware';
import eventController from '../controllers/event.controller';
import asyncwrapper from '../helpers/asyncwrapper';
import isAuthenticated from '../middleware/authentication';
import eventMiddleware from '../middleware/event.middleware';
import checkPermission from '../middleware/checkPermission.middleware';
import Upload from '../helpers/multer.helper';
import validate from '../middleware/validation.middleware';
import eventSchema from '../utils/validationSchemas/eventSchema';

const eventRouter = Router();
eventRouter.post(
  '/add/:cid',
  Upload,
  validate(eventSchema.NewEvent),
  isAuthenticated,
  asyncwrapper(companyMiddleware.companyIdExists),
  asyncwrapper(eventController.addEvent),
);
eventRouter.delete(
  '/delete/:eid',
  isAuthenticated,
  asyncwrapper(eventMiddleware.eventExists),
  asyncwrapper(eventController.deleteEvent),
);
eventRouter.get(
  '/:eid',
  isAuthenticated,
  asyncwrapper(eventMiddleware.eventExists),
  asyncwrapper(eventController.viewSingleEvent),
);
eventRouter.get(
  '/attendee/:rid',
  isAuthenticated,
  asyncwrapper(eventMiddleware.attendeIdExists),
  asyncwrapper(eventController.viewSingAttendee),
);
eventRouter.patch(
  '/update/:eid',
  asyncwrapper(eventMiddleware.eventExists),
  asyncwrapper(eventController.updateEvent),
);
eventRouter.get('/all', asyncwrapper(eventController.getAllEvents));

eventRouter.get(
  '/:eid/attendees',
  isAuthenticated,
  checkPermission('ADMIN'),
  asyncwrapper(eventMiddleware.eventExists),
  asyncwrapper(eventController.viewEventAttendees),
);
eventRouter.post(
  '/register/:eid',
  isAuthenticated,
  checkPermission('ATTENDEE'),
  asyncwrapper(eventMiddleware.eventExists),
  asyncwrapper(eventMiddleware.attendeeExists),
  asyncwrapper(eventMiddleware.eventSlotNumberAvailable),
  asyncwrapper(eventController.RegisterToEvent),
);

// approve event registration
eventRouter.patch(
  '/approve/:rid',
  isAuthenticated,
  checkPermission('ADMIN'),
  asyncwrapper(eventMiddleware.attendeIdExists),
  asyncwrapper(eventController.approveAttende),
);

export default eventRouter;
