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
exports.signinUser = exports.signupUser = void 0;
const ExpressError_js_1 = __importDefault(require("../utils/ExpressError.js"));
const wrapAsync_js_1 = __importDefault(require("../utils/wrapAsync.js"));
const user_model_js_1 = __importDefault(require("../models/user.model.js"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Signup function
exports.signupUser = (0, wrapAsync_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    const newUserData = new user_model_js_1.default({
        username: req.body.username,
        name: req.body.name,
        image: req.body.image,
        password: hashedPassword,
        email: req.body.email,
        phone: req.body.phone
    });
    const findUser = yield user_model_js_1.default.find({ username: req.body.username });
    if (findUser.length === 0) {
        yield newUserData.save();
        const token = jsonwebtoken_1.default.sign({ username: req.body.username }, process.env.JWT_PASS);
        res.send(token);
    }
    else {
        throw new ExpressError_js_1.default(400, "Username Exists");
    }
}));
// Signin function
exports.signinUser = (0, wrapAsync_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const userFind = yield user_model_js_1.default.find({ username: username });
    if (userFind.length !== 0) {
        const foundUser = userFind[0];
        const storedPassword = foundUser.password;
        const isPasswordValid = yield bcryptjs_1.default.compare(password, storedPassword);
        if (isPasswordValid) {
            const token = jsonwebtoken_1.default.sign({
                username: foundUser.username,
                name: foundUser.name,
                type: "User"
            }, process.env.JWT_PASS);
            res.send(token);
        }
        else {
            throw new ExpressError_js_1.default(401, "Wrong Password!");
        }
    }
    else {
        throw new ExpressError_js_1.default(404, "Username not found!");
    }
}));
