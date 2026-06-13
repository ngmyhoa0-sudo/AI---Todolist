import { useState, useEffect } from "react";

const API_URL = "http://127.0.0.1:8000";
const USER_ID = "user1";

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const res = await fetch(`${API_URL}/todos/${USER_ID}`);
        const data = await res.json();
        setTodos(data);
    };

    const addTodo = async () => {
        if (!newTodo.trim()) return;
        await fetch(`${API_URL}/todos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTodo, user_id: USER_ID }),
        });
        setNewTodo("");
        fetchTodos();
    };

    const toggleTodo = async (id, is_completed) => {
        await fetch(`${API_URL}/todos/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ is_completed: !is_completed }),
        });
        fetchTodos();
    };

    const deleteTodo = async (id) => {
        await fetch(`${API_URL}/todos/${id}`, { method: "DELETE" });
        fetchTodos();
    };

    return (
        <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial" }}>
            <h1>AI Todolist</h1>

            <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                <input
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTodo()}
                    placeholder="Thêm todo mới..."
                    style={{ flex: 1, padding: "8px", fontSize: "16px" }}
                />
                <button onClick={addTodo} style={{ padding: "8px 16px" }}>
                    Thêm
                </button>
            </div>

            <ul style={{ listStyle: "none", padding: 0 }}>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "10px",
                            marginBottom: "8px",
                            background: "#f5f5f5",
                            borderRadius: "8px",
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={todo.is_completed}
                            onChange={() => toggleTodo(todo.id, todo.is_completed)}
                        />
                        <span style={{ flex: 1, textDecoration: todo.is_completed ? "line-through" : "none" }}>
                            {todo.title}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)} style={{ color: "red" }}>
                            Xóa
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;