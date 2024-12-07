import mongoose, { Document, Schema } from 'mongoose';
import formatDate from '../utils/formatDate';

interface IUserInterview extends Document {
    user: mongoose.Types.ObjectId;
    questions: { question: string; answered: boolean }[];
    interviewer: mongoose.Types.ObjectId;
    score: string;
    dateOfInterview: string;
}

const userInterviewSchema = new Schema<IUserInterview>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    questions: [{
        question: {
            type: String
        },
        answered: {
            type: Boolean
        }
    }],
    interviewer: {
        type: Schema.Types.ObjectId,
        ref: "Interviewer"
    },
    score: {
        type: String,
        required: true
    },
    dateOfInterview: {
        type: String,
        default: formatDate
    },
});

const UserInterview = mongoose.model<IUserInterview>("UserInterview", userInterviewSchema);

export default UserInterview;