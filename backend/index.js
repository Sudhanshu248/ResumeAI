const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes.js");
const dotenv = require("dotenv");

dotenv.config();
const dblink = process.env.DB_CONNECT;

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
    const connectDB = await mongoose.connect(dblink, {
            ssl: true,
            tls: true,
            tlsAllowInvalidCertificates: true
    });
    console.log("Connected to MongoDB successfully");
}

app.get("/home", (req, res) => {
    res.send("Home Page");
});

app.listen(3002, () => {
    console.log("Server is running on port 3002");
    start();
});
