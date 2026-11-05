import { usePageMeta } from "../usePageMeta";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/api";

const initialState = {
  username: "",
  password: ""
};

export default function AdminLoginPage() {
  usePageMeta({
    title: "Admin | Trinexora",
    path: "/admin/login",
    noindex: true
  });
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "loading", message: "Signing in..." });

    try {
      const response = await adminLogin(form);
      localStorage.setItem("adminToken", response.token);
      localStorage.setItem("adminUsername", response.username);
      setStatus({ type: "success", message: response.message });
      navigate("/admin/dashboard");
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Login failed." });
    }
  }

  return (
    <section className="admin-shell">
      <div className="admin-card">
        <div className="section-header">
          <span className="eyebrow">Admin Access</span>
          <h1>Log in to review website leads</h1>
          <p>
            This dashboard shows everyone who submitted the Contact and Get Started
            forms.
          </p>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <label>
            Username
            <input name="username" value={form.username} onChange={handleChange} required />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          <button className="button button-primary" type="submit">
            Login
          </button>
          {status.message ? (
            <p role={status.type === "error" ? "alert" : "status"} aria-live="polite" className={`form-status ${status.type}`}>{status.message}</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
