import ExpressError from "../utils/ExpressError.js";
import wrapAsync from "../utils/wrapAsync.js";
import Interviewer from "../models/interviewer.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const allInterviewers = wrapAsync(async (req, res) => {
    try {
        const returnData = await Interviewer.find().select("-password -certificate");
        res.send(returnData);
    } catch (err) {
        console.error("Error fetching interviewers:", err);
        throw new ExpressError(404, "Some Error Occurred");
    }
});

export const specificInterviewers = wrapAsync(async (req, res) => {
    let { username } = req.params;
    let result = await Interviewer.find({ username: username });
    if (result.length == 0) {
        throw new ExpressError(404, "No Interviewer Found!")
    };
    res.send(result);
});

export const signupInterviewer = wrapAsync(async (req, res) => {
    const { username, name, password, image, info, phone, email, certificate, about, mastery } = req.body;

    let findUser = await Interviewer.findOne({ username });
    if (findUser) {
        throw new ExpressError(400, "Interviewer username exists, try a new one!");
    }

    let findEmail = await Interviewer.findOne({ 'email': email });
    if (findEmail) {
        throw new ExpressError(400, "An account is already linked to the email.");
    }

    let findPhone = await Interviewer.findOne({ 'phone': phone });
    if (findPhone) {
        throw new ExpressError(400, "An account is already linked to the phone number.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newInterviewerData = new Interviewer({
        username,
        name,
        password: hashedPassword,
        image,
        info,
        phone,
        email,
        certificate,
        about,
        mastery
    });

    await newInterviewerData.save();

    let token = jwt.sign(
        { username },
        process.env.JWT_PASS
    );

    res.send(token);
});

export const signinInterviewer = wrapAsync(async (req, res) => {
        const { username, password } = req.body;
        const interviewerFind = await Interviewer.find({ username: username });

        if (interviewerFind.length !== 0) {
            const foundInterviewer = interviewerFind[0];
            const storedPassword = foundInterviewer.password;
            const isPasswordValid = await bcrypt.compare(password, storedPassword);

            if (isPasswordValid) {
                const token = jwt.sign(
                    {
                        username: foundInterviewer.username,
                        name: foundInterviewer.name,
                        type: "Interviewer"
                    },
                    process.env.JWT_PASS
                );
                res.send(token);
            } else {
                throw new ExpressError(401, "Wrong Password!");
            }
        } else {
            throw new ExpressError(404, "Username not found!");
        }
    })
