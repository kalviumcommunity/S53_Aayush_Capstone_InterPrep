const Joi = require("joi");

module.exports.userValidation = Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    contact: Joi.object(),
    dateJoined: Joi.string()
});

module.exports.userInterview = Joi.object({
    user: Joi.string().required(),
    questions: Joi.array().required(),
    interviewer: Joi.object().required(),
    score: Joi.number().required(),
    dateOfInterview: Joi.string()
})