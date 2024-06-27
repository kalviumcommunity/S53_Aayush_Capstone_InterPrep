import mongoose, { Schema } from 'mongoose';
import formatDate from '../utils/formatDate.js';

const interviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    interviewer: {
        type: Schema.Types.ObjectId,
        ref: "Interviewer"
    },
    chats: [{
        question: {
            type: String
        },
        answer: {
            type: String
        }
    }],
    dateOfInterview: {
        type: formatDate
    }
});

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;