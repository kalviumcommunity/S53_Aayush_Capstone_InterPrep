import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Importing route handlers
import userControl from "./routes/user.routes";
import postControl from "./routes/post.routes";
import jobControl from "./routes/jobs.routes";
import companyControl from "./routes/company.routes";
import apiControl from "./routes/api.routes";
import testimonialControl from "./routes/testimonials.routes";
import interviewerControl from "./routes/interviewer.routes";

// Configure environment variables
dotenv.config();

// Create an instance of Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
async function main(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_KEY || "");
    console.log("Connection Successful with Database 📊!");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}
main();

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json("Backend Home Route is Working ✅!");
});

app.use("/user", userControl);
app.use("/interviewer", interviewerControl);
app.use("/post", postControl);
app.use("/jobs", jobControl);
app.use("/company", companyControl);
app.use("/testimonial", testimonialControl);
app.use("/api", apiControl);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Connected to server ${PORT} 🚀!`);
});