const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// Validate Custom Team
const ValidateRequiredUnitSchema = Joi.object().keys({
  baseId: Joi.string().required().messages({
    "string.empty": 'The "baseId" field must be filled in',
  }),
  gearLevel: Joi.number().required().min(1).max(13).messages({
    "number.min": 'The minimum value for "gearLevel" is 1',
    "number.max": 'The maximum value for "gearLevel" is 13',
    "number.base": 'The "gearLevel" field must be a number',
  }),
  relicTier: Joi.number().required().min(0).max(9).messages({
    "number.min": 'The minimum value for "relicTier" is 0',
    "number.max": 'The maximum value for "relicTier" is 9',
    "number.base": 'The "relicTier" field must be a number',
  }),
});

const validateCustomTeamBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    image: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "image" field must be filled in',
      "string.uri": 'The "image" field must be a valid URL',
    }),
    requiredUnits: Joi.array()
      .items(ValidateRequiredUnitSchema)
      .min(1)
      .max(5)
      .required()
      .messages({
        "array.min": 'The "requiredUnits" array must have at least 1 unit',
        "array.max": 'The "requiredUnits" array must have at most 5 units',
        "array.base": 'The "requiredUnits" field must be an array',
      }),
  }),
});

const validateCustomTeamId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().length(24).hex().messages({
      "string.empty": 'The "itemId" field must be filled in',
      "string.hex": 'The "itemId" field must be a hexadecimal value',
      "string.length": 'The "itemId" field must be 24 characters long',
    }),
  }),
});

// Validate User

const validateUserInfoBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'the "avatar" field must be a valid url',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid email address',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid email address',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().messages({
      "string.empty": 'The "id" field must be filled in',
      "string.hex": 'The "id" field must be a hexadecimal value',
      "string.length": 'The "id" field must be 24 characters long',
    }),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'the "avatar" field must be a valid url',
    }),
  }),
});

module.exports = {
  validateCustomTeamBody,
  validateUserInfoBody,
  validateAuthentication,
  validateCustomTeamId,
  validateUserId,
  validateUpdateUser,
};
