import ExpressError from "../utils/ExpressError.js";
import wrapAsync from "../utils/wrapAsync.js";
import Jobs from "../models/jobs.model.js";
import Company from "../models/company.model.js";

export const getJobs = wrapAsync(async (req, res) => {
    const filter = req.query.filter || "";
    const jobs = await Jobs.find({
        $or: [
            { role: { "$regex": filter, "$options": "i" } },
            { name: { "$regex": filter, "$options": "i" } }
        ]
    }).populate({
        path: 'company',
        select: 'image'
    });
    res.send(jobs);
});

export const getSpecificJobs = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const job = await Jobs.findById(id)
        .populate({
            path: 'company',
            select: 'image company description'
        });
    if (job == null) {
        throw new ExpressError(404, "Job not Found!");
    }
    res.send(job);
});

export const newJob = wrapAsync(async (req, res) => {
    let { role, description, salary, timing, place, experience, notice, type, username } = req.body;
    let newJobData = { role, description, salary, type, timing, place, experience, notice };
    let newJob = new Jobs(newJobData);
    let company = await Company.findOne({username:username});
    if (company){
        newJob.company = company;
        newJob.name = company.company;
        newJob.save();
        company.jobs.push(newJob);
        company.save()
        res.send("Job Posted!")
    }else {
        throw new ExpressError(404, "Authentication Error!")
    }
});