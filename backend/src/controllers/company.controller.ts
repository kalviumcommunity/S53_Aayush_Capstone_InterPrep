import { Request, Response } from "express";
import ExpressError from "../utils/ExpressError";
import wrapAsync from "../utils/wrapAsync";
import Company from "../models/company.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getCompanies = wrapAsync(async (req: Request, res: Response) => {
    const companies = await Company.find();
    res.send(companies);
});

export const signupCompany = wrapAsync(async (req: Request, res: Response) => {
    const { password, username, company, website, image, description, hiring } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const findCompany = await Company.findOne({ username });

    if (!findCompany) {
        const newCompany = new Company({
            company,
            username,
            password: hashedPassword,
            website,
            image,
            description,
            hiring,
        });

        await newCompany.save();

        const token = jwt.sign(
            {
                username,
                company,
                type: "Company",
            },
            process.env.JWT_PASS as string
        );

        res.send(token);
    } else {
        throw new ExpressError(400, "Company with this username already exists!");
    }
});

export const signinCompany = wrapAsync(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const companyFind = await Company.findOne({ username });

    if (companyFind) {
        const storedPassword = companyFind.password;
        const isPasswordValid = await bcrypt.compare(password, storedPassword);

        if (isPasswordValid) {
            const token = jwt.sign(
                {
                    username: companyFind.username,
                    name: companyFind.company,
                    type: "Company",
                },
                process.env.JWT_PASS as string
            );
            res.send(token);
        } else {
            throw new ExpressError(401, "Wrong Password!");
        }
    } else {
        throw new ExpressError(404, "Company not found!");
    }
});