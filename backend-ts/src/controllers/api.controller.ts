import { Request, Response, NextFunction } from "express";
import ExpressError from "../utils/ExpressError";
import wrapAsync from "../utils/wrapAsync";
import Jobs from "../models/jobs.model";

export const getJobsAPI = wrapAsync(async (req: Request, res: Response) => {
  const jobs = await Jobs.aggregate([
    { $sample: { size: 5 } }
  ]);

  if (!jobs || jobs.length === 0) {
    throw new ExpressError(404, "Jobs not Found!");
  }

  const mappedJobs = jobs.map((job: any) => ({
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
});