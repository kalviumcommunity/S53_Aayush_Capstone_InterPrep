"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_controller_1 = require("../controllers/api.controller");
const apiControl = express_1.default.Router();
apiControl.use(express_1.default.json());
// Using wrapAsync correctly to pass req, res, and next
apiControl.get("/get/jobs/v1", api_controller_1.getJobsAPI);
exports.default = apiControl;
