import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    try {
      menuRef.current.classList.toggle("nav-menu-visible");
      e.target.classList.toggle("open");
    } catch (error) {
      console.error("Dropdown toggle error:", error);
    }
  };

  const { setToken } = useContext(ShopContext);

  const handleLogout = () => {
    try {
      localStorage.removeItem("auth-token");
      setToken(null); 
      window.location.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  

  return (
    <div className="nav">
      <Link
        to="/"
        onClick={() => setMenu("shop")}
        style={{ textDecoration: "none" }}
        className="nav-logo"
      >
        <img src={logo} alt="logo" />
        <p>SHOPPER</p>
      </Link>

      <img
        onClick={dropdown_toggle}
        className="nav-dropdown"
        src={nav_dropdown}
        alt=""
      />

      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link to="/" style={{ textDecoration: "none" }}>
            Shop
          </Link>
          {menu === "shop" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("mens")}>
          <Link to="/mens" style={{ textDecoration: "none" }}>
            Men
          </Link>
          {menu === "mens" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("womens")}>
          <Link to="/womens" style={{ textDecoration: "none" }}>
            Women
          </Link>
          {menu === "womens" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link to="/kids" style={{ textDecoration: "none" }}>
            Kids
          </Link>
          {menu === "kids" ? <hr /> : null}
        </li>
      </ul>

      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="cart" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
