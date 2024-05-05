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
    interviews: Joi.array().items(Joi.object()).optional(),
    posts: Joi.array().items(Joi.object()).optional(),
    info: Joi.object({
        qualification: Joi.string().required(),
        experience: Joi.string().required(),
        working: Joi.string().required()
    }).required(),
    certificate: Joi.string().required(),
    contact: Joi.object({
        phone: Joi.number().integer().required(),
        email: Joi.string().email().required()
    }).required(),
    reason: Joi.string().required(),
    verified: Joi.boolean().default(false),
    dateJoined: Joi.string(),
    type: Joi.string().default('Interviewer')
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