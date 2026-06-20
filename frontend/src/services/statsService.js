// statsService chỉ làm 1 việc: gọi API thống kê lên backend
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
    throw new Error(data.detail || "Đã có lỗi xảy ra khi tải thống kê.");
  }
  return res.json();
}

const statsService = {
  // Lấy số liệu tổng quan: tổng task, hoàn thành, quá hạn...
  getOverview: async () => {
    const res = await fetch(`${API_URL}/stats/overview`, {
      method: "GET",
      headers: authHeaders(),
    });
    return handleResponse(res);
  },
};

export default statsService;