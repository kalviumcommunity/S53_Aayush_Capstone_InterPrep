import ExpressError from "../utils/ExpressError.js";
import wrapAsync from "../utils/wrapAsync.js";
import Jobs from "../models/jobs.model.js";

export const getJobsAPI = wrapAsync(async (req, res) => {
    const jobs = await Jobs.aggregate([
        { $sample: { size: 5 } }
    ]);
    if(!jobs){
        throw new ExpressError(404, "Jobs not Found!")
    }else{
        const mappedJobs = jobs.map(job => ({
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
        res.send(mappedJobs);
    }
})