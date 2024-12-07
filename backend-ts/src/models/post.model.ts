import mongoose, { Document, Schema } from 'mongoose';
import formatDate from '../utils/formatDate';

export interface IPost extends Document {
    description: string;
    user: mongoose.Types.ObjectId;
    likes: mongoose.Types.ObjectId[];
    comments: {
        description: string;
        user: mongoose.Types.ObjectId;
        date: string;
    }[];
    date: string;
}

const postSchema = new Schema<IPost>({
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        description: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
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

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;