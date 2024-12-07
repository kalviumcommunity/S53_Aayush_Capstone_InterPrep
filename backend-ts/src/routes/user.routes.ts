import express, { Request, Response, NextFunction } from "express";
import ExpressError from "../utils/ExpressError.js";
import { userValidation } from "../utils/validation.js";
import { signinUser, signupUser } from "../controllers/user.controller";
import dotenv from "dotenv";

dotenv.config();

const userControl = express.Router();

userControl.use(express.json());

// Define the type for the error object
interface ErrorObject extends Error {
    status?: number;
}

// Middleware to validate user data
const validateUser = (req: Request, res: Response, next: NextFunction) => {
    let { error } = userValidation.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details[0].message); // Providing the error message
    } else {
        next();
    }
};

// Signup route
userControl.post("/signup", validateUser, signupUser);

// Signin route
userControl.post("/signin", signinUser);

// Global error handler
userControl.use((err: ErrorObject, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message = "Some error occurred..." } = err;
    res.status(status).send(message);
});

export default userControl;