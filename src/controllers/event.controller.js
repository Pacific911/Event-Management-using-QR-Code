import eventService from '../services/event.service';

const addEvent = async (req, res) => {
  const body = {
    ...req.body,
    CompanyId: req.params.cid,
  };
  const data = await eventService.createEvent(body);
  return res.status(200).json({
    code: 200,
    message: 'successfully registered your event',
    data,
  });
};
const RegisterToEvent = async (req, res) => {
  const body = {
    ...req.body,
    EventId: req.params.eid,
  };
  const data = await eventService.registerToEvent(body);
  return res.status(200).json({
    code: 200,
    message: 'successfully registered to event',
    data,
  });
};
export default { addEvent, RegisterToEvent };
