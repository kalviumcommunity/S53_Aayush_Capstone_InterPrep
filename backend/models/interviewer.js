const mongoose = require('mongoose');
const formatDate = require('../utils/formatDate');
const { boolean } = require('joi');

const Interview = mongoose.model("Interview", {
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    interviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview"
    }],
    contact: {
        phone: {
            type: Number,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        }
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
    verified: {
        type: boolean,
        default: false
    },
    dateJoined: {
        type: String,
        default: formatDate
    },
});

module.exports = Interview;