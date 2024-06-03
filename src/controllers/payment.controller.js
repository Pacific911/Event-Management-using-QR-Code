import QRcode from 'qrcode';
import eventService from '../services/event.service';
import paymentService from '../services/payment.service';
import stripe from '../helpers/stripe';
import sendEmail from '../helpers/mailer';
import emailBody from '../utils/emailBody';

const generateToken = async (req, res) => {
  const token = await paymentService.stripeToken();
  res
    .status(200)
    .json({ code: 200, message: 'Payment token generated', token });
};

const makePayment = async (req, res) => {
  const { id } = req.body;
  const { rid } = req.params;
  const customer = await paymentService.findOrCreateStripeCustomer(req.user);
  const payMethod = await paymentService.paymentMethod(id);
  const payAmount = req.attendee.Event.paymentAmount;
  const { createdAt, updatedAt, Event, ...metadata } = req.attendee.dataValues;
  const chargeBody = {
    amount: payAmount,
    method: payMethod.id,
    eventName: req.attendee.Event.dataValues.name,
    ...metadata,
    attendeeId: rid,
  };
  const paymentData = await paymentService.payment(chargeBody, customer);
  if (
    paymentData.status === 'requires_action' &&
    paymentData.next_action.type === 'redirect_to_url'
  ) {
    const redirectUrl = paymentData.next_action.redirect_to_url.url;
    return res.status(401).json({
      code: '401',
      Message: 'Additional action required',
      Action: redirectUrl,
    });
  }
  await eventService.bookSlot(req.attendee.EventId);
  console.log(req.attendee.EventId);
  return res
    .status(200)
    .json({ code: '200', Message: 'Payment succedded', paymentData });
};

const webhook = async (req) => {
  try {
    const body = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_SECRET;
    const header = stripe.webhooks.generateTestHeaderString({
      payload: body,
      secret,
    });
    const event = stripe.webhooks.constructEvent(body, header, secret);
    const data = await paymentService.stripeListener(event);
    if (data) {
      if (data.status === 'succeeded') {
        const status = await paymentService.getStatus(data.status);
        await eventService.bookSlot(data.metadata.EventId);
        const updateAttendee = await eventService.attendeeStatus(
          data.metadata.attendeeId,
          status,
        );
        const { createdAt, updatedAt, ...restData } =
          updateAttendee[1][0].dataValues;

        const approvalCode = await QRcode.toDataURL(JSON.stringify(restData)); // generate qrcode and send email
        const eBody = emailBody.qrCodeBody(
          approvalCode,
          data.metadata.names,
          data.metadata.eventName,
        );
        console.log(eBody);
        const mailOptions = {
          from: 'princeineza@gmail.com',
          to: data.metadata.email,
          attachDataUrls: true,
          subject: 'Event Registration approval',
          html: eBody,
        };
        await sendEmail(mailOptions);
      }
      if (data.status === 'requires_payment_method') {
        const status = await paymentService.getStatus(data.status);
        const updateAttendee = await eventService.attendeeStatus(
          data.metadata.attendeeId,
          status,
        );
        return updateAttendee;
      }
      if (data.status === 'requires_action') {
        const status = await paymentService.getStatus(data.status);
        const updateAttendee = await eventService.attendeeStatus(
          data.metadata.attendeeId,
          status,
        );
        return updateAttendee;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default { generateToken, makePayment, webhook };
