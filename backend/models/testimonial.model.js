import mongoose, { Schema } from 'mongoose';

const testimonialSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId
    }
})

const Testimonial = mongoose.model("Testimonials", testimonialSchema);

export default Testimonial;