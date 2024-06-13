const express = require("express");
const { companyValidation } = require("../utils/validation");
var jwt = require("jsonwebtoken");
const app = express();
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const Company = require("../models/company");
const passwordHash = require('password-hash');

require("dotenv").config();

const companyControl = express.Router();

app.use(express.json());
companyControl.use(express.json());

const validateCompany = (req, res, next) => {
    let { error } = companyValidation.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

companyControl.get(
    "/",
    wrapAsync(async (req, res) => {
        await Company.find().then((data) => { returnData = data });
        res.send(returnData);
    })
);

companyControl.post(
    '/signup',
    validateCompany,
    wrapAsync(async (req, res) => {
        let { password } = req.body;
        let hashedPassword = passwordHash.generate(password);
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
    })
);

companyControl.post(
    '/signin',
    wrapAsync(async (req, res) => {
        let { username, password } = req.body;
        let companyFind = await Company.findOne({username:username});
        if (companyFind != null){
            let storedPassword = companyFind.password;
            if(passwordHash.verify(password, storedPassword)){
                let token = jwt.sign(
                    {
                        username: companyFind.username,
                        name: companyFind.name,
                        type: "Company"
                    },
                    process.env.JWT_PASS
                );
                res.send(token);
            }else{
                throw new ExpressError(401, "Wrong Password!")
            }
        }else{
            throw new ExpressError(404, "Company not found!")
        }
    })
)

companyControl.use((err, req, res, next) => {
    let { status = 500, message = "Some error occured...!" } = err;
    res.status(status).send(message);
});


module.exports = { companyControl };