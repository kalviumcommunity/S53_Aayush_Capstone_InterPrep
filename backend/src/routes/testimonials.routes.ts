import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ExpressError from "../utils/ExpressError";
import { testimonialValidation } from "../utils/validation";
import { getTestimonials } from "../controllers/testimonial.controller";

dotenv.config();

const testimonialControl = express.Router();

testimonialControl.use(express.json());

const jwtVerify = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new ExpressError(403, "Authorization token is required.");
        }
        const result: any = jwt.verify(authorization, process.env.JWT_PASS as string);
        if (result) {
            if (result.type === "User") {
                req.body.username = result.username;
                next();
            } else {
                throw new ExpressError(403, "Only users are allowed to write testimonials.");
            }
        } else {
            throw new ExpressError(403, "Invalid Token");
        }
    } catch (err) {
        throw new ExpressError(403, "Not authorised to access this route without correct auth token.");
    }
};

const validateTestimonial = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = testimonialValidation.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    } else {
        next();
    }
};

const checkTestimonial = (req: Request, res: Response, next: NextFunction): void => {
    const { username } = req.body;
    // Add your check logic here
    next();
};

testimonialControl.get("/", getTestimonials);

testimonialControl.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message = "Some error occurred...!" } = err;
    res.status(status).send(message);
});

export default testimonialControl;