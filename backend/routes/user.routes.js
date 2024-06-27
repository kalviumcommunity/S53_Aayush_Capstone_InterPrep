import express from "express";
import ExpressError from "../utils/ExpressError.js";
import { userValidation } from "../utils/validation.js";
import { signinUser, signupUser } from "../controllers/user.controller.js";
import dotenv from "dotenv";

dotenv.config();

const userControl = express.Router();

userControl.use(express.json());

const validateUser = (req, res, next) => {
    let { error } = userValidation.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

userControl.post("/signup", validateUser, signupUser);

userControl.post("/signin", signinUser);

userControl.use((err, req, res, next) => {
    let { status = 500, message = "Some error occured...!" } = err;
    res.status(status).send(message);
});

export default userControl;