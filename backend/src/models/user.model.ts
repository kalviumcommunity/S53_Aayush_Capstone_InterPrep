import mongoose, { Document, Schema } from 'mongoose';
import formatDate from '../utils/formatDate';

export interface IUser extends Document {
    username: string;
    name: string;
    password: string;
    image: string;
    phone: number;
    email: string;
    interviews: mongoose.Types.ObjectId[];
    bookmarks: mongoose.Types.ObjectId[];
    jobsApplied: mongoose.Types.ObjectId[];
    posts: mongoose.Types.ObjectId[];
    dateJoined: string;
}

const userSchema = new Schema<IUser>({
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
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    interviews: [{
        type: Schema.Types.ObjectId,
        ref: "Interview"
    }],
    bookmarks: [{
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

// Create and export the User model
const User = mongoose.model<IUser>("User", userSchema);

export default User;