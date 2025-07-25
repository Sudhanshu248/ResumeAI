import expess from 'express';
import { generateAISummary } from '../controllers/genAI.controller.js';

const router = expess.Router();

// Route to handle AI content generation
router.post('/generate-summary', generateAISummary);

export default router;