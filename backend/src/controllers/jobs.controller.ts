import { Request, Response } from "express";
import { Types } from "mongoose";
import ExpressError from "../utils/ExpressError";
import wrapAsync from "../utils/wrapAsync";
import Jobs from "../models/jobs.model";
import Company from "../models/company.model";

export const getJobs = wrapAsync(async (req: Request, res: Response) => {
    const filter = (req.query.filter as string) || "";
    const jobs = await Jobs.find({
        $or: [
            { role: { $regex: filter, $options: "i" } },
            { name: { $regex: filter, $options: "i" } },
        ],
    }).populate({
        path: "company",
        select: "image",
    });
    res.send(jobs);
});

export const getSpecificJobs = wrapAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const job = await Jobs.findById(id).populate({
        path: "company",
        select: "image company description",
    });
    if (!job) {
        throw new ExpressError(404, "Job not Found!");
    }
    res.send(job);
});

export const newJob = wrapAsync(async (req: Request, res: Response) => {
    const { role, description, salary, timing, place, experience, notice, type, username } = req.body;
    const newJobData = { role, description, salary, type, timing, place, experience, notice };
    const newJob = new Jobs(newJobData);
    const company = await Company.findOne({ username });

    // Ensure company is typed correctly as a Company document.
    if (company) {
        // Use mongoose.Types.ObjectId to cast the company._id
        newJob.company = company._id as Types.ObjectId;
        newJob.name = company.company;
        await newJob.save();

        // Push the newJob._id into the company.jobs array, with the correct type.
        company.jobs.push(newJob._id as Types.ObjectId);
        await company.save();

        res.send("Job Posted!");
    } else {
        throw new ExpressError(404, "Authentication Error!");
    }
});