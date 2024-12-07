import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ExpressError from "../utils/ExpressError";
import { jobValidation } from "../utils/validation";
import { getJobs, getSpecificJobs, newJob } from "../controllers/jobs.controller";
import dotenv from "dotenv";

dotenv.config();

const jobControl = express.Router();

jobControl.use(express.json());

const jwtVerify = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new ExpressError(403, "Authorization token is required.");
        }
        const result: any = jwt.verify(authorization, process.env.JWT_PASS as string);
        if (result && result.type === "Company") {
            req.body.username = result.username;
            next();
        } else {
            throw new ExpressError(403, "Invalid Token");
        }
    } catch (err) {
        throw new ExpressError(403, "Not authorised to access this route without correct auth token.");
    }
};

const validateJob = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = jobValidation.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    } else {
        next();
    }
};

jobControl.get("/", getJobs);

jobControl.get("/:id", getSpecificJobs);

jobControl.post('/new', validateJob, jwtVerify, newJob);

jobControl.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message = "Some error occurred...!" } = err;
    res.status(status).send(message);
});

export default jobControl;