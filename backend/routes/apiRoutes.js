const express = require("express");
const app = express();
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const Jobs = require("../models/jobs");

require("dotenv").config();

const apiControl = express.Router();

app.use(express.json());
apiControl.use(express.json());

apiControl.get(
    "/get/jobs/v1",
    wrapAsync(async (req, res) => {
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
);

module.exports = { apiControl };
