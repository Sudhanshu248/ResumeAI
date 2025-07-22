import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();
const JWT_SECRETS = process.env.JWT_SECRETS;

// Helper function to generate a consistent token
const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, JWT_SECRETS, { expiresIn: '24h' });
    return token;
};

// Signin Functionality
export const signup = async (req, res) => {

    try {

        const { name, email, password, username } = req.body;

        if (!name || !email || !password || !username) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists with a timeout
        const user = await User.findOne({ email }).maxTimeMS(5000);;

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            username
        });

        // Save the user first to get the _id
        await newUser.save({ maxTimeMS: 10000 });

        // Generate token with consistent structure
        const token = generateToken(newUser._id);

        // Update user's token in database
        newUser.token = token;

        await newUser.save({ maxTimeMS: 10000 });

        return res.status(201).json({
            message: "User Created Successfully",
            token
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Login Functionality
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Your email is not correct"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Generate token with consistent structure
            const token = generateToken(user._id);
            // Update user's token in database
            user.token = token;
            await user.save();

            return res.json({
                message: "Login successful",
                token
            });

        } else {
            return res.status(401).json({
                message: "Incorrect Password"
            });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
