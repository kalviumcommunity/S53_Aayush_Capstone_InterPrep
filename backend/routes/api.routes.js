import express from "express";
import { getJobsAPI } from "../controllers/api.controller.js";

const apiControl = express.Router();

apiControl.use(express.json());

apiControl.get("/get/jobs/v1", getJobsAPI);

export default apiControl;