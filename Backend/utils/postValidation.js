const Joi = require("joi");

module.exports.postValidation = Joi.object({
  username: Joi.string().required(),
  title: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string(),
  image: Joi.string().required(),
});
