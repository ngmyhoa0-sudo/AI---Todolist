import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { ThemeContext } from "../context/ThemeContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dark = theme === "dark";

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const c = colors(dark);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (mode === "register" && form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        await authService.login({ email: form.email, password: form.password });
        navigate("/home");
      } else {
        await authService.register({ email: form.email, password: form.password });
        setSuccessMsg("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.");
      }
    } catch (err) {
      setError(err.message || "Đã có lỗi xảy ra. Thử lại nhé.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ ...s.page, backgroundColor: c.pageBg }}>
      <button type="button" onClick={toggleTheme} style={s.themeBtn}>
        {dark ? "☀️" : "🌙"}
      </button>

      <div style={{ ...s.card, backgroundColor: c.cardBg, boxShadow: c.shadow }}>
        <div style={s.header}>
          <span style={{ ...s.logo, backgroundColor: c.logoBg, color: c.logoText }}>✓</span>
          <h1 style={{ ...s.appName, color: c.text }}>AI Todolist</h1>
          <p style={{ ...s.tagline, color: c.textMuted }}>Quản lý công việc thông minh hơn</p>
        </div>

        <div style={{ ...s.tabRow, borderBottomColor: c.border }}>
          {["login", "register"].map((m) => (
            <button
              key={m}
              style={{
                ...s.tab,
                color: mode === m ? c.text : c.textMuted,
                borderBottomColor: mode === m ? c.text : "transparent",
              }}
              onClick={() => {
                setMode(m);
                setError("");
                setSuccessMsg("");
              }}
            >
              {m === "login" ? "Đăng nhập" : "Đăng ký"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={s.form}>
          <label style={{ ...s.label, color: c.textSub }}>Email</label>
          <input
            style={{ ...s.input, backgroundColor: c.inputBg, borderColor: c.border, color: c.text }}
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />

          <label style={{ ...s.label, color: c.textSub }}>Mật khẩu</label>
          <input
            style={{ ...s.input, backgroundColor: c.inputBg, borderColor: c.border, color: c.text }}
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />

          {mode === "register" && (
            <>
              <label style={{ ...s.label, color: c.textSub }}>Xác nhận mật khẩu</label>
              <input
                style={{ ...s.input, backgroundColor: c.inputBg, borderColor: c.border, color: c.text }}
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </>
          )}

          {mode === "login" && (
            <div style={s.forgotRow}>
              <button
                type="button"
                style={{ ...s.forgotBtn, color: c.textMuted }}
                onClick={() => navigate("/forgot-password")}
              >
                Quên mật khẩu?
              </button>
            </div>
          )}

          {error && <p style={s.error}>{error}</p>}
          {successMsg && <p style={s.success}>{successMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{ ...s.submitBtn, backgroundColor: c.btnBg, color: c.btnText }}
          >
            {loading ? "Đang xử lý..." : mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
          </button>
        </form>

        <div style={s.guestRow}>
          <span style={{ color: c.textDisabled }}>Không muốn đăng ký? </span>
          <button
            type="button"
            style={{ ...s.guestBtn, color: c.textSub }}
            onClick={() => navigate("/home?guest=true")}
          >
            Dùng thử với tư cách khách
          </button>
        </div>
      </div>
    </div>
  );
}

const colors = (dark) => ({
  pageBg: dark ? "#111111" : "#f7f7f5",
  cardBg: dark ? "#1e1e1e" : "#ffffff",
  text: dark ? "#f0f0f0" : "#111111",
  textSub: dark ? "#cccccc" : "#444444",
  textMuted: dark ? "#999999" : "#888888",
  textDisabled: dark ? "#555555" : "#aaaaaa",
  border: dark ? "#333333" : "#e0e0e0",
  inputBg: dark ? "#2a2a2a" : "#fafafa",
  logoBg: dark ? "#f0f0f0" : "#111111",
  logoText: dark ? "#111111" : "#ffffff",
  btnBg: dark ? "#f0f0f0" : "#111111",
  btnText: dark ? "#111111" : "#ffffff",
  shadow: dark ? "0 1px 6px rgba(0,0,0,0.5)" : "0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)",
});

const s = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter','Segoe UI',sans-serif",
    padding: "16px",
    position: "relative",
  },
  themeBtn: {
    position: "fixed",
    top: "16px",
    right: "16px",
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    padding: "4px",
  },
  card: {
    borderRadius: "12px",
    padding: "40px 36px",
    width: "100%",
    maxWidth: "400px",
  },
  header: { textAlign: "center", marginBottom: "28px" },
  logo: {
    display: "inline-block",
    fontSize: "28px",
    borderRadius: "8px",
    width: "44px",
    height: "44px",
    lineHeight: "44px",
    marginBottom: "12px",
  },
  appName: { fontSize: "20px", fontWeight: "700", margin: "0 0 4px 0", letterSpacing: "-0.3px" },
  tagline: { fontSize: "13px", margin: 0 },
  tabRow: { display: "flex", borderBottom: "1px solid", marginBottom: "24px" },
  tab: {
    flex: 1,
    background: "none",
    border: "none",
    padding: "10px 0",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "500",
    borderBottom: "2px solid",
    marginBottom: "-1px",
    transition: "color 0.15s",
  },
  form: { display: "flex", flexDirection: "column" },
  label: { fontSize: "13px", fontWeight: "500", marginBottom: "6px", marginTop: "14px" },
  input: {
    padding: "10px 12px",
    border: "1px solid",
    borderRadius: "7px",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.15s",
  },
  forgotRow: { textAlign: "right", marginTop: "8px" },
  forgotBtn: {
    background: "none",
    border: "none",
    fontSize: "13px",
    cursor: "pointer",
    padding: 0,
    textDecoration: "underline",
  },
  error: {
    fontSize: "13px",
    color: "#d0453a",
    marginTop: "12px",
    padding: "10px 12px",
    backgroundColor: "#fff5f5",
    borderRadius: "6px",
    border: "1px solid #fcc",
  },
  success: {
    fontSize: "13px",
    color: "#2d7a4f",
    marginTop: "12px",
    padding: "10px 12px",
    backgroundColor: "#f0faf4",
    borderRadius: "6px",
    border: "1px solid #b2dfcc",
  },
  submitBtn: {
    marginTop: "20px",
    padding: "11px",
    border: "none",
    borderRadius: "7px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  guestRow: { textAlign: "center", marginTop: "20px", fontSize: "13px" },
  guestBtn: {
    background: "none",
    border: "none",
    fontSize: "13px",
    cursor: "pointer",
    padding: 0,
    textDecoration: "underline",
  },
};
