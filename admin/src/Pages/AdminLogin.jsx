import React, { useState } from "react";
import { backend_url } from "../App";
import "./CSS/LoginSignup.css";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ setAdminToken }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      const res = await fetch(`${backend_url}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Login Response:", data);

      if (res.ok && data.success) {
        const token = data.token;
        const decoded = JSON.parse(atob(token.split(".")[1]));

        if (decoded.user.isAdmin) {
          localStorage.setItem("admin-token", token);
          setAdminToken(token);
          navigate("/admin", { replace: true }); // ✅ Redirect to admin panel
        } else {
          setError("Access denied. You are not an admin.");
        }
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Admin Login</h1>
        <div className="loginsignup-fields">
          <input
            type="email"
            placeholder="Admin Email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>

        <button onClick={handleLogin}>Login</button>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
