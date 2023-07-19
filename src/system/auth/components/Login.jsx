import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Navbar from "../../Navbar";

import GoogleLogin from "./GoogleLogin";

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
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card mt-5">
              <div className="card-body p-5">
                <h1 className="card-title mb-4">{t("login")}</h1>
                <form>
                  <div className="mb-4">
                    <label htmlFor="username" className="form-label">
                      {t("username")}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder={t("username")}
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      {t("password")}
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder={t("password")}
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button
                      className={"btn btn-primary btn-lg"}
                      onClick={handleLogin}
                    >
                      {t("login")}
                    </button>
                  </div>
                </form>
                <div className="text-center mt-4">
                  <GoogleLogin />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
