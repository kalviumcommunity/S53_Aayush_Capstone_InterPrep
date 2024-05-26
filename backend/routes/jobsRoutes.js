const express = require("express");
const { jobValidation } = require("../utils/validation");
var jwt = require("jsonwebtoken");
const Jobs = require("../models/jobs");
const Company = require("../models/company");
const app = express();
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");

require("dotenv").config();

const jobControl = express.Router();

app.use(express.json());
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

jobControl.get(
    "/",
    wrapAsync(async (req, res) => {
        await Jobs.find().then((data) => { returnData = data });
        res.send(returnData);
    })
);

jobControl.post(
    '/new',
    validateJob,
    jwtVerify,
    wrapAsync(async (req, res) => {
        let { role, description, salary, timing, place, experience, notice, username } = req.body;
        let newJobData = { role, description, salary, timing, place, experience, notice };
        let newJob = new Jobs(newJobData);
        let company = await Company.findOne({username:username});
        if (company){
            newJob.company = company.company;
            newJob.save();
            company.jobs.push(newJob);
            company.save()
            res.send("Job Posted!")
        }else {
            throw new ExpressError(404, "Authentication Error!")
        }
    })
);

jobControl.use((err, req, res, next) => {
    let { status = 500, message = "Some error occured...!" } = err;
    res.status(status).send(message);
});


module.exports = { jobControl };