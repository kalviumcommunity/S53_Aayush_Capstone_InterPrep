const express = require("express");
var jwt = require("jsonwebtoken");
const app = express();
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const Post = require("../models/post");
const User = require("../models/user");
const { postValidation, commentValidation } = require("../utils/validation");

require("dotenv").config();

const postControl = express.Router();

app.use(express.json());
postControl.use(express.json());

const jwtVerify = (req, res, next) => {
    try {
        let { authorization } = req.headers;
        let result = jwt.verify(authorization, process.env.JWT_PASS);
        if (result) {
            req.body.username = result.username;
            next();
        }
    } catch (err) {
        throw new ExpressError(
            403,
            "Not authorised to access this route without correct auth token."
        )
    }
};

const validatePost = (req, res, next) => {
    let { error } = postValidation.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

const validateComment = (req, res, next) => {
    let { error } = commentValidation.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

postControl.get(
    "/",
    wrapAsync(async (req, res) => {
        await Post.find().populate('user').populate('comments').then((data) => { returnData = data });
        if (returnData.length == 0) {
            throw new ExpressError(404, "No Posts Yet!")
        }
        res.send(returnData)
    })
);

postControl.post(
    "/new",
    validatePost,
    jwtVerify,
    wrapAsync(async (req, res) => {
        let { description, username } = req.body;
        let newPostData = { description };
        let newPost = new Post(newPostData);
        let user = await User.findOne({ username: username });
        if (user) {
            newPost.user = user;
            newPost.save();
            user.posts.push(newPost);
            user.save();
            res.send("Done!");
        } else {
            throw new ExpressError(404, "Authentication Error!");
        }
    })
);

postControl.post(
    "/like/:id",
    jwtVerify,
    wrapAsync(async (req, res) => {
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
    })
);

postControl.post(
    "/dislike/:id",
    jwtVerify,
    wrapAsync(async (req, res) => {
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
    })
);

postControl.post(
    "/comment/:id",
    validateComment,
    jwtVerify,
    wrapAsync(async (req, res) => {
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
    })
);

postControl.delete(
    "/delete/:id",
    jwtVerify,
    wrapAsync(async (req, res) => {
        let { username } = req.body;
        let { id } = req.params;
        let foundUser = await User.findOne({ username: username });
        if (!foundUser) {
            throw new ExpressError(404, "User not found");
        }
        let deletePost = await Post.findById(id).populate('user');
        if (!deletePost) {
            throw new ExpressError(404, "Post not Found!")
        };
        if (deletePost.user.username != foundUser.username) {
            throw new ExpressError(403, "Unauthorized Request!")
        }
        await Post.findByIdAndDelete(id);
        res.send("Post deleted successfully");
    })
);

postControl.use((err, req, res, next) => {
    let { status = 500, message = "Some error occured...!" } = err;
    res.status(status).send(message);
});

module.exports = { postControl };