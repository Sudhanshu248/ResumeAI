import User from "../models/userModel.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRETS = process.env.JWT_SECRETS;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Configuration for generation output
const generationConfig = {
  temperature: 0.7,      // Controls randomness (0 = deterministic, 1 = random)
  topP: 1,               // Nucleus sampling (probability mass to consider)
  topK: 1,               // Limits to top-K predictions
  maxOutputTokens: 80,  // Limits length of the generated response
};

// Controller function to handle AI
export const generateAISummary = async (req, res) => {
    try{
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No Token found' });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRETS);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { section, customPrompt } = req.body;

    let prompt = customPrompt;
    if (!prompt) return res.status(400).json({ message: "Prompt is not found" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

        // Clean up the raw response
    const cleanText = (text) => {
      return text
        .replace(/\*\*/g, "")        // Remove bold markers (**)
        .replace(/\*/g, "")          // Remove italic markers (*)
        .replace(/^[-•]\s?/gm, "")   // Remove bullet points or dashes
        .trim();                     // Trim whitespace
    };
    
    // Clean and extract final response text
    const responseText = cleanText(result.response.text());

    if(!responseText) {
      return res.status(400).json({ message: "AI failed to generate response" });
    }

    res.status(200).json({
      message: "AI content generated successfully",
      responseText,
    });

    }catch (error) {    
        return res.status(500).json({ message: error.message });
    }
}