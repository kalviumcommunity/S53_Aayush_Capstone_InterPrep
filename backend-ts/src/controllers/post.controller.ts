import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import ExpressError from "../utils/ExpressError.js";
import wrapAsync from "../utils/wrapAsync.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import formatDate from "../utils/formatDate.js";

// Get all posts
export const getPosts = wrapAsync(async (req: Request, res: Response): Promise<void> => {
    const returnData = await Post.find().populate('user').populate('comments');
    if (returnData.length === 0) {
        throw new ExpressError(404, "No Posts Yet!");
    }
    res.send(returnData);
});

// Create a new post
export const newPost = wrapAsync(async (req: Request, res: Response): Promise<void> => {
    const { description, username } = req.body;

    const newPostData = { description };
    const newPost = new Post(newPostData);

    // Find the user by username
    const user = await User.findOne({ username });

    if (user) {
        // Explicitly cast to ObjectId for type safety
        newPost.user = user._id as mongoose.Types.ObjectId; 
        
        // Save the new post
        await newPost.save();

        // Push the post's _id to the user's posts array
        user.posts.push(newPost._id as mongoose.Types.ObjectId);

        // Save the user after adding the post
        await user.save();

        res.send("Done!");
    } else {
        throw new ExpressError(404, "Authentication Error!");
    }
});

// Like a post
export const likePost = wrapAsync(async (req: Request, res: Response): Promise<void> => {
    let { username } = req.body;
    let { id } = req.params;

    // Find the post by ID
    let likedPost = await Post.findById(id);
    if (!likedPost) {
        throw new ExpressError(404, "Post not found");
    }

    // Find the user by username
    let user = await User.findOne({ username });
    if (!user) {
        throw new ExpressError(404, "User not found");
    }

    // Check if the user has already liked the post
    if (likedPost.likes.includes(user._id as mongoose.Types.ObjectId)) {
        throw new ExpressError(400, "User already liked the Post!");

    }

    // Add the user to the likes array
    likedPost.likes.push(user._id as mongoose.Types.ObjectId);
    await likedPost.save();

    res.send("Post liked successfully");
});

// Dislike a post
export const dislikePost = wrapAsync(async (req: Request, res: Response): Promise<void> => {
    let { username } = req.body;
    let { id } = req.params;

    // Find the post by ID
    let dislikedPost = await Post.findById(id);
    if (!dislikedPost) {
        throw new ExpressError(404, "Post not found");
    }

    // Find the user by username
    let user = await User.findOne({ username });
    if (!user) {
        throw new ExpressError(404, "User not found");
    }

    // Check if the user has liked the post before disliking it
    if (!(dislikedPost.likes.includes(user._id as mongoose.Types.ObjectId))) {
        throw new ExpressError(400, "User has not liked this post to dislike it");
    }

    // Remove the user from the likes array
    dislikedPost.likes = dislikedPost.likes.filter(like => !like.equals(user._id as mongoose.Types.ObjectId));
    await dislikedPost.save();

    res.send("Post disliked successfully");
});

// Add a comment to a post
export const commentPost = wrapAsync(async (req: Request, res: Response): Promise<void> => {
    let { username, description } = req.body;
    let { id } = req.params;

    // Find the post by ID
    let postComment = await Post.findById(id);
    if (!postComment) {
        throw new ExpressError(404, "Post not Found!")
    }

    // Find the user by username
    let user = await User.findOne({ username });
    if (!user) {
        throw new ExpressError(404, "User not found");
    }

    // Create a new comment
    
    // Push the comment to the post's comments array

    const comment = {
        description: description,
        user: user._id as mongoose.Types.ObjectId,
        date: formatDate(),
    };

    // Push the new comment into the comments array
    postComment.comments.push(comment);

    await postComment.save();

    res.send("Comment Added!");
});

// Update a post
export const updatePost = wrapAsync(async (req: Request, res: Response): Promise<void> => {
    const { username, description } = req.body;
    const { id } = req.params;

    // Find the post by ID
    const updatePost = await Post.findById(id);
    if (!updatePost) {
        throw new ExpressError(404, "Post not found");
    }

    // Check if the current user is the one who created the post
    if (updatePost.user.toString() !== username) {
        throw new ExpressError(403, "Unauthorized to update this post");
    }

    // Update the post's description
    updatePost.description = description;
    await updatePost.save();

    res.send("Post updated successfully");
});

// Delete a post

export const deletePost = wrapAsync(async (req: Request, res: Response): Promise<void> => {
    let { username } = req.body;
    let { id } = req.params;

    // Find the user by username
    let foundUser = await User.findOne({ username: username });
    if (!foundUser) {
        throw new ExpressError(404, "User not found");
    }

    // Find the post by ID
    let deletePost = await Post.findById(id);
    if (!deletePost) {
        throw new ExpressError(404, "Post not Found!");
    }

    // Ensure the post belongs to the current user
    if (!deletePost.user.equals(foundUser.username)) {  // Use foundUser._id for ObjectId comparison
        throw new ExpressError(403, "Unauthorized Request!");
    }

    // Delete the post
    await Post.findByIdAndDelete(id);
    
    // Type casting to ensure we can use Mongoose array methods like 'pull'
    const postsArray = foundUser.posts as mongoose.Types.Array<mongoose.Types.ObjectId>;

    // Remove the post from the user's posts array
    postsArray.pull(id);

    // Save the updated user document
    await foundUser.save();

    res.send("Post deleted successfully");
});