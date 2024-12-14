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
exports.signinCompany = exports.signupCompany = exports.getCompanies = void 0;
const ExpressError_1 = __importDefault(require("../utils/ExpressError"));
const wrapAsync_1 = __importDefault(require("../utils/wrapAsync"));
const company_model_1 = __importDefault(require("../models/company.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.getCompanies = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const companies = yield company_model_1.default.find();
    res.send(companies);
}));
exports.signupCompany = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, username, company, website, image, description, hiring } = req.body;
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    const findCompany = yield company_model_1.default.findOne({ username });
    if (!findCompany) {
        const newCompany = new company_model_1.default({
            company,
            username,
            password: hashedPassword,
            website,
            image,
            description,
            hiring,
        });
        yield newCompany.save();
        const token = jsonwebtoken_1.default.sign({
            username,
            company,
            type: "Company",
        }, process.env.JWT_PASS);
        res.send(token);
    }
    else {
        throw new ExpressError_1.default(400, "Company with this username already exists!");
    }
}));
exports.signinCompany = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const companyFind = yield company_model_1.default.findOne({ username });
    if (companyFind) {
        const storedPassword = companyFind.password;
        const isPasswordValid = yield bcryptjs_1.default.compare(password, storedPassword);
        if (isPasswordValid) {
            const token = jsonwebtoken_1.default.sign({
                username: companyFind.username,
                name: companyFind.company,
                type: "Company",
            }, process.env.JWT_PASS);
            res.send(token);
        }
        else {
            throw new ExpressError_1.default(401, "Wrong Password!");
        }
    }
    else {
        throw new ExpressError_1.default(404, "Company not found!");
    }
}));
