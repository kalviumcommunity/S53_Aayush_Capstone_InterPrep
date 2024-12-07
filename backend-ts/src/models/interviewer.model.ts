import mongoose, { Schema, Document, Model } from 'mongoose';
import formatDate from '../utils/formatDate';

// Define an interface for the Interviewer model
export interface IInterviewer extends Document {
    username: string;
    name: string;
    password: string;
    interviews: mongoose.Types.ObjectId[];
    image: string;
    info: {
        qualification: string;
        experience: string;
        working: string;
    };
    certificate: string;
    phone: number;
    email: string;
    posts: mongoose.Types.ObjectId[];
    about: string;
    verified: boolean;
    mastery: string[];
    dateJoined: string;
}

// Create the schema
const interviewerSchema: Schema<IInterviewer> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    interviews: [{
        type: Schema.Types.ObjectId,
        ref: "Interview"
    }],
    image: {
        type: String,
        required: true
    },
    info: {
        qualification: {
            type: String,
            required: true
        },
        experience: {
            type: String,
            required: true
        },
        working: {
            type: String,
            required: true
        }
    },
    certificate: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    about: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    mastery: {
        type: [String], // Use an array of strings to store mastery areas
        required: true
    },
    dateJoined: {
        type: String,
        default: formatDate // Use the formatDate utility function for date format
    }
});

// Create and export the model
const Interviewer: Model<IInterviewer> = mongoose.model<IInterviewer>("Interviewer", interviewerSchema);

export default Interviewer;