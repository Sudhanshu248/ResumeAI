const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoute.js");
const resumeRoutes = require("./routes/resumeRoute.js");
const dotenv = require("dotenv");


dotenv.config();
const dblink = process.env.DB_CONNECT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3002'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/', userRoutes);  // This will handle /signup and /login directly
app.use('/api', resumeRoutes);  // Changed from '/api/resumes' to '/api' to make routes more accessible

const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://sainisudhanshu389:pae3A04OxUkxC19s@resumeaicluster.vebonud.mongodb.net/resumeai?retryWrites=true&w=majority&appName=ResumeAICluster", {
            ssl: true,
            tls: true,
            tlsAllowInvalidCertificates: true,
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
            socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
            connectTimeoutMS: 30000, // Increase connection timeout to 30 seconds
            maxPoolSize: 10, // Limit the number of connections in the pool
            minPoolSize: 2, // Maintain at least 2 connections in the pool
            maxIdleTimeMS: 30000, // Close idle connections after 30 seconds
            retryWrites: true,
            retryReads: true
        });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong!",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.get("/home", (req, res) => {
    res.send("Home Page");
});

app.listen(3002, () => {
    console.log("Server is running on port 3002");
    start();
});
