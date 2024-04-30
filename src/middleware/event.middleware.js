import eventService from '../services/event.service';

const eventExists = async (req, res, next) => {
  const data = await eventService.getEventById(req.params.eid);
  if (!data) {
    return res
      .status(400)
      .json({ code: 400, message: 'the event does not exist' });
  }
  req.event = data;
  // const { UserId } = data.Company;
  // if (UserId !== req.user.id) {
  //   return res
  //     .status(400)
  //     .json({ code: 400, message: 'Unauthorized to this event' });
  // }
  return next();
};
const attendeIdExists = async (req, res, next) => {
  const data = await eventService.getAttendeeById(req.params.rid);
  if (!data) {
    return res
      .status(400)
      .json({ code: 400, message: 'the attende does not exist' });
  }
  req.attendee = data;
  return next();
};
const attendeeExists = async (req, res, next) => {
  const data = await eventService.getAttendee(req.user.email, req.params.eid);
  if (data) {
    return res.status(400).json({
      code: 400,
      message: 'Yous have already registered to this event',
    });
  }
  return next();
};
const eventSlotNumberAvailable = async (req, res, next) => {
  const data = await eventService.getEventById(req.params.eid);
  const { slotNumber } = data;
  if (slotNumber <= 0) {
    return res.status(400).json({
      code: 400,
      message: " this event's slots are currently full",
    });
  }
  return next();
};
const eventSlotsOnPayment = async (req, res, next) => {
  const data = await eventService.getAttendeeById(req.params.rid);
  const event = await data.getEvent();
  if (event.slotNumber <= 0) {
    return res.status(400).json({
      code: 400,
      message: "You can't pay. this event's slots are currently full",
    });
  }
  return next();
};

export default {
  eventExists,
  attendeeExists,
  attendeIdExists,
  eventSlotNumberAvailable,
  eventSlotsOnPayment,
};
