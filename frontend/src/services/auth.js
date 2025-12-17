import api from "./api";

export const loginRequest = data =>
  api.post("/auth/login", data);

export const registerRequest = data =>
  api.post("/auth/register", data);