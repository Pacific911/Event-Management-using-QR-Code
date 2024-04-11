import QRcode from 'qrcode';
import sendEmail from '../helpers/mailer';
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

const deleteEvent = async (req, res) => {
  try {
    const EventId = req.params.eid;
    await eventService.deleteEvent(EventId);
    res.status(200).json({
      code: 200,
      message: 'successfully deleted',
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

const getAllEvents = async (req, res) => {
  const events = await eventService.getAllEvents();
  res.status(200).json({ code: 200, message: 'All Events', events });
};

const approveAttende = async (req, res) => {
  await eventService.approveAttende(req.params.rid).then(async (response) => {
    // console.log(response[1]);
    const recipientEmail = response[1][0].email;
    const approvalCode = await QRcode.toDataURL(JSON.stringify(response[1][0]));
    const mailOptions = {
      from: 'nduwumwepacific@gmail.com',
      to: recipientEmail,
      subject: 'Event Registration approval',
      html: `<p>Here is your QR code:</p><img src="${approvalCode}" alt="QR Code" />`,
    };

    await sendEmail(mailOptions);
    res.status(200).json({
      code: 200,
      message: 'Registation approved',
      data: response[1][0],
    });
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
export default {
  addEvent,
  RegisterToEvent,
  deleteEvent,
  updateEvent,
  viewSingleEvent,
  getAllEvents,
  approveAttende,
};
