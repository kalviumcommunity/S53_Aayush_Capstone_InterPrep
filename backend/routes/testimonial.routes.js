import express from "express";
import jwt from "jsonwebtoken";
import ExpressError from "../utils/ExpressError.js";
import dotenv from "dotenv";
import { testimonialValidation } from "../utils/validation.js";
import { getTestimonials } from "../controllers/testimonial.controller.js";

dotenv.config();
const testimonialControl = express.Router();

testimonialControl.use(express.json());

const jwtVerify = (req, res, next) => {
    try {
        let { authorization } = req.headers;
        let result = jwt.verify(authorization, process.env.JWT_PASS);
        if (result) {
            if (result.type == "User") {
                req.body.username = result.username;
                next();
            } else {
                throw new ExpressError(
                    403,
                    "Only user's are allowed to write testimonials"
                )
            }
        } else {
            throw new ExpressError(
                403,
                "Invalid Token"
            )
        }
    } catch (err) {
        throw new ExpressError(
            403,
            "Not authorised to access this route without correct auth token."
        )
    }
};

const validateTestimonial = (req, res, next) => {
    let { error } = testimonialValidation.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

const checkTestimonial = (req, res, next) => {
    let { username } = req.body;
    
}

testimonialControl.get("/", getTestimonials);

testimonialControl.use((err, req, res, next) => {
    let { status = 500, message = "Some error occured...!" } = err;
    res.status(status).send(message);
});


export default testimonialControl;
