import Joi from 'joi';
import errorMessage from '../errorMessage.util';

const names = Joi.string()
  .min(3)
  .max(30)
  .required()
  .messages(errorMessage('names'));

const phoneSchema = Joi.number()
  .required()
  .messages(errorMessage('phone number'));

const emailSchema = Joi.string()
  .email()
  .required()
  .messages(errorMessage('Email'));

const passwordSchema = Joi.string()
  .required()
  .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0123456789])(?=.*[@$!%*?&])[A-Za-z0123456789@$!%*?&]{6,}$/,
  )
  .messages(errorMessage('Password'));

const SignUpSchema = Joi.object().keys({
  names,
  email: emailSchema,
  telephone: phoneSchema,
  password: passwordSchema,
});
const loginSchema = Joi.object().keys({
  email: emailSchema,
  password: passwordSchema,
});

export { loginSchema, SignUpSchema };
