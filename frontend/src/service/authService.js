import api from "./api";

const login = async (credentials) => {
  const response = await api.post("/login", credentials);
  if (response.data?.access_token) {
    localStorage.setItem("token", response.data.access_token);
  }
  return response;
};

const register = async (userData) => api.post("/register", userData);

const forgotPassword = async (email) => api.post("/forgot-password", { email });

const resetPassword = async (data) => api.post("/reset-password", data);

const logout = () => {
  localStorage.removeItem("token");
};

export default {
  login,
  register,
  forgotPassword,
  resetPassword,
  logout,
};
