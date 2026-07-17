import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./admin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("adminUser", JSON.stringify(response.data.admin));
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error("Admin Login Error:", err);
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-body">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-logo">VIBE Interiors</div>
          <div className="admin-login-subtitle">Admin Portal</div>

          {error && (
            <div 
              style={{ 
                color: "#d9534f", 
                backgroundColor: "#fdf2f2", 
                padding: "12px", 
                borderRadius: "10px", 
                border: "1px solid #d9534f", 
                marginBottom: "20px",
                fontSize: "14px"
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. admin@vibeinteriors.com"
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit" 
              className="admin-btn" 
              disabled={loading}
              style={{ marginTop: "10px" }}
            >
              {loading ? "Logging in..." : "Login to Portal"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
