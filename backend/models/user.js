const mongoose = require('mongoose');
const { Schema } = mongoose;
const formatDate = require('../utils/formatDate');

const userSchema = new Schema({
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
    image: {
        type: String,
        required: true
    },
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
    interviews: [{
        type: Schema.Types.ObjectId,
        ref: "Interview"
    }],
    bookmarks:  [{
        type: Schema.Types.ObjectId,
        ref: "Jobs"
    }],
    jobsApplied: [{
        type: Schema.Types.ObjectId,
        ref: "Jobs"
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Posts"
    }],
    dateJoined: {
        type: String,
        default: formatDate
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
