"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ExpressError_js_1 = __importDefault(require("../utils/ExpressError.js"));
const validation_js_1 = require("../utils/validation.js");
const user_controller_1 = require("../controllers/user.controller");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userControl = express_1.default.Router();
userControl.use(express_1.default.json());
// Middleware to validate user data
const validateUser = (req, res, next) => {
    let { error } = validation_js_1.userValidation.validate(req.body);
    if (error) {
        throw new ExpressError_js_1.default(400, error.details[0].message); // Providing the error message
    }
    else {
        next();
    }
};
// Signup route
userControl.post("/signup", validateUser, user_controller_1.signupUser);
// Signin route
userControl.post("/signin", user_controller_1.signinUser);
// Global error handler
userControl.use((err, req, res, next) => {
    const { status = 500, message = "Some error occurred..." } = err;
    res.status(status).send(message);
});
exports.default = userControl;
