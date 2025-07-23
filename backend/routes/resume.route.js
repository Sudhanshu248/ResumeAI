import express from 'express';
import {  createResume,  updateResume , allResumes} from '../controllers/resume.controller.js';

const router = express.Router();

router.post("/create-resume", createResume);
router.put("/update-resume/:id", updateResume); //  corrected
router.get("/all-resumes", allResumes);

export default router;
