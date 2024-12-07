import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ExpressError from "../utils/ExpressError";
import { postValidation, commentValidation } from "../utils/validation";
import { commentPost, deletePost, dislikePost, getPosts, likePost, newPost, updatePost } from "../controllers/post.controller";
import dotenv from "dotenv";

dotenv.config();

const postControl = express.Router();

postControl.use(express.json());

const jwtVerify = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new ExpressError(403, "Authorization token is required.");
        }
        const result: any = jwt.verify(authorization, process.env.JWT_PASS as string);
        if (result && result.type === "User") {
            req.body.username = result.username;
            next();
        } else {
            throw new ExpressError(403, "Invalid Token");
        }
    } catch (err) {
        throw new ExpressError(403, "Not authorised to access this route without correct auth token.");
    }
};

const validatePost = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = postValidation.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    } else {
        next();
    }
};

const validateComment = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = commentValidation.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    } else {
        next();
    }
};

postControl.get("/", getPosts);

postControl.post("/new", validatePost, jwtVerify, newPost);

postControl.post("/like/:id", jwtVerify, likePost);

postControl.post("/dislike/:id", jwtVerify, dislikePost);

postControl.post("/comment/:id", validateComment, jwtVerify, commentPost);

postControl.put("/update/:id", validatePost, jwtVerify, updatePost);

postControl.delete("/delete/:id", jwtVerify, deletePost);

postControl.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message = "Some error occurred...!" } = err;
    res.status(status).send(message);
});

export default postControl;