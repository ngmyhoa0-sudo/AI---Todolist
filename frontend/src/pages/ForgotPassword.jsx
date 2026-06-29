import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { ThemeContext } from "../context/ThemeContext";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const dark = theme === "dark";

  const [step, setStep] = useState("email");
  const [email, setEmail]               = useState("");
  const [otp, setOtp]                   = useState("");
  const [newPassword, setNewPassword]   = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const c = colors(dark);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSuccessMsg("Mã OTP đã được gửi đến email của bạn.");
      setStep("otp");
    } catch (err) {
      setError(err.message || "Không thể gửi email. Thử lại nhé.");
    } finally { setLoading(false); }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) { setError("Mật khẩu xác nhận không khớp."); return; }
    setLoading(true);
    try {
      // Sửa FE-6: đổi newPassword → new_password đúng với backend schema
      await authService.resetPassword({ email, otp, new_password: newPassword });
      setSuccessMsg("Đặt lại mật khẩu thành công! Đang chuyển về trang đăng nhập...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.message || "Mã OTP không đúng hoặc đã hết hạn. Thử lại nhé.");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ ...s.page, backgroundColor: c.pageBg }}>
      <div style={{ ...s.card, backgroundColor: c.cardBg, boxShadow: c.shadow }}>

        <div style={s.header}>
          <span style={{ ...s.logo, backgroundColor: c.logoBg, color: c.logoText }}>✓</span>
          <h1 style={{ ...s.appName, color: c.text }}>AI Todolist</h1>
          <p style={{ ...s.tagline, color: c.textMuted }}>
            {step === "email" ? "Nhập email để nhận mã OTP" : "Nhập mã OTP và mật khẩu mới"}
          </p>
        </div>

        <div style={s.stepRow}>
          {[1, 2].map((n) => {
            const active = n === 1 || step === "otp";
            return (
              <div key={n} style={s.stepItem}>
                <div style={{ ...s.stepCircle, backgroundColor: active ? c.btnBg : c.borderMuted, color: active ? c.btnText : c.textMuted }}>
                  {n}
                </div>
                <span style={{ ...s.stepLabel, color: active ? c.text : c.textMuted, fontWeight: active ? "600" : "400" }}>
                  {n === 1 ? "Nhập email" : "Đặt lại mật khẩu"}
                  </span>
              </div>
            );
          })}
        </div>

        {step === "email" && (
          <form onSubmit={handleSendEmail} style={s.form}>
            <label style={{ ...s.label, color: c.textSub }}>Email</label>
            <input style={{ ...s.input, backgroundColor: c.inputBg, borderColor: c.border, color: c.text }}
              type="email" placeholder="you@example.com" value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              required autoComplete="email" />
            {error && <p style={s.error}>{error}</p>}
            <button type="submit" disabled={loading}
              style={{ ...s.submitBtn, backgroundColor: c.btnBg, color: c.btnText }}>
              {loading ? "Đang gửi..." : "Gửi mã OTP"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleResetPassword} style={s.form}>
            {successMsg && <p style={s.success}>{successMsg}</p>}

            <label style={{ ...s.label, color: c.textSub }}>Mã OTP</label>
            <input style={{ ...s.input, backgroundColor: c.inputBg, borderColor: c.border, color: c.text }}
              type="text" placeholder="Nhập mã OTP từ email" value={otp}
              onChange={(e) => { setOtp(e.target.value); setError(""); }}
              required autoComplete="one-time-code" />

            <label style={{ ...s.label, color: c.textSub }}>Mật khẩu mới</label>
            <input style={{ ...s.input, backgroundColor: c.inputBg, borderColor: c.border, color: c.text }}
              type="password" placeholder="••••••••" value={newPassword}
              onChange={(e) => { setNewPassword(e.target.value); setError(""); }}
              required autoComplete="new-password" />

            <label style={{ ...s.label, color: c.textSub }}>Xác nhận mật khẩu mới</label>
            <input style={{ ...s.input, backgroundColor: c.inputBg, borderColor: c.border, color: c.text }}
              type="password" placeholder="••••••••" value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
              required autoComplete="new-password" />

            {error && <p style={s.error}>{error}</p>}

            <button type="submit" disabled={loading}
              style={{ ...s.submitBtn, backgroundColor: c.btnBg, color: c.btnText }}>
              {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
            </button>

            <div style={s.resendRow}>
              <span style={{ color: c.textDisabled }}>Không nhận được mã? </span>
              <button type="button" style={{ ...s.resendBtn, color: c.textSub }}
                onClick={() => { setStep("email"); setError(""); setSuccessMsg(""); }}>
                Gửi lại
              </button>
            </div>
          </form>
        )}

        <div style={s.backRow}>
        <button type="button" style={{ ...s.backBtn, color: c.textMuted }} onClick={() => navigate("/")}>
            ← Quay lại đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}

const colors = (dark) => ({
  pageBg:      dark ? "#111111" : "#f7f7f5",
  cardBg:      dark ? "#1e1e1e" : "#ffffff",
  text:        dark ? "#f0f0f0" : "#111111",
  textSub:     dark ? "#cccccc" : "#444444",
  textMuted:   dark ? "#999999" : "#888888",
  textDisabled:dark ? "#555555" : "#aaaaaa",
  border:      dark ? "#333333" : "#e0e0e0",
  borderMuted: dark ? "#2a2a2a" : "#eeeeee",
  inputBg:     dark ? "#2a2a2a" : "#fafafa",
  logoBg:      dark ? "#f0f0f0" : "#111111",
  logoText:    dark ? "#111111" : "#ffffff",
  btnBg:       dark ? "#f0f0f0" : "#111111",
  btnText:     dark ? "#111111" : "#ffffff",
  shadow:      dark ? "0 1px 6px rgba(0,0,0,0.5)" : "0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)",
});

const s = {
  page:      { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter','Segoe UI',sans-serif", padding: "16px" },
  card:      { borderRadius: "12px", padding: "40px 36px", width: "100%", maxWidth: "400px" },
  header:    { textAlign: "center", marginBottom: "28px" },
  logo:      { display: "inline-block", fontSize: "28px", borderRadius: "8px", width: "44px", height: "44px", lineHeight: "44px", marginBottom: "12px" },
  appName:   { fontSize: "20px", fontWeight: "700", margin: "0 0 4px 0", letterSpacing: "-0.3px" },
  tagline:   { fontSize: "13px", margin: 0 },
  stepRow:   { display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "40px", marginBottom: "28px" },
  stepItem:  { display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" },
  stepCircle:{ width: "28px", height: "28px", borderRadius: "50%", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center" },
  stepLabel: { fontSize: "12px" },
  form:      { display: "flex", flexDirection: "column" },
  label:     { fontSize: "13px", fontWeight: "500", marginBottom: "6px", marginTop: "14px" },
  input:     { padding: "10px 12px", border: "1px solid", borderRadius: "7px", fontSize: "14px", outline: "none" },
  error:     { fontSize: "13px", color: "#d0453a", marginTop: "12px", padding: "10px 12px", backgroundColor: "#fff5f5", borderRadius: "6px", border: "1px solid #fcc" },
  success:   { fontSize: "13px", color: "#2d7a4f", padding: "10px 12px", backgroundColor: "#f0faf4", borderRadius: "6px", border: "1px solid #b2dfcc" },
  submitBtn: { marginTop: "20px", padding: "11px", border: "none", borderRadius: "7px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
  resendRow: { textAlign: "center", marginTop: "16px", fontSize: "13px" },
  resendBtn: { background: "none", border: "none", fontSize: "13px", cursor: "pointer", padding: 0, textDecoration: "underline" },
  backRow:   { textAlign: "center", marginTop: "20px" },
  backBtn:   { background: "none", border: "none", fontSize: "13px", cursor: "pointer", padding: 0 },
};