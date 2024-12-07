import mongoose, { Schema, Document, Model } from 'mongoose';
import formatDate from '../utils/formatDate';

// Define an interface for the Interview model
export interface IInterview extends Document {
    user: mongoose.Types.ObjectId;
    interviewer: mongoose.Types.ObjectId;
    chats: {
        question: string;
        answer: string;
    }[];
    dateOfInterview: string;
}

// Create the schema
const interviewSchema: Schema<IInterview> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    interviewer: {
        type: Schema.Types.ObjectId,
        ref: "Interviewer",
        required: true
    },
    chats: [{
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        }
    }],
    dateOfInterview: {
        type: String,
        default: formatDate,  // Use the formatDate utility function to set the default date
        required: true
    }
});

// Create and export the model
const Interview: Model<IInterview> = mongoose.model<IInterview>("Interview", interviewSchema);

export default Interview;