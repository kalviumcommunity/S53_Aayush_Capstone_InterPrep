const express = require("express");
const { interviewerValidation } = require("../utils/validation");
var jwt = require("jsonwebtoken");
const Interviewer = require("../models/interviewer");
const app = express();
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const passwordHash = require('password-hash');

require("dotenv").config();

const interviewerControl = express.Router();

app.use(express.json());
interviewerControl.use(express.json());

const validateInterviewer = (req, res, next) => {
    let { error } = interviewerValidation.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

interviewerControl.get(
    "/",
    wrapAsync(async (req, res) => {
        await Interviewer.find().then((data) => { returnData = data });
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
        let { password } = req.body;
        let hashedPassword = passwordHash.generate(password);
        let newInterviewerData = new Interviewer({
            username: req.body.username,
            name: req.body.name,
            password: hashedPassword,
            image: req.body.image,
            info: req.body.info,
            contact: req.body.contact,
            certificate: req.body.certificate,
            reason: req.body.reason
        });
        let findUser = await Interviewer.find({ username: req.body.username });
        if (findUser.length == 0) {
            await newInterviewerData.save();
            let token = jwt.sign(
                { username: req.body.username },
                process.env.JWT_PASS
            );
            res.send(token);
        } else {
            throw new ExpressError(400, "Interviewer Username Exists");
        }
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
    let { status = 500, message = "Some error occured...!" } = err;
    res.status(status).send(message);
});


module.exports = { interviewerControl };