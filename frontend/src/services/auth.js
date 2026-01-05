import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/auth`;

export const loginRequest = (data) =>
  axios.post(`${API}/login`, data);

export const registerRequest = (data) =>
  axios.post(`${API}/register`, data);