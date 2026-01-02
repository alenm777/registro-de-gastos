import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginRequest = (data) =>
  axios.post(`${API_URL}/login`, data);

export const registerRequest = (data) =>
  axios.post(`${API_URL}/register`, data);