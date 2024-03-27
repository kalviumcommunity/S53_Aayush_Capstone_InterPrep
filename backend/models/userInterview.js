const mongoose = require('mongoose');
const formatDate = require('../utils/formatDate');

const Interview = mongoose.model("Interview", {
    user: {
        type: mongoose.Schema.Types.ObjectId,
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
        name : {
            type: String,
            required: true
        }
    },
    score:{
        type: String,
        required: true
    },
    dateOfInterview: {
        type: String,
        default: formatDate
    },
});

module.exports = Interview;