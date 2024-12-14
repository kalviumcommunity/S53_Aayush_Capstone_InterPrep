"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinInterviewer = exports.signupInterviewer = exports.specificInterviewers = exports.allInterviewers = void 0;
const ExpressError_1 = __importDefault(require("../utils/ExpressError"));
const wrapAsync_1 = __importDefault(require("../utils/wrapAsync"));
const interviewer_model_1 = __importDefault(require("../models/interviewer.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.allInterviewers = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all interviewers excluding password and certificate fields
        const returnData = yield interviewer_model_1.default.find().select("-password -certificate");
        res.send(returnData);
    }
    catch (err) {
        console.error("Error fetching interviewers:", err);
        throw new ExpressError_1.default(404, "Some Error Occurred");
    }
}));
exports.specificInterviewers = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    // Find interviewer by username
    const result = yield interviewer_model_1.default.find({ username });
    if (result.length === 0) {
        throw new ExpressError_1.default(404, "No Interviewer Found!");
    }
    res.send(result);
}));
exports.signupInterviewer = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, name, password, image, info, phone, email, certificate, about, mastery, } = req.body;
    // Check if username exists
    const findUser = yield interviewer_model_1.default.findOne({ username });
    if (findUser) {
        throw new ExpressError_1.default(400, "Interviewer username exists, try a new one!");
    }
    // Check if email exists
    const findEmail = yield interviewer_model_1.default.findOne({ email });
    if (findEmail) {
        throw new ExpressError_1.default(400, "An account is already linked to the email.");
    }
    // Check if phone number exists
    const findPhone = yield interviewer_model_1.default.findOne({ phone });
    if (findPhone) {
        throw new ExpressError_1.default(400, "An account is already linked to the phone number.");
    }
    // Hash the password
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    // Create a new interviewer
    const newInterviewerData = new interviewer_model_1.default({
        username,
        name,
        password: hashedPassword,
        image,
        info,
        phone,
        email,
        certificate,
        about,
        mastery,
    });
    yield newInterviewerData.save();
    // Generate a JWT token
    const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_PASS);
    res.send(token);
}));
exports.signinInterviewer = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Find interviewer by username
    const interviewerFind = yield interviewer_model_1.default.find({ username });
    if (interviewerFind.length !== 0) {
        const foundInterviewer = interviewerFind[0];
        const storedPassword = foundInterviewer.password;
        const isPasswordValid = yield bcryptjs_1.default.compare(password, storedPassword);
        if (isPasswordValid) {
            // Generate a JWT token
            const token = jsonwebtoken_1.default.sign({
                username: foundInterviewer.username,
                name: foundInterviewer.name,
                type: "Interviewer",
            }, process.env.JWT_PASS);
            res.send(token);
        }
        else {
            throw new ExpressError_1.default(401, "Wrong Password!");
        }
    }
    else {
        throw new ExpressError_1.default(404, "Username not found!");
    }
}));
