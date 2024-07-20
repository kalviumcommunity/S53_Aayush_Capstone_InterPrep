import ExpressError from "../utils/ExpressError.js";
import wrapAsync from "../utils/wrapAsync.js";
import Testimonial from "../models/testimonial.model.js";
import User from "../models/user.model.js";

export const getTestimonials = wrapAsync(async (req, res) => {
    const returnData = await Testimonial.find().populate({
        path: 'user',
        select: 'name image'
    });
    if (returnData.length === 0) {
        throw new ExpressError(404, "No Posts Yet!");
    }
    res.send(returnData);
});

export const newTestimonial = wrapAsync(async (req, res) => {
    let { description, username } = req.body;
    let newTestimonialData = { description };
    let newTestimonial = new Post(newTestimonialData);
    let user = await User.findOne({ username: username });
    if (user) {
        newTestimonial.user = user.name;
        newTestimonial.save();
        res.send("Done!");
    } else {
        throw new ExpressError(404, "Authentication Error!");
    }
})