import Events from '../database/models/events';
import Attendees from '../database/models/attendee';

async function createEvent(details) {
  const user = await Events.create(details);
  return user;
}
async function getEventById(id) {
  const user = await Events.findOne({ where: { id } });
  return user;
}
async function registerToEvent(details) {
  const user = await Attendees.create(details);
  return user;
}
async function getAttendee(email, eventId) {
  const user = await Attendees.findOne({
    where: { email, EventId: eventId },
  });
  return user;
}
export default {
  createEvent,
  getEventById,
  registerToEvent,
  getAttendee,
};
