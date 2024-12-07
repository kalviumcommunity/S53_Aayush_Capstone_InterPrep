import ExpressError from "../utils/ExpressError.js";
import wrapAsync from "../utils/wrapAsync.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

// Define the shape of the request body for signup and signin
interface SignupBody {
    username: string;
    name: string;
    image: string;
    password: string;
    email: string;
    phone: string;
}

interface SigninBody {
    username: string;
    password: string;
}

// Signup function
export const signupUser = wrapAsync(async (req: Request<{}, {}, SignupBody>, res: Response): Promise<void> => {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUserData = new User({
        username: req.body.username,
        name: req.body.name,
        image: req.body.image,
        password: hashedPassword,
        email: req.body.email,
        phone: req.body.phone
    });

    const findUser = await User.find({ username: req.body.username });
    if (findUser.length === 0) {
        await newUserData.save();
        const token = jwt.sign(
            { username: req.body.username },
            process.env.JWT_PASS as string
        );
        res.send(token);
    } else {
        throw new ExpressError(400, "Username Exists");
    }
});

// Signin function
export const signinUser = wrapAsync(async (req: Request<{}, {}, SigninBody>, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const userFind = await User.find({ username: username });

    if (userFind.length !== 0) {
        const foundUser = userFind[0];
        const storedPassword = foundUser.password;
        const isPasswordValid = await bcrypt.compare(password, storedPassword);

        if (isPasswordValid) {
            const token = jwt.sign(
                {
                    username: foundUser.username,
                    name: foundUser.name,
                    type: "User"
                },
                process.env.JWT_PASS as string
            );
            res.send(token);
        } else {
            throw new ExpressError(401, "Wrong Password!");
        }
    } else {
        throw new ExpressError(404, "Username not found!");
    }
});