"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialValidation = exports.jobValidation = exports.companyValidation = exports.commentValidation = exports.postValidation = exports.interviewerValidation = exports.userInterview = exports.userValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userValidation = joi_1.default.object({
    username: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    image: joi_1.default.string(),
    password: joi_1.default.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[a-zA-Z]).{6,20}$/).required(),
    phone: joi_1.default.number().required(),
    email: joi_1.default.string().required(),
    dateJoined: joi_1.default.string()
});
exports.userInterview = joi_1.default.object({
    user: joi_1.default.string().required(),
    questions: joi_1.default.array().required(),
    interviewer: joi_1.default.object().required(),
    score: joi_1.default.number().required(),
    dateOfInterview: joi_1.default.string()
});
exports.interviewerValidation = joi_1.default.object({
    username: joi_1.default.string().min(3).max(10).required(),
    name: joi_1.default.string().required(),
    password: joi_1.default.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[a-zA-Z]).{6,20}$/).required(),
    image: joi_1.default.string().required(),
    interviews: joi_1.default.array().items(joi_1.default.object()).optional(),
    posts: joi_1.default.array().items(joi_1.default.object()).optional(),
    info: joi_1.default.object({
        qualification: joi_1.default.string().required(),
        experience: joi_1.default.string().required(),
        working: joi_1.default.string().required()
    }).required(),
    certificate: joi_1.default.string().required(),
    phone: joi_1.default.number().required(),
    email: joi_1.default.string().required(),
    about: joi_1.default.string().required(),
    verified: joi_1.default.boolean().default(false),
    mastery: joi_1.default.array(),
    dateJoined: joi_1.default.string(),
    type: joi_1.default.string().default('Interviewer')
});
exports.postValidation = joi_1.default.object({
    description: joi_1.default.string().required(),
    user: joi_1.default.string(),
    likes: joi_1.default.array(),
    comments: joi_1.default.array(),
});
exports.commentValidation = joi_1.default.object({
    description: joi_1.default.string().required()
});
exports.companyValidation = joi_1.default.object({
    company: joi_1.default.string().required(),
    username: joi_1.default.string().required(),
    image: joi_1.default.string().required(),
    password: joi_1.default.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[a-zA-Z]).{6,20}$/).required(),
    website: joi_1.default.string().required(),
    description: joi_1.default.object().required(),
    dateJoined: joi_1.default.string(),
    hiring: joi_1.default.boolean()
});
exports.jobValidation = joi_1.default.object({
    company: joi_1.default.string(),
    role: joi_1.default.string().required(),
    description: joi_1.default.object(),
    salary: joi_1.default.string().required(),
    timing: joi_1.default.string().required(),
    type: joi_1.default.string().required(),
    applied: joi_1.default.array().items(),
    place: joi_1.default.string().required(),
    experience: joi_1.default.string().required(),
    notice: joi_1.default.string().required(),
    datePosted: joi_1.default.string()
});
exports.testimonialValidation = joi_1.default.object({
    description: joi_1.default.string().required(),
    user: joi_1.default.string()
});
