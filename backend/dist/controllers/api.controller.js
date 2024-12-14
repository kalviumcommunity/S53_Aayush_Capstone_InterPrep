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
exports.getJobsAPI = void 0;
const ExpressError_1 = __importDefault(require("../utils/ExpressError"));
const wrapAsync_1 = __importDefault(require("../utils/wrapAsync"));
const jobs_model_1 = __importDefault(require("../models/jobs.model"));
exports.getJobsAPI = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobs = yield jobs_model_1.default.aggregate([
        { $sample: { size: 5 } }
    ]);
    if (!jobs || jobs.length === 0) {
        throw new ExpressError_1.default(404, "Jobs not Found!");
    }
    const mappedJobs = jobs.map((job) => ({
        role: job.role,
        salary: job.salary,
        type: job.type,
        timing: job.timing,
        experience: job.experience,
        place: job.place,
        notice: job.notice,
        datePosted: job.datePosted,
        name: job.name,
        link: `https://inter-prep.vercel.app/jobs/${job._id}`
    }));
    res.status(200).send(mappedJobs);
}));
