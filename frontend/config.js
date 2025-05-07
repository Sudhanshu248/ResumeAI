<<<<<<< HEAD
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://resume-ai-wheat.vercel.app' 
  : 'http://localhost:3002';

export default API_URL;
=======
import axios from "axios";

export const BASE_URL = "https://resumeai-itv1.onrender.com";

const clientServer = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

clientServer.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default clientServer;
>>>>>>> 63f2e6892f4b4da158d37345a395a91a54cff385
