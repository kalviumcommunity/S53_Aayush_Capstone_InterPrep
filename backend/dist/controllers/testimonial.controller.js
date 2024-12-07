"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTestimonial = exports.getTestimonials = void 0;
const ExpressError_js_1 = __importDefault(require("../utils/ExpressError.js"));
const wrapAsync_js_1 = __importDefault(require("../utils/wrapAsync.js"));
const testimonial_model_js_1 = __importDefault(require("../models/testimonial.model.js"));
const user_model_js_1 = __importDefault(require("../models/user.model.js"));
exports.getTestimonials = (0, wrapAsync_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const returnData = yield testimonial_model_js_1.default.find().populate({
        path: 'user',
        select: 'name image'
    });
    if (returnData.length === 0) {
        throw new ExpressError_js_1.default(404, "No Posts Yet!");
    }
    res.send(returnData);
}));
exports.newTestimonial = (0, wrapAsync_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, username } = req.body;
    const newTestimonialData = { description };
    const newTestimonial = new testimonial_model_js_1.default(newTestimonialData);
    // Find the user by username
    const user = yield user_model_js_1.default.findOne({ username: username });
    if (user) {
        // Use user._id to assign to the user field in the Testimonial
        newTestimonial.user = user._id; // Corrected: assign ObjectId, not string
        yield newTestimonial.save(); // Ensure we wait for the save to complete
        res.send("Done!");
    }
    else {
        throw new ExpressError_js_1.default(404, "Authentication Error!");
    }
}));
