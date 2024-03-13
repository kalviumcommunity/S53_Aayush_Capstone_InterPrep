const express = require("express");
const app = express();

const control = express.Router();

app.use(express.json());
control.use(express.json());

control.get("/", (req, res)=>{
    res.json("Control Route is working! ✅");
});

module.exports = { control };