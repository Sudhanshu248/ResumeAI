import express from 'express';
import {  createResume,  allResumes,  getResume,  updateResume} from '../controllers/resume.controller.js';

const router = express.Router();

router.post("/create-resume", createResume);
router.put("/update-resume/:id", updateResume); // ✅ corrected
router.get("/all-resumes", allResumes);
router.get("/resume-by-id/:id", getResume);

export default router;
