const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://resume-ai-wheat.vercel.app' 
  : 'http://localhost:3002';

export default API_URL;
