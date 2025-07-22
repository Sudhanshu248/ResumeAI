import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "2";
console.log("API Key loaded:", apiKey ? "Yes" : "No"); 
  
if (!apiKey) {
    throw new Error("VITE_GEMINI_API environment variable is not set");
}
  
const genAI = new GoogleGenerativeAI(apiKey);
  
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});
  
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};
  
export const AIChatSession = model.startChat({
    generationConfig,
    history: [],
});
  
  
