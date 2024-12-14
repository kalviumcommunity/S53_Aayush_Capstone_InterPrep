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
exports.newJob = exports.getSpecificJobs = exports.getJobs = void 0;
const ExpressError_1 = __importDefault(require("../utils/ExpressError"));
const wrapAsync_1 = __importDefault(require("../utils/wrapAsync"));
const jobs_model_1 = __importDefault(require("../models/jobs.model"));
const company_model_1 = __importDefault(require("../models/company.model"));
exports.getJobs = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.filter || "";
    const jobs = yield jobs_model_1.default.find({
        $or: [
            { role: { $regex: filter, $options: "i" } },
            { name: { $regex: filter, $options: "i" } },
        ],
    }).populate({
        path: "company",
        select: "image",
    });
    res.send(jobs);
}));
exports.getSpecificJobs = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const job = yield jobs_model_1.default.findById(id).populate({
        path: "company",
        select: "image company description",
    });
    if (!job) {
        throw new ExpressError_1.default(404, "Job not Found!");
    }
    res.send(job);
}));
exports.newJob = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, description, salary, timing, place, experience, notice, type, username } = req.body;
    const newJobData = { role, description, salary, type, timing, place, experience, notice };
    const newJob = new jobs_model_1.default(newJobData);
    const company = yield company_model_1.default.findOne({ username });
    // Ensure company is typed correctly as a Company document.
    if (company) {
        // Use mongoose.Types.ObjectId to cast the company._id
        newJob.company = company._id;
        newJob.name = company.company;
        yield newJob.save();
        // Push the newJob._id into the company.jobs array, with the correct type.
        company.jobs.push(newJob._id);
        yield company.save();
        res.send("Job Posted!");
    }
    else {
        throw new ExpressError_1.default(404, "Authentication Error!");
    }
}));
