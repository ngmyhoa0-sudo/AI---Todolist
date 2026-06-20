import axios from "axios";

const API_URL = "http://localhost:8000";

export const login = (data) =>
  axios.post(`${API_URL}/auth/login`, data);

export const register = (data) =>
  axios.post(`${API_URL}/auth/register`, data);

export const forgotPassword = (email) =>
  axios.post(`${API_URL}/auth/forgot-password`, { email });
