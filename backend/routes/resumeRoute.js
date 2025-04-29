const express = require('express');
const router = express.Router();
const { createResume, allResumes, getResume } = require('../controllers/resumeController');
const auth = require('../middleware/auth');

// Test endpoint to verify token
router.get('/test-auth', auth, (req, res) => {
    res.json({ message: 'Token is valid', userId: req.user.userId });
});

// Apply auth middleware to all resume routes
router.post('/create-resume', auth, createResume);
router.get('/all-resumes', auth, allResumes);
router.get('/resume-by-id/:id', auth, getResume);

module.exports = router;
