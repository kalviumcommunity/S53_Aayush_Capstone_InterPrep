import express, { Request, Response, NextFunction } from "express";
import ExpressError from "../utils/ExpressError";
import { companyValidation } from "../utils/validation";
import { getCompanies, signinCompany, signupCompany } from "../controllers/company.controller";

const companyControl = express.Router();

companyControl.use(express.json());

const validateCompany = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = companyValidation.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    } else {
        next();
    }
};

companyControl.get("/", getCompanies);

companyControl.post("/signup", validateCompany, signupCompany);

companyControl.post("/signin", signinCompany);

companyControl.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    let { status = 500, message = "Some error occurred...!" } = err;
    res.status(status).send(message);
});

export default companyControl;