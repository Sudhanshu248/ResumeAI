// Import dependencies and user model
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

// Signup Functionality
export const signup = async (req, res) => {
    try {
        const { name, email, password, username } = req.body;

        // Validate required fields
        if (!name || !email || !password || !username) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user already exists
        const user = await User.findOne({ email }).maxTimeMS(5000);;

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            username
        });

        await newUser.save({ maxTimeMS: 10000 });

        // Generate JWT and assign to user
        const token = generateToken(newUser._id);
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

        // Check if user with email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Your email is not correct"
            });
        }

        // Compare entered password with hashed one
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Generate token and update user's token field
            const token = generateToken(user._id);
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

// Get authenticated user's username using JWT
export const getUsername = async (req, res) => {
    const authHeader = req.headers.authorization;

    // Ensure token is provided in Bearer format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRETS);

        // Retrieve only username field
        const user = await User.findById(decoded.id).select("username");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({ username: user.username });

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
