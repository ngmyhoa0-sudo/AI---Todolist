import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TodoList from "../components/TodoList";
import AddTaskForm from "../components/AddTaskForm";
import FilterBar from "../components/FilterBar";
import Notification from "../components/Notification";
import todoService from "../services/todoService";
import aiService from "../services/aiService";

// HomePage chỉ làm 1 việc: ghép các component con thành trang chính, quản lý state task
export default function HomePage() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Chế độ khách: không có tài khoản, vào thẳng từ LoginPage
  const isGuest = new URLSearchParams(window.location.search).get("guest") === "true";

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await todoService.getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message || "Không tải được danh sách task.");
    } finally {
      setLoading(false);
    }
  };

  // Thêm task theo cách thường
  const handleAdd = async (title) => {
    await todoService.addTodo({ title });
    await loadTodos();
  };

  // Thêm task bằng ngôn ngữ tự nhiên (qua AI)
  const handleAddNatural = async (text) => {
    await aiService.parseAndAddTodo({ text });
    await loadTodos();
  };

  const handleToggle = async (id, isCompleted) => {
    await todoService.updateTodo(id, { is_completed: !isCompleted });
    await loadTodos();
  };

  const handleDelete = async (id) => {
    await todoService.deleteTodo(id);
    await loadTodos();
  };

  const handleLogout = () => {
    navigate("/");
  };

  // Lọc task theo bộ lọc đang chọn — không gọi API lại, chỉ lọc trên dữ liệu đã có
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.is_completed);
      case "done":
        return todos.filter((t) => t.is_completed);
      case "deadline":
        return [...todos]
          .filter((t) => t.deadline)
          .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>AI Todolist</h1>
            {isGuest && <span style={styles.guestBadge}>Chế độ khách</span>}
          </div>
          <button type="button" style={styles.logoutBtn} onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>

        {/* Thông báo deadline */}
        {!loading && !error && <Notification todos={todos} />}

        {/* Form thêm task */}
        <AddTaskForm onAdd={handleAdd} onAddNatural={handleAddNatural} />

        {/* Thanh lọc */}
        <FilterBar current={filter} onChange={setFilter} />

        {/* Danh sách task */}
        {loading && <p style={styles.loading}>Đang tải...</p>}
        {error && <p style={styles.error}>{error}</p>}
        {!loading && !error && (
          <TodoList
            todos={filteredTodos}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        )}

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f7f7f5",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    padding: "32px 16px",
  },
  container: {
    maxWidth: "640px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#111",
    margin: 0,
    letterSpacing: "-0.3px",
  },
  guestBadge: {
    display: "inline-block",
    marginTop: "4px",
    fontSize: "12px",
    color: "#888",
    backgroundColor: "#eee",
    padding: "2px 8px",
    borderRadius: "10px",
  },
  logoutBtn: {
    background: "none",
    border: "1px solid #ddd",
    borderRadius: "7px",
    padding: "8px 14px",
    fontSize: "13px",
    color: "#555",
    cursor: "pointer",
  },
  loading: {
    textAlign: "center",
    color: "#999",
    fontSize: "14px",
    padding: "20px 0",
  },
  error: {
    fontSize: "13px",
    color: "#d0453a",
    padding: "10px 12px",
    backgroundColor: "#fff5f5",
    borderRadius: "6px",
    border: "1px solid #fcc",
  },
};