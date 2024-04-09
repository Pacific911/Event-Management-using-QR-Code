import Events from '../database/models/events';
import Attendees from '../database/models/attendee';

async function createEvent(details) {
  const user = await Events.create(details);
  return user;
}
async function deleteEvent(id) {
  const user = await Events.destroy({ where: { id } });
  return user;
}
async function updateEvent(id, details) {
  try {
    const event = await Events.findByPk(id);
    if (!event) {
      throw new Error('Event not found');
    }
    await event.update(details);
    return event;
  } catch (error) {
    throw new Error(`Error updating event: ${error.message}`);
  }
}
async function getEventById(id) {
  const user = await Events.findOne({ where: { id } });
  return user;
}
async function getAllEvents() {
  const user = await Events.findAll();
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
  deleteEvent,
  updateEvent,
  getEventById,
  getAllEvents,
  registerToEvent,
  getAttendee,
};
