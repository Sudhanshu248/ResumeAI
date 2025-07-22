import User from "../models/userModel.js";
import Resume from "../models/resumeModel.js";

export const createResume = async (req, res) => {
    try {
        const { token } = req.body;
        const user = await User.findOne({ token: token });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user || !user._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { title, personalInfo, experience, education, skills, themeColor } = req.body;
        const userId = user._id;

        const resume = new Resume({
            userId,
            title,
            personalInfo,
            experience,
            education,
            skills,
            themeColor
        });

        await resume.save();

        res.status(201).json({
            message: 'Resume created successfully',
            resume
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error creating resume',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const allResumes = async (req, res) => {

    const { token } = req.body;

    try {

        const user = await User.findOne({ token: token });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userId = user._id;
        const resumes = await Resume.find({ userId });

        if (!resumes || resumes.length === 0) {
            return res.status(404).json({ message: "No resumes found" });
        }

        return res.status(200).json({ message: "Resumes fetched successfully", resumes });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getResume = async (req, res) => {

    const { token } = req.body;

    try {

        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { id } = req.params;
        const userId = user._id;

        const resume = await Resume.findOne({ _id: id, userId });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.json(resume);

    } catch (error) {
        res.status(500).json({ message: 'Error getting resume' });
    }
};
