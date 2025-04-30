const express = require('express');
const router = express.Router();
const { createResume, allResumes, getResume } = require('../controllers/resumeController');



// Apply auth middleware to all resume routes
router.route("/create-resume").post(createResume);
router.route("/all-resumes").get(allResumes);
router.route("/resume-by-id/:id").get(getResume);

module.exports = router;
