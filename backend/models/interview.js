const mongoose = require('mongoose');
const formatDate = require('../utils/formatDate');

const userInterview = mongoose.model("Interview", {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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
        type: String,
        default: formatDate
    },
});

module.exports = userInterview;