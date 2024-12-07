"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// Importing route handlers
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const jobs_routes_1 = __importDefault(require("./routes/jobs.routes"));
const company_routes_1 = __importDefault(require("./routes/company.routes"));
const api_routes_1 = __importDefault(require("./routes/api.routes"));
const testimonials_routes_1 = __importDefault(require("./routes/testimonials.routes"));
const interviewer_routes_1 = __importDefault(require("./routes/interviewer.routes"));
// Configure environment variables
dotenv_1.default.config();
// Create an instance of Express
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Database connection
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.MONGO_KEY || "");
            console.log("Connection Successful with Database 📊!");
        }
        catch (err) {
            console.error("Database connection error:", err);
        }
    });
}
main();
// Routes
app.get("/", (req, res) => {
    res.json("Backend Home Route is Working ✅!");
});
app.use("/user", user_routes_1.default);
app.use("/interviewer", interviewer_routes_1.default);
app.use("/post", post_routes_1.default);
app.use("/jobs", jobs_routes_1.default);
app.use("/company", company_routes_1.default);
app.use("/testimonial", testimonials_routes_1.default);
app.use("/api", api_routes_1.default);
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Connected to server ${PORT} 🚀!`);
});
