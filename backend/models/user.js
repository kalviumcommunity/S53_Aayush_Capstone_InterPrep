const mongoose = require('mongoose');
const formatDate = require('../utils/formatDate');

const User = mongoose.model("User", {
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
    dateJoined: {
        type: String,
        default: formatDate
    },
});

module.exports = User;