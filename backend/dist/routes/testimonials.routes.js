"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const ExpressError_1 = __importDefault(require("../utils/ExpressError"));
const validation_1 = require("../utils/validation");
const testimonial_controller_1 = require("../controllers/testimonial.controller");
dotenv_1.default.config();
const testimonialControl = express_1.default.Router();
testimonialControl.use(express_1.default.json());
const jwtVerify = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new ExpressError_1.default(403, "Authorization token is required.");
        }
        const result = jsonwebtoken_1.default.verify(authorization, process.env.JWT_PASS);
        if (result) {
            if (result.type === "User") {
                req.body.username = result.username;
                next();
            }
            else {
                throw new ExpressError_1.default(403, "Only users are allowed to write testimonials.");
            }
        }
        else {
            throw new ExpressError_1.default(403, "Invalid Token");
        }
    }
    catch (err) {
        throw new ExpressError_1.default(403, "Not authorised to access this route without correct auth token.");
    }
};
const validateTestimonial = (req, res, next) => {
    const { error } = validation_1.testimonialValidation.validate(req.body);
    if (error) {
        throw new ExpressError_1.default(400, error.details[0].message);
    }
    else {
        next();
    }
};
const checkTestimonial = (req, res, next) => {
    const { username } = req.body;
    // Add your check logic here
    next();
};
testimonialControl.get("/", testimonial_controller_1.getTestimonials);
testimonialControl.use((err, req, res, next) => {
    const { status = 500, message = "Some error occurred...!" } = err;
    res.status(status).send(message);
});
exports.default = testimonialControl;
