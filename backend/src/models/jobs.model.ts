import mongoose, { Document, Schema } from 'mongoose';
import formatDate from '../utils/formatDate';

interface IJob extends Document {
    company: mongoose.Types.ObjectId;
    name: string;
    role: string;
    description: {
        requirements: string;
        responsibilities: string;
        process: string;
    };
    salary: string;
    type: string;
    timing: string;
    applied: mongoose.Types.ObjectId[];
    place: string;
    experience: string;
    notice: string;
    datePosted: string;
}

const jobSchema = new Schema<IJob>({
    company: {
        type: Schema.Types.ObjectId,
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

const Jobs = mongoose.model<IJob>("Jobs", jobSchema);

export default Jobs;