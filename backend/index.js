const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3002',
    credentials: true,
}));

app.use(express.json());

app.use('/', userRoutes);  // This will handle /signup and /login directly

const start = async () => {
    try {
    const connectDB =    await mongoose.connect("mongodb+srv://sainisudhanshu389:pae3A04OxUkxC19s@resumeaicluster.vebonud.mongodb.net/resumeai?retryWrites=true&w=majority&appName=ResumeAICluster", {
            ssl: true,
            tls: true,
            tlsAllowInvalidCertificates: true
        });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

app.get("/home", (req, res) => {
    res.send("Home Page");
});

app.listen(3002, () => {
    console.log("Server is running on port 3002");
    start();
});
