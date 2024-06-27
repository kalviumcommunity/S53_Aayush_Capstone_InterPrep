import express from "express";
import jwt from "jsonwebtoken";
import ExpressError from "../utils/ExpressError.js";
import { postValidation, commentValidation } from "../utils/validation.js";
import { commentPost, deletePost, dislikePost, getPosts, likePost, newPost, updatePost } from "../controllers/post.controller.js";
import dotenv from "dotenv";

dotenv.config();

const postControl = express.Router();

postControl.use(express.json());

const jwtVerify = (req, res, next) => {
    try {
        let { authorization } = req.headers;
        let result = jwt.verify(authorization, process.env.JWT_PASS);
        if (result && (result.type == "User")) {
            req.body.username = result.username;
            next();
        }else{
            throw new ExpressError(
                403,
                "Invalid Token"
            )
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

postControl.get("/", getPosts);

postControl.post("/new", validatePost, jwtVerify, newPost);

postControl.post("/like/:id", jwtVerify, likePost);

postControl.post("/dislike/:id", jwtVerify, dislikePost);

postControl.post("/comment/:id", validateComment, jwtVerify, commentPost);

postControl.put("/update/:id", validatePost, jwtVerify, updatePost);

postControl.delete("/delete/:id", jwtVerify, deletePost);

postControl.use((err, req, res, next) => {
    let { status = 500, message = "Some error occured...!" } = err;
    res.status(status).send(message);
});

export default postControl;