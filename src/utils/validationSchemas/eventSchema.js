import Joi from 'joi';
import errorMessage from '../errorMessage.util';

const NewEvent = Joi.object().keys({
  date: Joi.date().required().messages(errorMessage('Date')),
  name: Joi.string().min(3).required().messages(errorMessage('Name')),
  description: Joi.string()
    .min(3)
    .required()
    .messages(errorMessage('Description')),
  images: Joi.binary().min(1).messages(errorMessage('image')),
  location: Joi.string().min(3).required().messages(errorMessage('Location')),
  paymentEnabled: Joi.boolean()
    .required()
    .messages(errorMessage('Payment Enabled')),
  paymentAmount: Joi.when('paymentEnabled', {
    is: true,
    then: Joi.number()
      .min(1)
      .required()
      .messages(errorMessage('Payment Amount')),
    otherwise: Joi.number()
      .valid(0)
      .required()
      .messages(errorMessage('Payment Amount')),
  }),
  slotNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(1)
    .required()
    .messages(errorMessage('Slot Number')),
});
const supportGroupUpdate = Joi.object().keys({
  date: Joi.date().required().messages(errorMessage('Date')),
  name: Joi.string().min(3).required().messages(errorMessage('Description')),
  title: Joi.string().min(3).required().messages(errorMessage('Title')),
});

const supportGroupImage = Joi.object().keys({
  images: Joi.binary().min(1).messages(errorMessage('image')),
});
const imageToDelete = Joi.object().keys({
  imageId: Joi.string().required().messages(errorMessage('image id')),
});

export default {
  NewEvent,
  supportGroupImage,
  imageToDelete,
  supportGroupUpdate,
};
