import Joi from 'joi';
import errorMessage from '../errorMessage.util';

const NewCompany = Joi.object().keys({
  name: Joi.string().min(3).required().messages(errorMessage('Name')),
  description: Joi.string()
    .min(3)
    .required()
    .messages(errorMessage('Description')),
  images: Joi.binary().min(1).messages(errorMessage('image')),
  location: Joi.string().min(3).required().messages(errorMessage('Location')),
  telephone: Joi.number().required().messages(errorMessage('phone number')),
});
// const supportGroupUpdate = Joi.object().keys({
//   date: Joi.date().required().messages(errorMessage('Date')),
//   name: Joi.string().min(3).required().messages(errorMessage('Description')),
//   title: Joi.string().min(3).required().messages(errorMessage('Title')),
// });

// const supportGroupImage = Joi.object().keys({
//   images: Joi.binary().min(1).messages(errorMessage('image')),
// });
// const imageToDelete = Joi.object().keys({
//   imageId: Joi.string().required().messages(errorMessage('image id')),
// });

export default {
  NewCompany,
  //   supportGroupImage,
  //   imageToDelete,
  //   supportGroupUpdate,
};
