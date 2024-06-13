const mongoose = require('mongoose');
const formatDate = require('../utils/formatDate');
const { Schema } = mongoose;

const postSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    user: {
        type: String,
    },
    likes: [{
        type: Schema.Types.ObjectId
    }],
    comments: [{
        description: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        date: {
            type: String,
            default: formatDate
        }
    }],
    date: {
        type: String,
        default: formatDate
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;