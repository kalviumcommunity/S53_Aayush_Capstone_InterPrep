"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const formatDate_1 = __importDefault(require("../utils/formatDate"));
const jobSchema = new mongoose_1.Schema({
    company: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    description: {
        requirements: {
            type: String,
            required: true
        },
        responsibilities: {
            type: String,
            required: true
        },
        process: {
            type: String,
            required: true
        }
    },
    salary: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    timing: {
        type: String,
        required: true
    },
    applied: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }],
    place: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    notice: {
        type: String,
        required: true
    },
    datePosted: {
        type: String,
        default: formatDate_1.default
    }
});
const Jobs = mongoose_1.default.model("Jobs", jobSchema);
exports.default = Jobs;
