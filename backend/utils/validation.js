import Joi from "joi";

export const userValidation = Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    image: Joi.string(),
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[a-zA-Z]).{6,20}$/).required(),
    phone: Joi.number().required(),
    email: Joi.string().required(),
    dateJoined: Joi.string()
});

export const userInterview = Joi.object({
    user: Joi.string().required(),
    questions: Joi.array().required(),
    interviewer: Joi.object().required(),
    score: Joi.number().required(),
    dateOfInterview: Joi.string()
})

export const interviewerValidation = Joi.object({
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
    phone: Joi.number().required(),
    email: Joi.string().required(),
    about: Joi.string().required(),
    verified: Joi.boolean().default(false),
    mastery: Joi.array(),
    dateJoined: Joi.string(),
    type: Joi.string().default('Interviewer')
});

export const postValidation = Joi.object({
    description: Joi.string().required(),
    user: Joi.string(),
    likes: Joi.array(),
    comments: Joi.array(),
});

export const commentValidation = Joi.object({
    description: Joi.string().required()
});

export const companyValidation = Joi.object({
    company: Joi.string().required(),
    username: Joi.string().required(),
    image: Joi.string().required(),
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[a-zA-Z]).{6,20}$/).required(),
    website: Joi.string().required(),
    description: Joi.object().required(),
    dateJoined: Joi.string(),
    hiring: Joi.boolean()
})

export const jobValidation = Joi.object({
    company: Joi.string(),
    role: Joi.string().required(),
    description: Joi.object(),
    salary: Joi.string().required(),
    timing: Joi.string().required(),
    type: Joi.string().required(),
    applied: Joi.array().items(),
    place: Joi.string().required(),
    experience: Joi.string().required(),
    notice: Joi.string().required(),
    datePosted: Joi.string()
});

export const testimonialValidation = Joi.object({
    description: Joi.string().required(),
    user: Joi.string()
})