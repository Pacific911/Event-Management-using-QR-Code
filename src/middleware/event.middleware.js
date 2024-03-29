import eventService from '../services/event.service';

const eventExists = async (req, res, next) => {
  const data = await eventService.getEventById(req.params.eid);
  if (!data) {
    return res
      .status(400)
      .json({ code: 400, message: 'the event does not exist' });
  }
  return next();
};
const attendeeExists = async (req, res, next) => {
  const data = await eventService.getAttendee(req.body.email, req.params.eid);
  if (data) {
    return res.status(400).json({
      code: 400,
      message: 'Yous have already registered to this event',
    });
  }
  return next();
};

export default { eventExists, attendeeExists };
