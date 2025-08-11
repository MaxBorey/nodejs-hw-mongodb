import Joi from 'joi';

export const createContactShema = Joi.object({
    name: Joi.string()
  .min(3)
  .max(20)
  .required()
  .messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least 3 characters',
    'string.max': 'Username should have at most 20 characters',
    'any.required': 'Username is required',
  }),
   phoneNumber: Joi.string()
  .min(3)
  .max(20)
  .required()
  .messages({
    'string.base': 'Phone number must be a string',
    'string.empty': 'Phone number cannot be empty',
    'string.min': 'Phone number should have at least 3 characters',
    'string.max': 'Phone number should have at most 20 characters',
    'any.required': 'Phone number is required',
  }),
    email: Joi.string()
  .email({ tlds: { allow: false } })  
  .min(3)
  .max(20)
  .messages({
    'string.email': 'Email must be a valid email address',
    'string.min': 'Email should have at least 3 characters',
    'string.max': 'Email should have at most 20 characters',
  }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string()
  .valid('work', 'home', 'personal')
  .required()
  .messages({
    'any.only': 'contactType must be one of [work, home, personal]',
    'any.required': 'contactType is required',
    'string.base': 'contactType must be a string',
  }),
});


export const updateContactSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(20)
        .messages({
      'string.base': 'Name should be a string',
      'string.min': 'Name should have at least 3 characters',
      'string.max': 'Name should have at most 20 characters',
    }),
    phoneNumber: Joi.string()
        .min(3)
        .max(20)
        .messages({
      'string.base': 'Phone number must be a string',
      'string.min': 'Phone number should have at least 3 characters',
      'string.max': 'Phone number should have at most 20 characters',
    }),
    email: Joi.string()
        .min(3)
        .max(20)
        .email({ tlds: { allow: false } })
        .messages({
      'string.email': 'Email must be a valid email address',
    }),
    isFavourite: Joi.boolean()
        .messages({
    'boolean.base': 'isFavourite must be a boolean',
  }),
    contactType: Joi.string()
        .valid('work', 'home', 'personal')
        .messages({
      'any.only': 'contactType must be one of [work, home, personal]',
      'string.base': 'contactType must be a string',
    }),
});