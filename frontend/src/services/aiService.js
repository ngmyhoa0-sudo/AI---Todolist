// aiService chỉ làm 1 việc: gọi API AI lên backend
const API_URL = "http://127.0.0.1:8000";

function getToken() {
  return localStorage.getItem("token");
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

async function handleResponse(res) {
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Đã có lỗi xảy ra với AI.");
  }
  return res.json();
}

const aiService = {
  // Gửi câu ngôn ngữ tự nhiên, AI phân tích rồi tự tạo task
  parseAndAddTodo: async ({ text }) => {
    const res = await fetch(`${API_URL}/ai/parse-task`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ text }),
    });
    return handleResponse(res);
  },

  // Gửi tin nhắn cho chatbot AI
  sendChatMessage: async ({ message }) => {
    const res = await fetch(`${API_URL}/ai/chat`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ message }),
    });
    return handleResponse(res);
  },
};

export default aiService;