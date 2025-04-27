const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes.js");
require('dotenv').config();

const dblink = process.env.DB_CONNECT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3002',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/users', userRoutes);

const start = async () => {
    const connectDB = await mongoose.connect(dblink);

    app.get("/home", (req, res) => {
        res.send("Home Page");
    });

    app.listen(3002, () => {
        console.log("server is running on port 3002");
    });
}

start();
