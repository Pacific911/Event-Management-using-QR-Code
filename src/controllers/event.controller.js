import QRcode from 'qrcode';
import sendEmail from '../helpers/mailer';
import eventService from '../services/event.service';
import emailBody from '../utils/emailBody';
import uploadToCloudinaryService from '../services/cloudinary.service';
import eventImageService from '../services/eventImage.service';

const addEvent = async (req, res) => {
  const imageToUpload = req.files;
  if (imageToUpload.length < 1) {
    return res.status(400).json({ message: 'Event must have an image' });
  }
  const { image } = await uploadToCloudinaryService.uploadToCloudinary(
    imageToUpload[0].path,
  );
  const body = {
    ...req.body,
    CompanyId: req.params.cid,
  };
  const data = await eventService.createEvent(body);
  const imageBody = {
    url: image.secure_url,
    EventId: data.id,
  };
  const Eventimage = await eventImageService.addImage(imageBody);
  return res.status(200).json({
    code: 200,
    message: 'successfully registered your event',
    data,
    Eventimage,
  });
};

const deleteEvent = async (req, res) => {
  try {
    const EventId = req.params.eid;
    await eventService.deleteEvent(EventId);
    res.status(200).json({
      code: 200,
      message: 'successfully deleted the event',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: 'An error occurred while deleting the event',
      error: error.message,
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const EventId = req.params.eid;
    const updatedDetails = req.body;
    const updatedEvent = await eventService.updateEvent(
      EventId,
      updatedDetails,
    );
    res.status(200).json({
      code: 200,
      message: 'Event updated successfully',
      data: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: 'An error occurred while updating the event',
      error: error.message,
    });
  }
};

const viewSingleEvent = async (req, res) => {
  const { eid } = req.params;
  const event = await eventService.getEventById(eid);
  res.status(200).json({ code: 200, message: 'Event details', event });
};
const viewSingAttendee = async (req, res) => {
  const { rid } = req.params;
  const event = await eventService.getAttendeeById(rid);
  res.status(200).json({ code: 200, message: 'Attendee details', event });
};

const getAllEvents = async (req, res) => {
  const events = await eventService.getAllEvents();
  res.status(200).json({ code: 200, message: 'All Events', events });
};
const getUserEvents = async (req, res) => {
  const { id } = req.user;
  const events = await eventService.getUserEvents(id);
  res.status(200).json({ code: 200, message: 'All User Events', events });
};
const getCompanyEvents = async (req, res) => {
  const { cid } = req.params;
  const events = await eventService.getCompanyEvents(cid);
  res
    .status(200)
    .json({ code: 200, message: 'Company events retrieved', events });
};
const viewEventAttendees = async (req, res) => {
  const { eid } = req.params;
  const data = await eventService.getEventAttendees(eid);
  res
    .status(200)
    .json({ code: 200, message: 'All event attendees retrieved', data });
};

const RegisterToEvent = async (req, res) => {
  const { paymentEnabled, name } = req.event.dataValues;
  const { role, id, iat, ...userData } = req.user;
  const body = {
    ...userData,
    ...req.body,
    EventId: req.params.eid,
    status: paymentEnabled ? 'PAYMENT_REQUIRED' : 'CONFIRMED',
  };
  if (!paymentEnabled) {
    await eventService.bookSlot(req.params.eid);
  }
  const data = await eventService.registerToEvent(body);

  // send Email
  if (!paymentEnabled) {
    const { createdAt, updatedAt, ...restData } = data.dataValues;
    const approvalCode = await QRcode.toDataURL(JSON.stringify(restData));
    const eBody = emailBody.qrCodeBody(approvalCode, req.user.names, name);
    const mailOptions = {
      from: 'princeineza@gmail.com',
      to: req.user.email,
      subject: 'Event Registration approval',
      attachDataUrls: true,
      html: eBody,
    };
    await sendEmail(mailOptions);
  }

  return res.status(200).json({
    code: 200,
    message: 'successfully registered to event',
    data,
  });
};
export default {
  addEvent,
  RegisterToEvent,
  deleteEvent,
  updateEvent,
  viewSingleEvent,
  getAllEvents,
  viewEventAttendees,
  viewSingAttendee,
  getCompanyEvents,
  getUserEvents,
};
