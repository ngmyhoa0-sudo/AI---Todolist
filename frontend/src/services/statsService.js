import axios from "axios";

const API_URL = "http://localhost:8000";

export const getStats = () =>
  axios.get(`${API_URL}/stats`);