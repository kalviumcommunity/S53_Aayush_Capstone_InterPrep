import mongoose, { Schema, Document, Model } from 'mongoose';
import formatDate from '../utils/formatDate';

// Define an interface for the Company model
export interface ICompany extends Document {
    company: string;
    username: string;
    password: string;
    website: string;
    description: {
        culture: string;
        values: string;
    };
    jobs: mongoose.Types.ObjectId[];
    hiring: boolean;
    image: string;
    dateJoined: string;
}

// Create the schema
const companySchema: Schema<ICompany> = new Schema({
    company: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // Ensures password is excluded from query results by default
    },
    website: {
        type: String,
        required: true,
    },
    description: {
        culture: {
            type: String,
            required: true,
        },
        values: {
            type: String,
            required: true,
        },
    },
    jobs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Jobs",
        },
    ],
    hiring: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        required: true,
    },
    dateJoined: {
        type: String,
        default: formatDate,
    },
});

// Create and export the model
const Company: Model<ICompany> = mongoose.model<ICompany>("Company", companySchema);

export default Company;