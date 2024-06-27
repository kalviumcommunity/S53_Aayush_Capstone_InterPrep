import express from "express";
import ExpressError from "../utils/ExpressError.js";
import { companyValidation } from "../utils/validation.js";
import { getCompanies, signinCompany, signupCompany } from "../controllers/company.controller.js";

const companyControl = express.Router();

companyControl.use(express.json());

const validateCompany = (req, res, next) => {
    let { error } = companyValidation.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

companyControl.get("/", getCompanies);

companyControl.post("/signup", validateCompany, signupCompany);

companyControl.post("/signin", signinCompany);

companyControl.use((err, req, res, next) => {
    let { status = 500, message = "Some error occured...!" } = err;
    res.status(status).send(message);
});


export default companyControl;