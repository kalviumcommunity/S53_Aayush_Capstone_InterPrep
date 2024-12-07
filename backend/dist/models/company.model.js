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
// Create the schema
const companySchema = new mongoose_1.Schema({
    company: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // Ensures password is excluded from query results by default
    },
    website: {
        type: String,
        required: true,
    },
    description: {
        culture: {
            type: String,
            required: true,
        },
        values: {
            type: String,
            required: true,
        },
    },
    jobs: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Jobs",
        },
    ],
    hiring: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        required: true,
    },
    dateJoined: {
        type: String,
        default: formatDate_1.default,
    },
});
// Create and export the model
const Company = mongoose_1.default.model("Company", companySchema);
exports.default = Company;
