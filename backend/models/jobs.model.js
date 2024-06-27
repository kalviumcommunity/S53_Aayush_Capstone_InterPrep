import mongoose, { Schema } from 'mongoose';
import formatDate from '../utils/formatDate.js';

const jobSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company"
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
        responsibilties: {
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
        type: Schema.Types.ObjectId,
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
        default: formatDate
    }
});

const Jobs = mongoose.model("Jobs", jobSchema);

export default Jobs;