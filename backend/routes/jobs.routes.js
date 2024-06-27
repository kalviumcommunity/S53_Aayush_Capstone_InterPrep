import express from "express";
import jwt from "jsonwebtoken";
import ExpressError from "../utils/ExpressError.js";
import { jobValidation } from "../utils/validation.js";
import { getJobs, getSpecificJobs, newJob } from "../controllers/jobs.contoller.js";
import dotenv from "dotenv";

dotenv.config();

const jobControl = express.Router();

jobControl.use(express.json());

const jwtVerify = (req, res, next) => {
    try {
        let { authorization } = req.headers;
        let result = jwt.verify(authorization, process.env.JWT_PASS);
        if (result && (result.type == "Company")) {
            req.body.username = result.username;
            next();
        }else{
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

const validateJob = (req, res, next) => {
    let { error } = jobValidation.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

jobControl.get("/", getJobs);

jobControl.get("/:id", getSpecificJobs);

jobControl.post('/new', validateJob, jwtVerify, newJob);

jobControl.use((err, req, res, next) => {
    let { status = 500, message = "Some error occured...!" } = err;
    res.status(status).send(message);
});

export default jobControl;