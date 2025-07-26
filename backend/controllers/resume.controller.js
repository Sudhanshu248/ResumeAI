// Import required modules and models
import User from "../models/userModel.js";
import Resume from "../models/resumeModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// Load environment variables
dotenv.config();

const JWT_SECRETS = process.env.JWT_SECRETS;

// Update an existing resume for the authenticated user
export const updateResume = async (req, res) => {
  try {
    // Check for authorization token
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No Token found' });

    // Verify token and decode user ID
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRETS);

    // Find user from decoded token
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { id } = req.params;
    const updates = req.body;

    // Update the resume that belongs to the user
    const updatedResume = await Resume.findOneAndUpdate(
      { _id: id, userId: user._id },
      { $set: updates },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ message: 'Resume updated', resume: updatedResume });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Create a new resume for the authenticated user
export const createResume = async (req, res) => {
  try {
    // Verify authorization token
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No Token found' });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRETS);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    // Create new resume with user ID
    const resume = new Resume({ userId: user._id, title });
    await resume.save();

    res.status(201).json({
      message: 'Resume created successfully',
      resume
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Fetch all resumes for the authenticated user
export const allResumes = async (req, res) => {
  try {
    // Verify authorization token
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRETS);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Get all resumes created by the user
    const resumes = await Resume.find({ userId: user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Resumes fetched successfully",
      resumes,
    });

  } catch (error) {
    console.error("allResumes error:", error);
    return res.status(500).json({ message: "Server error: " + error.message });
 }
};

// Fetch a single resume by ID for the authenticated user
export const getResume = async (req, res) => {
  try {
    // Verify token
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No Token found' });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRETS);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find resume by ID and user ID
    const resume = await Resume.findOne({ _id: req.params.id, userId: user._id });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    return res.status(200).json({ message: "Resumes fetched successfully", resume });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a resume by ID for the authenticated user
export const deleteResume = async (req, res) => {
  try {
    // Validate token
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRETS);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { id } = req.params;

    // Delete resume that belongs to the user
    const deletedResume = await Resume.findOneAndDelete({ _id: id, userId: user._id });

    if (!deletedResume) {
      return res.status(404).json({ message: "Resume not found or unauthorized" });
    }

    return res.status(200).json({ message: "Resume deleted successfully" });

  } catch (error) {
    console.error("deleteResume error:", error);
    return res.status(500).json({ message: "Server error: " + error.message });
  }
};
