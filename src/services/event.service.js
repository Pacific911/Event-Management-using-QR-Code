import Events from '../database/models/events';
import Attendees from '../database/models/attendee';
import Companies from '../database/models/company';
import EventImages from '../database/models/eventimages';
import eventImageService from './eventImage.service';

async function createEvent(details) {
  const user = await Events.create(details);
  return user;
}
async function deleteEvent(id) {
  const event = await Events.findOne({ where: { id } });
  const images = await event.getEventImages();
  const [destroyResult, deleteImage] = await Promise.all([
    Events.destroy({ where: { id } }),
    eventImageService.deleteUrl(images[0].url),
  ]);
  return { destroyResult, deleteImage };
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
  const user = await Events.findOne({
    where: { id },

    include: [
      {
        model: Companies,
        as: 'Company',
      },
      {
        model: EventImages,
        as: 'EventImages',
      },
    ],
  });
  return user;
}
async function getAllEvents() {
  const user = await Events.findAll({
    include: [
      {
        model: EventImages,
        as: 'EventImages',
      },
    ],
  });
  return user;
}
async function getUserEvents(uid) {
  const user = await Events.findAll({
    include: [
      {
        model: EventImages,
        as: 'EventImages',
      },
      {
        model: Companies,
        as: 'Company',
        where: { UserId: uid },
      },
    ],
  });
  return user;
}
async function getCompanyEvents(id) {
  const events = await Events.findAll({
    where: { CompanyId: id },
    include: [
      {
        model: EventImages,
        as: 'EventImages',
      },
    ],
  });
  return events;
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
async function getEventAttendees(id) {
  const result = await Attendees.findAll({
    where: { EventId: id },
  });
  return result;
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
  getEventAttendees,
  getCompanyEvents,
  getUserEvents,
};
