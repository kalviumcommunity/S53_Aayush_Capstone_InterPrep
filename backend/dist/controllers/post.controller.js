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
exports.deletePost = exports.updatePost = exports.commentPost = exports.dislikePost = exports.likePost = exports.newPost = exports.getPosts = void 0;
const ExpressError_js_1 = __importDefault(require("../utils/ExpressError.js"));
const wrapAsync_js_1 = __importDefault(require("../utils/wrapAsync.js"));
const post_model_js_1 = __importDefault(require("../models/post.model.js"));
const user_model_js_1 = __importDefault(require("../models/user.model.js"));
const formatDate_js_1 = __importDefault(require("../utils/formatDate.js"));
// Get all posts
exports.getPosts = (0, wrapAsync_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const returnData = yield post_model_js_1.default.find().populate('user').populate('comments');
    if (returnData.length === 0) {
        throw new ExpressError_js_1.default(404, "No Posts Yet!");
    }
    res.send(returnData);
}));
// Create a new post
exports.newPost = (0, wrapAsync_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, username } = req.body;
    const newPostData = { description };
    const newPost = new post_model_js_1.default(newPostData);
    // Find the user by username
    const user = yield user_model_js_1.default.findOne({ username });
    if (user) {
        // Explicitly cast to ObjectId for type safety
        newPost.user = user._id;
        // Save the new post
        yield newPost.save();
        // Push the post's _id to the user's posts array
        user.posts.push(newPost._id);
        // Save the user after adding the post
        yield user.save();
        res.send("Done!");
    }
    else {
        throw new ExpressError_js_1.default(404, "Authentication Error!");
    }
}));
// Like a post
exports.likePost = (0, wrapAsync_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username } = req.body;
    let { id } = req.params;
    // Find the post by ID
    let likedPost = yield post_model_js_1.default.findById(id);
    if (!likedPost) {
        throw new ExpressError_js_1.default(404, "Post not found");
    }
    // Find the user by username
    let user = yield user_model_js_1.default.findOne({ username });
    if (!user) {
        throw new ExpressError_js_1.default(404, "User not found");
    }
    // Check if the user has already liked the post
    if (likedPost.likes.includes(user._id)) {
        throw new ExpressError_js_1.default(400, "User already liked the Post!");
    }
    // Add the user to the likes array
    likedPost.likes.push(user._id);
    yield likedPost.save();
    res.send("Post liked successfully");
}));
// Dislike a post
exports.dislikePost = (0, wrapAsync_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username } = req.body;
    let { id } = req.params;
    // Find the post by ID
    let dislikedPost = yield post_model_js_1.default.findById(id);
    if (!dislikedPost) {
        throw new ExpressError_js_1.default(404, "Post not found");
    }
    // Find the user by username
    let user = yield user_model_js_1.default.findOne({ username });
    if (!user) {
        throw new ExpressError_js_1.default(404, "User not found");
    }
    // Check if the user has liked the post before disliking it
    if (!(dislikedPost.likes.includes(user._id))) {
        throw new ExpressError_js_1.default(400, "User has not liked this post to dislike it");
    }
    // Remove the user from the likes array
    dislikedPost.likes = dislikedPost.likes.filter(like => !like.equals(user._id));
    yield dislikedPost.save();
    res.send("Post disliked successfully");
}));
// Add a comment to a post
exports.commentPost = (0, wrapAsync_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, description } = req.body;
    let { id } = req.params;
    // Find the post by ID
    let postComment = yield post_model_js_1.default.findById(id);
    if (!postComment) {
        throw new ExpressError_js_1.default(404, "Post not Found!");
    }
    // Find the user by username
    let user = yield user_model_js_1.default.findOne({ username });
    if (!user) {
        throw new ExpressError_js_1.default(404, "User not found");
    }
    // Create a new comment
    // Push the comment to the post's comments array
    const comment = {
        description: description,
        user: user._id,
        date: (0, formatDate_js_1.default)(),
    };
    // Push the new comment into the comments array
    postComment.comments.push(comment);
    yield postComment.save();
    res.send("Comment Added!");
}));
// Update a post
exports.updatePost = (0, wrapAsync_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, description } = req.body;
    const { id } = req.params;
    // Find the post by ID
    const updatePost = yield post_model_js_1.default.findById(id);
    if (!updatePost) {
        throw new ExpressError_js_1.default(404, "Post not found");
    }
    // Check if the current user is the one who created the post
    if (updatePost.user.toString() !== username) {
        throw new ExpressError_js_1.default(403, "Unauthorized to update this post");
    }
    // Update the post's description
    updatePost.description = description;
    yield updatePost.save();
    res.send("Post updated successfully");
}));
// Delete a post
exports.deletePost = (0, wrapAsync_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username } = req.body;
    let { id } = req.params;
    // Find the user by username
    let foundUser = yield user_model_js_1.default.findOne({ username: username });
    if (!foundUser) {
        throw new ExpressError_js_1.default(404, "User not found");
    }
    // Find the post by ID
    let deletePost = yield post_model_js_1.default.findById(id);
    if (!deletePost) {
        throw new ExpressError_js_1.default(404, "Post not Found!");
    }
    // Ensure the post belongs to the current user
    if (!deletePost.user.equals(foundUser.username)) { // Use foundUser._id for ObjectId comparison
        throw new ExpressError_js_1.default(403, "Unauthorized Request!");
    }
    // Delete the post
    yield post_model_js_1.default.findByIdAndDelete(id);
    // Type casting to ensure we can use Mongoose array methods like 'pull'
    const postsArray = foundUser.posts;
    // Remove the post from the user's posts array
    postsArray.pull(id);
    // Save the updated user document
    yield foundUser.save();
    res.send("Post deleted successfully");
}));
