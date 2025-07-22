import User from "../models/userModel.js";
import Resume from "../models/resumeModel.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRETS = process.env.JWT_SECRETS;

// ✅ Token helper
const verifyToken = (authHeader) => {
  const token = authHeader?.split(" ")[1];
  if (!token) throw new Error("No token provided");
  return jwt.verify(token, JWT_SECRETS);
};

export const createResume = async (req, res) => {
  try {
    const decoded = verifyToken(req.headers.authorization);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const resume = new Resume({ userId: user._id, title });
    await resume.save();

    res.status(201).json({ message: 'Resume created', resume });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateResume = async (req, res) => {
  try {
    const decoded = verifyToken(req.headers.authorization);
    const { id } = req.params;
    const updates = req.body;

    console.log(updates);
    const updatedResume = await Resume.findOneAndUpdate(
      { _id: id, userId: decoded.id },
      { $set: updates },
      { new: true }
    );

    if (!updatedResume) return res.status(404).json({ message: "Resume not found" });

    res.status(200).json({ message: 'Resume updated', resume: updatedResume });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const allResumes = async (req, res) => {
  try {
    const decoded = verifyToken(req.headers.authorization);
    const resumes = await Resume.find({ userId: decoded.id });

    if (!resumes || resumes.length === 0) {
      return res.status(404).json({ message: "No resumes found" });
    }

    return res.status(200).json({
      message: "Resumes fetched successfully",
      resumes,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getResume = async (req, res) => {
  try {
    const decoded = verifyToken(req.headers.authorization);
    const { id } = req.params;

    const resume = await Resume.findOne({
      _id: id,
      userId: decoded.id
    });

    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    return res.status(200).json({
      message: "Resume fetched successfully",
      resume
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
