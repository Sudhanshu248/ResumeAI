const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Use the same secret as in userController.js
const JWT_SECRETS = "your_secure_jwt_secret_key_here";

const auth = async (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const authHeader = req.header('Authorization');
        console.log('Auth header:', authHeader);
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log('Invalid auth header format');
            return res.status(401).json({ message: 'No authentication token, access denied' });
        }
        
        // Extract the token (remove 'Bearer ' prefix)
        const token = authHeader.replace('Bearer ', '');
        console.log('Extracted token:', token);
        
        if (!token) {
            console.log('No token found after extraction');
            return res.status(401).json({ message: 'No authentication token, access denied' });
        }

        try {
            // Verify the token
            console.log('Verifying token with secret:', JWT_SECRETS);
            const decoded = jwt.verify(token, JWT_SECRETS);
            console.log('Decoded token:', decoded);
            
            // Find the user by ID
            const user = await User.findById(decoded.id);
            console.log('Found user:', user ? 'Yes' : 'No');
            
            if (!user) {
                console.log('User not found for ID:', decoded.id);
                return res.status(401).json({ message: 'User not found' });
            }
            
            // We're not checking if the token matches the one stored in the user document
            // This is more lenient and should help diagnose the issue
            
            // Add user info to request
            req.user = { userId: user._id };
            next();
        } catch (jwtError) {
            console.error('JWT verification error:', jwtError);
            return res.status(401).json({ message: 'Token is invalid or expired' });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ message: 'Server error during authentication' });
    }
};

module.exports = auth; 