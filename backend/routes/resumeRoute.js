import express from 'express';
import { createResume, allResumes, getResume } from '../controllers/resumeController.js';

const router = express.Router();

// Apply auth middleware to all resume routes
router.route("/create-resume").post(createResume);
router.route("/all-resumes").get(allResumes);
router.route("/resume-by-id/:id").get(getResume);

export default router;
