const mongoose = require('mongoose');
const { Schema } = mongoose;
const formatDate = require('../utils/formatDate');

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

module.exports = Interview;