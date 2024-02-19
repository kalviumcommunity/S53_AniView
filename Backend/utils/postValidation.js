const Joi = require("joi");

module.exports.postValidation = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string(),
  image: Joi.string().required()
});
