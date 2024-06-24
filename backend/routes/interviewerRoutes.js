const express = require("express");
const { interviewerValidation } = require("../utils/validation");
var jwt = require("jsonwebtoken");
const Interviewer = require("../models/interviewer");
const app = express();
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const passwordHash = require('password-hash');
const User = require("../models/user");

require("dotenv").config();

const interviewerControl = express.Router();

app.use(express.json());
interviewerControl.use(express.json());

const validateInterviewer = (req, res, next) => {
    let { error } = interviewerValidation.validate(req.body);
    if (error) {
        return next(new ExpressError(400, error.details[0].message));
    } 
    if (!req.body.contact || !req.body.contact.phone || !req.body.contact.email) {
        return next(new ExpressError(400, "Phone number and email are required."));
    }
    next();
};

interviewerControl.get(
    "/home",
    wrapAsync(async (req, res) => {
        await Interviewer.find().select(["-password", "-certificate","-contact"]).then((data) => { returnData = data });
        res.send(returnData);
    })
);

interviewerControl.get(
    "/:username",
    wrapAsync(async (req, res) => {
        let { username } = req.params;
        let result = await Interviewer.find({ username: username });
        if (result.length == 0) {
            throw new ExpressError(404, "No Interviewer Found!")
        };
        res.send(result);
    })
);

interviewerControl.post(
    "/signup",
    validateInterviewer,
    wrapAsync(async (req, res) => {
        const { username, name, password, image, info, contact, certificate, about, mastery } = req.body;

        if (!contact.phone || !contact.email) {
            throw new ExpressError(400, "Phone number and email are required.");
        }

        let hashedPassword = passwordHash.generate(password);
        let newInterviewerData = new Interviewer({
            username,
            name,
            password: hashedPassword,
            image,
            info,
            contact,
            certificate,
            about,
            mastery
        });
        console.log(contact);
        let findUser = await Interviewer.findOne({ username });
        let findEmail = await Interviewer.findOne({ 'contact.email': contact.email });
        let findPhone = await Interviewer.findOne({ 'contact.phone': contact.phone });

        if (findUser) {
            throw new ExpressError(400, "Interviewer username exists, try a new one!");
        }

        if (findEmail) {
            throw new ExpressError(400, "An account is already linked to the email.");
        }

        if (findPhone) {
            throw new ExpressError(400, "An account is already linked to the phone number.");
        }

        await newInterviewerData.save();
        let token = jwt.sign(
            { username },
            process.env.JWT_PASS
        );
        res.send(token);
    })
);

interviewerControl.post(
    "/signin",
    wrapAsync(async (req, res) => {
        let { username, password } = req.body;
        let interviewerFind = await Interviewer.find({ username: username });
        if (interviewerFind.length != 0) {
            let foundInterviewer = interviewerFind[0]
            let storedPassword = foundInterviewer.password;
            if (passwordHash.verify(password, storedPassword)) {
                let token = jwt.sign(
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
)

interviewerControl.use((err, req, res, next) => {
    console.log(err);
    let { status = 500, message = "Some error occured...!" } = err;
    res.status(status).send(message);
});


module.exports = { interviewerControl };