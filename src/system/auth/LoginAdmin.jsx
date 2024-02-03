import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../contexts/ThemeContext";
import jwt_decode from "jwt-decode";

import GoogleLogin from "./GoogleLogin";

import Navbar from "../Navbar";
import Footer from "../Footer";

const Login = ({}) => {
  const { t } = useTranslation();

  const { theme } = useContext(ThemeContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    // Cookies.set(import.meta.env.VITE_COOKIE_NAME, event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // seperate admin login
        console.log("decoded:", jwt_decode(data.token));
        if (jwt_decode(data.token).role_id === 2) {
          alert("Login failed");
          throw new Error("You are not an admin. Please login as user.");
        }

        Cookies.set(import.meta.env.VITE_COOKIE_NAME, data.token);
        // Navigate("/");
        window.location.reload();
      } else {
        alert("Login failed");
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="mt-5 mb-4">Admin Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          className={"btn btn-" + theme + " mt-4 mb-4"}
          onClick={handleLogin}
        >
          {t("login")}
        </button>
        {/* <GoogleLogin /> */}
        <br />
        {/* <a href="/signup">Signup</a> */}
      </div>
      <Footer />
    </>
  );
};

export default Login;