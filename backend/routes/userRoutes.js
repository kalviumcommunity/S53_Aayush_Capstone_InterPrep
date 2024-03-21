const express = require("express");
const { userValidation } = require("../utils/validation");
const User = require("../models/user");
var jwt = require("jsonwebtoken");
const app = express();
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");

require("dotenv").config({ path: "../.env" });

const userControl = express.Router();

app.use(express.json());
userControl.use(express.json());

const validateUser = (req, res, next) => {
    let { error } = userValidation.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

userControl.post(
    "/signup",
    validateUser,
    wrapAsync(async (req, res) => {
        let newUserData = new User(req.body);
        let findUser = await User.find({ username: req.body.username });
        if (findUser.length == 0) {
            await newUserData.save();
            let token = jwt.sign(
                { username: req.body.userName },
                process.env.JWT_PASS
            );
            res.send(token);
        } else {
            throw new ExpressError(400, "Username Exists");
        }
    })
);

userControl.use((err, req, res, next) => {
    let { status = 500, message = "Some error occured..!" } = err;
    res.status(status).send(message);
});


module.exports = { userControl };