import User from "../models/userModel.js";
import Resume from "../models/resumeModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRETS = process.env.JWT_SECRETS;

export const updateResume = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No Token found' });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRETS);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { id } = req.params;
    const updates = req.body;
    
    console.log("Update request body:", updates);
    
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
    
export const createResume = async (req, res) => {
        try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ message: 'No Token found' });

      const token = authHeader.split(" ")[1]; // ✅ extract token only
      const decoded = jwt.verify(token, JWT_SECRETS); // ✅ decode JWT
      const user = await User.findById(decoded.id); // ✅ find by ID

      if (!user) return res.status(404).json({ message: 'User not found' });

    
            if (!user) return res.status(404).json({message: 'User not found'});
    
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

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
    
export const allResumes = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRETS);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const resumes = await Resume.find({ userId: user._id }).sort({ createdAt: -1 }); // newest first (optional)

    return res.status(200).json({
      message: "Resumes fetched successfully",
      resumes,
    });

  } catch (error) {
    console.error("allResumes error:", error);
    return res.status(500).json({ message: "Server error: " + error.message });
 }
};
   

export const deleteResume = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRETS);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { id } = req.params;

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
