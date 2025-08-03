import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext"; 

const backend_url = "http://localhost:4000";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { setToken } = useContext(ShopContext); 

  const login = async () => {
  try {
    const res = await fetch(`${backend_url}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      localStorage.setItem("auth-token", data.token);
      setToken(data.token);
      window.location.replace("/");
    } else {
      alert(data.error || "Login failed");
    }
  } catch (error) {
    alert("Error logging in");
    console.error(error);
  }
};


  const signup = async () => {
    try {
      const res = await fetch(`${backend_url}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.dispatchEvent(new Event("storage")); // ✅ Add this
        window.location.replace("/");
      } else {
        alert(data.errors || "Signup failed");
      }
      
    } catch (error) {
      alert("Error signing up");
      console.error(error);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <input
              type="text"
              placeholder="Your name"
              name="username"
              value={formData.username}
              onChange={changeHandler}
            />
          )}
          <input
            type="email"
            placeholder="Email address"
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

        <button onClick={() => (state === "Login" ? login() : signup())}>
          Continue
        </button>

        {state === "Login" ? (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span onClick={() => setState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
