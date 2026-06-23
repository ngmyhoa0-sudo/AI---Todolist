import api from "./api";

export const askAI = (message) =>
  api.post("/ai/chat", { message });
