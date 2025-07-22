import axios from "axios"

// Define URLs for frontend & backend of the application
const BASE_URL = "http://localhost:3002";
const FRONTEND_URL = "http://localhost:5173";

// Create an Axios instance pre-configured with base settings
const clientServer = axios.create({
  baseURL: BASE_URL,  // Use the backend API base URL
  headers: {
    "Content-Type": "application/json",  // Default content type for requests
  },
});

// Export the Axios instance for use across the application
export default clientServer;