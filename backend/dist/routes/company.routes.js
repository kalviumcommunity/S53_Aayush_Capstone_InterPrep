"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ExpressError_1 = __importDefault(require("../utils/ExpressError"));
const validation_1 = require("../utils/validation");
const company_controller_1 = require("../controllers/company.controller");
const companyControl = express_1.default.Router();
companyControl.use(express_1.default.json());
const validateCompany = (req, res, next) => {
    const { error } = validation_1.companyValidation.validate(req.body);
    if (error) {
        throw new ExpressError_1.default(400, error.details[0].message);
    }
    else {
        next();
    }
};
companyControl.get("/", company_controller_1.getCompanies);
companyControl.post("/signup", validateCompany, company_controller_1.signupCompany);
companyControl.post("/signin", company_controller_1.signinCompany);
companyControl.use((err, req, res, next) => {
    let { status = 500, message = "Some error occurred...!" } = err;
    res.status(status).send(message);
});
exports.default = companyControl;
