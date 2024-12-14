"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ExpressError_1 = __importDefault(require("../utils/ExpressError"));
const validation_1 = require("../utils/validation");
const interviewer_controller_1 = require("../controllers/interviewer.controller");
const interviewerControl = express_1.default.Router();
interviewerControl.use(express_1.default.json());
const validateInterviewer = (req, res, next) => {
    const { error } = validation_1.interviewerValidation.validate(req.body);
    if (error) {
        return next(new ExpressError_1.default(400, error.details[0].message));
    }
    next();
};
interviewerControl.get("/home", interviewer_controller_1.allInterviewers);
interviewerControl.get("/:username", interviewer_controller_1.specificInterviewers);
interviewerControl.post("/signup", validateInterviewer, interviewer_controller_1.signupInterviewer);
interviewerControl.post("/signin", interviewer_controller_1.signinInterviewer);
interviewerControl.use((err, req, res, next) => {
    console.log(err);
    let { status = 500, message = "Some error occured...!" } = err;
    res.status(status).send(message);
});
exports.default = interviewerControl;
