import ExpressError from "../utils/ExpressError.js";
import wrapAsync from "../utils/wrapAsync.js";
import Company from "../models/company.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getCompanies = wrapAsync(async (req, res) => {
    await Company.find().then((data) => { returnData = data });
    res.send(returnData);
});

export const signupCompany = wrapAsync(async (req, res) => {
    let { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let findCompany = await Company.find({ username: req.body.username });
    let newCompany = new Company({
        company: req.body.company,
        username: req.body.username,
        password: hashedPassword,
        website: req.body.website,
        image: req.body.image,
        description: req.body.description,
        hiring: req.body.hiring
    });
    if (findCompany.length == 0){
        await newCompany.save();
        let token = jwt.sign( {
            username: req.body.username,
            company: req.body.company,
            type: "Company"
        }, process.env.JWT_PASS)
        res.send(token)
    }else {
        throw new ExpressError(400, "Company with this username already exists!")
    }
});

export const signinCompany = wrapAsync(async (req, res) => {
    const { username, password } = req.body;
    const companyFind = await Company.findOne({ username: username });

    if (companyFind) {
        const storedPassword = companyFind.password;
        const isPasswordValid = await bcrypt.compare(password, storedPassword);

        if (isPasswordValid) {
            const token = jwt.sign(
                {
                    username: companyFind.username,
                    name: companyFind.company,
                    type: "Company"
                },
                process.env.JWT_PASS
            );
            res.send(token);
        } else {
            throw new ExpressError(401, "Wrong Password!");
        }
    } else {
        throw new ExpressError(404, "Company not found!");
    }
});