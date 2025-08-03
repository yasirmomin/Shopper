import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import AddProduct from "../Components/AddProduct/AddProduct";
import ListProduct from "../Components/ListProduct/ListProduct";
import AdminLogin from "./AdminLogin";
import { Route, Routes, useNavigate } from "react-router-dom";

const Admin = () => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem("admin-token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminToken) navigate("/admin/login");
  }, [adminToken, navigate]);

  if (!adminToken) {
    return <AdminLogin setAdminToken={setAdminToken} />;
  }

  return (
    <div className="admin" style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<h2>Welcome Admin!</h2>} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="listproduct" element={<ListProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
