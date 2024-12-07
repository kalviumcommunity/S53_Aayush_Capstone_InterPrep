import express, { Request, Response, NextFunction } from "express";
import ExpressError from "../utils/ExpressError";
import { interviewerValidation } from "../utils/validation";
import { allInterviewers, signinInterviewer, signupInterviewer, specificInterviewers } from "../controllers/interviewer.controller";

const interviewerControl = express.Router();

interviewerControl.use(express.json());

const validateInterviewer = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = interviewerValidation.validate(req.body);
    if (error) {
        return next(new ExpressError(400, error.details[0].message));
    }
    next();
};

interviewerControl.get("/home", allInterviewers);

interviewerControl.get("/:username", specificInterviewers);

interviewerControl.post("/signup", validateInterviewer, signupInterviewer);

interviewerControl.post("/signin", signinInterviewer);

interviewerControl.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    let { status = 500, message = "Some error occured...!" } = err;
    res.status(status).send(message);
});

export default interviewerControl;