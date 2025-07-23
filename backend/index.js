import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.route.js";
import resumeRoutes from "./routes/resume.route.js"
import dotenv from "dotenv";
import cors from "cors";


const app = express();
dotenv.config();
const dblink = process.env.DB_CONNECT;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// MongoDB connection setup
const connectDB = async () => {
    try {
        await mongoose.connect(dblink);
        console.log("SuccessFully Mongoose Connected !");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong!",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.use("/", resumeRoutes); //  Mount the router
app.use('/', userRoutes);  // This will handle /signup and /login directly

app.get('/', (req, res) => {
    res.send('Welcome to ResumeAI Backend!');
});

app.listen(3002, () => {
    console.log("Server is running on port 3002");
    connectDB();
});
