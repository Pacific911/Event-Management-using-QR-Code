import eventService from '../services/event.service';

const checkPayedAttendee = async (req, res, next) => {
  const data = await eventService.getAttendeeById(req.params.rid);
  if (data.status === 'CONFIRMED') {
    return res.status(400).json({
      code: 400,
      message: 'You already payed for this event',
    });
  }
  return next();
};

export default { checkPayedAttendee };
