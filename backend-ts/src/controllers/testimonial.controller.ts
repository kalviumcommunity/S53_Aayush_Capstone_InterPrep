import ExpressError from "../utils/ExpressError.js";
import wrapAsync from "../utils/wrapAsync.js";
import Testimonial from "../models/testimonial.model.js";
import User from "../models/user.model.js";
import { Request, Response } from "express";
import mongoose from "mongoose";

export const getTestimonials = wrapAsync(async (req: Request, res: Response) => {
    const returnData = await Testimonial.find().populate({
        path: 'user',
        select: 'name image'
    });
    if (returnData.length === 0) {
        throw new ExpressError(404, "No Posts Yet!");
    }
    res.send(returnData);
});

export const newTestimonial = wrapAsync(async (req: Request, res: Response) => {
    const { description, username } = req.body;
    const newTestimonialData = { description };
    const newTestimonial = new Testimonial(newTestimonialData);

    // Find the user by username
    const user = await User.findOne({ username: username });
    if (user) {
        // Use user._id to assign to the user field in the Testimonial
        newTestimonial.user = user._id as mongoose.Types.ObjectId; // Corrected: assign ObjectId, not string
        await newTestimonial.save();  // Ensure we wait for the save to complete
        res.send("Done!");
    } else {
        throw new ExpressError(404, "Authentication Error!");
    }
});