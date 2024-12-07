import express, { Request, Response, NextFunction } from "express";
import { getJobsAPI } from "../controllers/api.controller";
import ExpressError from "../utils/ExpressError";

const apiControl = express.Router();

apiControl.use(express.json());

// Using wrapAsync correctly to pass req, res, and next
apiControl.get("/get/jobs/v1", getJobsAPI);

export default apiControl;