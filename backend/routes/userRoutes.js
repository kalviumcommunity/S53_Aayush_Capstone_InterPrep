const express = require("express");
const { userValidation } = require("../utils/validation");
const User = require("../models/user");
var jwt = require("jsonwebtoken");
const app = express();
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const passwordHash = require('password-hash');

require("dotenv").config();

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
        let { password } = req.body;
        let hashedPassword = passwordHash.generate(password);
        let newUserData = new User({
            username:req.body.username,
            name:req.body.name,
            image: req.body.image,
            password:hashedPassword,
            contact: req.body.contact 
        });
        let findUser = await User.find({ username: req.body.username });
        if (findUser.length == 0) {
            await newUserData.save();
            let token = jwt.sign(
                { username: req.body.username },
                process.env.JWT_PASS
            );
            res.send(token);
        } else {
            throw new ExpressError(400, "Username Exists");
        }
    })
);

userControl.post(
    "/signin",
    wrapAsync(async (req, res) => {
        let { username, password } = req.body;
        let userFind = await User.find({username: username});
        if (userFind.length != 0){
            let foundUser = userFind[0]
            let storedPassword = foundUser.password;
            if (passwordHash.verify(password, storedPassword)) {
                let token = jwt.sign(
                    {
                        username : foundUser.username,
                        name: foundUser.name,
                        type: "User"
                    },
                    process.env.JWT_PASS
                );
                res.send(token);
            }else {
                throw new ExpressError(401, "Wrong Password!");
            }
        } else {
            throw new ExpressError(404, "Username not found!");
        }
    })
)

userControl.use((err, req, res, next) => {
    let { status = 500, message = "Some error occured...!" } = err;
    res.status(status).send(message);
});


module.exports = { userControl };