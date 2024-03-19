const Joi = require("joi");

module.exports.userValidation = Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    interviews: Joi.array(),
    contact: Joi.object(),
    dateJoined: Joi.string()
});