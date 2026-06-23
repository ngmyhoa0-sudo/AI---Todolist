import api from "./api";

const API_URL = "http://localhost:8000";

export const login = (data) =>
api.post(`${API_URL}/auth/login`, data);

export const register = (data) =>
  api.post(`${API_URL}/auth/register`, data);

export const forgotPassword = (email) =>
 api.post(`${API_URL}/auth/forgot-password`, { email });
localStorage.setItem(
  "token",
  response.data.access_token
);
forgotPassword()

resetPassword()
