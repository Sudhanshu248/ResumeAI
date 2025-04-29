const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../models/userModel.js");

dotenv.config();
// Use a hardcoded secret for testing
const JWT_SECRETS = "your_secure_jwt_secret_key_here";

// Helper function to generate a consistent token
const generateToken = (userId) => {
    console.log('Generating token for user ID:', userId);
    const token = jwt.sign({ id: userId }, JWT_SECRETS, { expiresIn: '24h' });
    console.log('Generated token:', token);
    return token;
};

// Signin Functionality
const signin = async (req, res) => {
    try {
        const {name, email, password, username} = req.body;

        if(!name || !email || !password || !username) {
            return res.status(400).json({message: "All fields are required"});
        }

        // Check if user exists with a timeout
        const user = await User.findOne({ email }).maxTimeMS(10000);

        if(user) {
            return res.status(400).json({message: "User already exists"});
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
        console.log('New user saved with ID:', newUser._id);
        
        // Generate token with consistent structure
        const token = generateToken(newUser._id);
        
        // Update user's token in database
        newUser.token = token;
        await newUser.save({ maxTimeMS: 10000 });
        console.log('User token updated in database');

        return res.status(201).json({
            message: "User Created Successfully",
            token
        });

    }catch(error){
        console.error("Signin error:", error);
        return res.status(500).json({message: error.message});
    }
}

// Login Functionality
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({
                message: "Your email is not correct"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(passwordMatch){
            console.log('Password match for user:', user._id);
            
            // Generate token with consistent structure
            const token = generateToken(user._id);
            
            // Update user's token in database
            user.token = token;
            await user.save();
            console.log('User token updated in database');
            
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
        console.error("Login error:", error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { signin, login };
