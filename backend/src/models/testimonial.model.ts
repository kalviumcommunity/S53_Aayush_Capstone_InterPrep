import mongoose, { Document, Schema } from 'mongoose';
import formatDate from '../utils/formatDate';
import { format } from 'path';

interface ITestimonial extends Document {
    description: string;
    user: mongoose.Types.ObjectId;
    date: string;
}

const testimonialSchema = new Schema<ITestimonial>({
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
});

const Testimonial = mongoose.model<ITestimonial>("Testimonial", testimonialSchema);

export default Testimonial;