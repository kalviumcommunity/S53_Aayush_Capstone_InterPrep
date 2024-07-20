import ExpressError from "../utils/ExpressError.js";
import wrapAsync from "../utils/wrapAsync.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const getPosts = wrapAsync(async (req, res) => {
    const returnData = await Post.find().populate('user').populate('comments');
    if (returnData.length === 0) {
        throw new ExpressError(404, "No Posts Yet!");
    }
    res.send(returnData);
});

export const newPost = wrapAsync(async (req, res) => {
    let { description, username } = req.body;
    let newPostData = { description };
    let newPost = new Post(newPostData);
    let user = await User.findOne({ username: username });
    if (user) {
        newPost.user = username;
        newPost.save();
        user.posts.push(newPost);
        user.save();
        res.send("Done!");
    } else {
        throw new ExpressError(404, "Authentication Error!");
    }
});

export const likePost = wrapAsync(async (req, res) => {
    let { username } = req.body;
    let { id } = req.params;

    let likedPost = await Post.findById(id);
    if (!likedPost) {
        throw new ExpressError(404, "Post not found");
    }

    let user = await User.findOne({ username: username });
    if (!user) {
        throw new ExpressError(404, "User not found");
    }

    if (likedPost.likes.includes(user._id)) {
        return res.status(400).send("User has already liked this post");
    }

    likedPost.likes.push(user);
    await likedPost.save();

    res.send("Post liked successfully");
});

export const dislikePost = wrapAsync(async (req, res) => {
    let { username } = req.body;
    let { id } = req.params;

    let dislikedPost = await Post.findById(id);
    if (!dislikedPost) {
        throw new ExpressError(404, "Post not found");
    }

    let user = await User.findOne({ username: username });
    if (!user) {
        throw new ExpressError(404, "User not found");
    }

    if (!(dislikedPost.likes.includes(user._id))) {
        return res.status(400).send("User has not liked this post to dislike it");
    }

    dislikedPost.likes = dislikedPost.likes.filter(like => !like.equals(user._id));
    await dislikedPost.save();

    res.send("Post disliked successfully");
});

export const commentPost = wrapAsync(async (req, res) => {
    let { username, description } = req.body;
    let { id } = req.params;
    let postComment = await Post.findById(id);
    if (!postComment) {
        throw new ExpressError(404, "Post not Found!")
    }

    let user = await User.findOne({ username: username });
    if (!user) {
        throw new ExpressError(404, "User not found");
    }

    let newComment = { description: description, user: user._id }

    if (newComment) {
        postComment.comments.push(newComment);
    }

    await postComment.save();

    res.send("Comment Added!");
});

export const updatePost = wrapAsync(async (req, res) => {
    const { username, description } = req.body;
    const { id } = req.params;

    const updatePost = await Post.findById(id);
    if (!updatePost) {
        throw new ExpressError(404, "Post not found");
    }

    if (updatePost.user !== username) {
        throw new ExpressError(403, "Unauthorized to update this post");
    }

    updatePost.description = description;
    await updatePost.save();

    res.send("Post updated successfully");
});

export const deletePost = wrapAsync(async (req, res) => {
    let { username } = req.body;
    let { id } = req.params;
    let foundUser = await User.findOne({ username: username });
    if (!foundUser) {
        throw new ExpressError(404, "User not found");
    }
    let deletePost = await Post.findById(id);
    if (!deletePost) {
        throw new ExpressError(404, "Post not Found!")
    };
    if (deletePost.user != foundUser.username) {
        throw new ExpressError(403, "Unauthorized Request!")
    }
    await Post.findByIdAndDelete(id);
    foundUser.posts.pull(id);
    await foundUser.save();
    res.send("Post deleted successfully");
})