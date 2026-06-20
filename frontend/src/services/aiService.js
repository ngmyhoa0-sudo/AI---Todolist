import axios from "axios";

const API_URL = "http://localhost:8000";

export const askAI = (message) =>
	axios.post(`${API_URL}/ai/chat`, {
		message,
	});
