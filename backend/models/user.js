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
    interviews: [{
        type: Schema.Types.ObjectId,
        ref: "Interview"
    }],
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
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    dateJoined: {
        type: String,
        default: formatDate
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
