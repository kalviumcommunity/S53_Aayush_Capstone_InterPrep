"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ExpressError_1 = __importDefault(require("../utils/ExpressError"));
const validation_1 = require("../utils/validation");
const post_controller_1 = require("../controllers/post.controller");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const postControl = express_1.default.Router();
postControl.use(express_1.default.json());
const jwtVerify = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new ExpressError_1.default(403, "Authorization token is required.");
        }
        const result = jsonwebtoken_1.default.verify(authorization, process.env.JWT_PASS);
        if (result && result.type === "User") {
            req.body.username = result.username;
            next();
        }
        else {
            throw new ExpressError_1.default(403, "Invalid Token");
        }
    }
    catch (err) {
        throw new ExpressError_1.default(403, "Not authorised to access this route without correct auth token.");
    }
};
const validatePost = (req, res, next) => {
    const { error } = validation_1.postValidation.validate(req.body);
    if (error) {
        throw new ExpressError_1.default(400, error.details[0].message);
    }
    else {
        next();
    }
};
const validateComment = (req, res, next) => {
    const { error } = validation_1.commentValidation.validate(req.body);
    if (error) {
        throw new ExpressError_1.default(400, error.details[0].message);
    }
    else {
        next();
    }
};
postControl.get("/", post_controller_1.getPosts);
postControl.post("/new", validatePost, jwtVerify, post_controller_1.newPost);
postControl.post("/like/:id", jwtVerify, post_controller_1.likePost);
postControl.post("/dislike/:id", jwtVerify, post_controller_1.dislikePost);
postControl.post("/comment/:id", validateComment, jwtVerify, post_controller_1.commentPost);
postControl.put("/update/:id", validatePost, jwtVerify, post_controller_1.updatePost);
postControl.delete("/delete/:id", jwtVerify, post_controller_1.deletePost);
postControl.use((err, req, res, next) => {
    const { status = 500, message = "Some error occurred...!" } = err;
    res.status(status).send(message);
});
exports.default = postControl;
