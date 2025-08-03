<<<<<<< HEAD
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
=======
import React from 'react'
import './Navbar.css'
import navlogo from '../Assets/nav-logo.svg'
import navprofileIcon from '../Assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} className='nav-logo' alt="" />
      <img src={navprofileIcon} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar
>>>>>>> 66ab953c41f4acab04279f47b36f42e420f40982
