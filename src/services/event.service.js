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
async function bookSlot(id) {
  const event = await Events.findOne({ where: { id } });
  event.slotNumber -= 1;
  await event.save();
  return event;
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
async function getAttendeeById(id) {
  const user = await Attendees.findOne({
    where: { id },
    include: [{ model: Events, as: 'Event' }],
  });
  return user;
}
async function attendeeStatus(id, status) {
  const user = await Attendees.update(
    { status },
    {
      where: { id },
      returning: true,
    },
  );
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
  getAttendeeById,
  attendeeStatus,
  bookSlot,
};
