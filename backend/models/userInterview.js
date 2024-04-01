const mongoose = require('mongoose');
const { Schema } = mongoose;
const formatDate = require('../utils/formatDate');

const userInterviewSchema = new Schema({
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

const UserInterview = mongoose.model("User Interview", userInterviewSchema);

module.exports = UserInterview;
