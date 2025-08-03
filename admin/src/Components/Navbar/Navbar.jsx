import React from "react";
import "./Navbar.css";
import navlogo from "../Assets/nav-logo.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("admin-token");

  const handleAuthAction = () => {
    if (adminToken) {
      localStorage.removeItem("admin-token");
      navigate("/admin/login", { replace: true }); // ✅ Redirect after logout
      window.location.reload(); // ✅ Force refresh UI
    } else {
      navigate("/admin/login");
    }
  };

  return (
    <div className="navbar">
      <img
        src={navlogo}
        className="nav-logo"
        alt="Logo"
        onClick={() => navigate("/admin")}
        style={{ cursor: "pointer" }}
      />

      <button
        className="auth-btn"
        onClick={handleAuthAction}
      >
        {adminToken ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Navbar;
