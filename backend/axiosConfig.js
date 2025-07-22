import axios from 'axios';

export const BASE_URL = "http://localhost:3002";
export const Dashboard_URL = "http://localhost:5173";

export const clientServer = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});