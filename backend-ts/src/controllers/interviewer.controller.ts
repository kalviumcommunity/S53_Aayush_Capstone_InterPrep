import { Request, Response } from "express";
import ExpressError from "../utils/ExpressError";
import wrapAsync from "../utils/wrapAsync";
import Interviewer from "../models/interviewer.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const allInterviewers = wrapAsync(async (req: Request, res: Response) => {
  try {
    // Fetch all interviewers excluding password and certificate fields
    const returnData = await Interviewer.find().select("-password -certificate");
    res.send(returnData);
  } catch (err) {
    console.error("Error fetching interviewers:", err);
    throw new ExpressError(404, "Some Error Occurred");
  }
});

export const specificInterviewers = wrapAsync(async (req: Request, res: Response) => {
  const { username } = req.params;

  // Find interviewer by username
  const result = await Interviewer.find({ username });
  if (result.length === 0) {
    throw new ExpressError(404, "No Interviewer Found!");
  }

  res.send(result);
});

export const signupInterviewer = wrapAsync(async (req: Request, res: Response) => {
  const {
    username,
    name,
    password,
    image,
    info,
    phone,
    email,
    certificate,
    about,
    mastery,
  } = req.body;

  // Check if username exists
  const findUser = await Interviewer.findOne({ username });
  if (findUser) {
    throw new ExpressError(400, "Interviewer username exists, try a new one!");
  }

  // Check if email exists
  const findEmail = await Interviewer.findOne({ email });
  if (findEmail) {
    throw new ExpressError(400, "An account is already linked to the email.");
  }

  // Check if phone number exists
  const findPhone = await Interviewer.findOne({ phone });
  if (findPhone) {
    throw new ExpressError(400, "An account is already linked to the phone number.");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new interviewer
  const newInterviewerData = new Interviewer({
    username,
    name,
    password: hashedPassword,
    image,
    info,
    phone,
    email,
    certificate,
    about,
    mastery,
  });

  await newInterviewerData.save();

  // Generate a JWT token
  const token = jwt.sign(
    { username },
    process.env.JWT_PASS as string
  );

  res.send(token);
});

export const signinInterviewer = wrapAsync(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Find interviewer by username
  const interviewerFind = await Interviewer.find({ username });

  if (interviewerFind.length !== 0) {
    const foundInterviewer = interviewerFind[0];
    const storedPassword = foundInterviewer.password;
    const isPasswordValid = await bcrypt.compare(password, storedPassword);

    if (isPasswordValid) {
      // Generate a JWT token
      const token = jwt.sign(
        {
          username: foundInterviewer.username,
          name: foundInterviewer.name,
          type: "Interviewer",
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