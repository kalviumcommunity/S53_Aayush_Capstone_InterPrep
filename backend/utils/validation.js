const Joi = require("joi");

module.exports.userValidation = Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    image: Joi.string(),
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[a-zA-Z]).{6,20}$/).required(),
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
    username: Joi.string().min(3).max(10).required(),
    name: Joi.string().required(),
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[a-zA-Z]).{6,20}$/).required(),
    image: Joi.string().required(),
    interviews: Joi.array().items(Joi.object()).optional(),
    posts: Joi.array().items(Joi.object()).optional(),
    info: Joi.object({
        qualification: Joi.string().required(),
        experience: Joi.string().required(),
        working: Joi.string().required()
    }).required(),
    certificate: Joi.string().required(),
    phone: Joi.number().integer().min(10).required(),
    email: Joi.string().pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')).required(),
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
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[a-zA-Z]).{6,20}$/).required(),
    website: Joi.string().required(),
    description: Joi.string().required(),
    dateJoined: Joi.string(),
    hiring: Joi.boolean()
})

module.exports.jobValidation = Joi.object({
    company: Joi.string(),
    role: Joi.string().required(),
    description: Joi.string().required(),
    salary: Joi.string().required(),
    timing: Joi.string().required(),
    applied: Joi.array().items(),
    place: Joi.string().required(),
    experience: Joi.string().required(),
    notice: Joi.string().required(),
    datePosted: Joi.string()
});