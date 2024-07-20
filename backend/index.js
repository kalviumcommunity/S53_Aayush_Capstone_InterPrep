import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userControl from "./routes/user.routes.js";
import interviewerControl from "./routes/interviewer.routes.js";
import postControl from "./routes/post.routes.js";
import jobControl from "./routes/jobs.routes.js";
import companyControl from "./routes/company.routes.js";
import apiControl from "./routes/api.routes.js";
import testimonialControl from "./routes/testimonial.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

main()
    .then(() => {
        console.log("Connection Successful with Database 📊!");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(process.env.MONGO_KEY);
};

app.get('/', (req, res) => {
    res.json("Backend Home Route is Working ✅!");
});

app.use('/user', userControl);
app.use('/interviewer', interviewerControl);
app.use('/post', postControl);
app.use('/jobs', jobControl)
app.use('/company', companyControl);
app.use('/testimonial', testimonialControl);
app.use('/api', apiControl);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Connected to server ${PORT} 🚀!`);
})