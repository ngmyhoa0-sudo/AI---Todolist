// todoService chỉ làm 1 việc: gọi API task lên backend
const API_URL = "http://127.0.0.1:8000";

// Lấy token đã lưu sau khi đăng nhập
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
    throw new Error(data.detail || "Đã có lỗi xảy ra với task.");
  }
  return res.json();
}

const todoService = {
  // Lấy danh sách task
  getTodos: async () => {
    const res = await fetch(`${API_URL}/todos`, {
      method: "GET",
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  // Thêm task mới (cách thường)
  addTodo: async ({ title, deadline }) => {
    const res = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ title, deadline }),
    });
    return handleResponse(res);
  },

  // Cập nhật task (đổi trạng thái, sửa tên, sửa deadline...)
  updateTodo: async (id, updates) => {
    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify(updates),
    });
    return handleResponse(res);
  },

  // Xóa task
  deleteTodo: async (id) => {
    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.detail || "Không xóa được task.");
    }
    return true;
  },
};

export default todoService;