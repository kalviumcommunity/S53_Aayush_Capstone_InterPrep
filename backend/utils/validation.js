const Joi = require("joi");

module.exports.userValidation = Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    image: Joi.string(),
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

module.exports.interviewerValidation = Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    image: Joi.string().required(),
    interviews: Joi.array(),
    contact: Joi.object(),
    info: Joi.object(),
    dateJoined: Joi.string(),
    verified: Joi.boolean()
});

module.exports.postValidation = Joi.object({
    description: Joi.string().required(),
    user: Joi.string(),
    likes: Joi.array(),
    comments: Joi.array(),
});

module.exports.commentValidation = Joi.object({
    description: Joi.string().required()
});

module.exports.companyValidation = Joi.object({
    company: Joi.string().required(),
    username: Joi.string().required(),
    website: Joi.string().required(),
    description: Joi.string().required(),
    dateJoined: Joi.string().required(),
    hiring: Joi.boolean()
})