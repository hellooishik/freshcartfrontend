import axios from "axios";

const API_URL = "https://buildfreshcart-3.onrender.com"; // Replace with your backend URL

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});
 