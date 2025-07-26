import express from 'express';
import { createResume, updateResume, allResumes, getResume, deleteResume } from '../controllers/resume.controller.js';

const router = express.Router();

// Route to create a new resume
router.post("/create-resume", createResume);
router.put("/update-resume/:id", updateResume); // Route to update a resume by ID
router.get("/all-resumes", allResumes);// Route to get all resumes for the authenticated user
router.get("/resume-by-id/:id", getResume);// Route to get a specific resume by ID
router.delete("/delete-resume/:id", deleteResume);// Route to delete a resume by ID

export default router;
