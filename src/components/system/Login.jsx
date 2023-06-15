import React, { useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const Login = ({ setToken, token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "api_key34",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        Cookies.set("token", data.token);
        Navigate("/");
      } else {
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
    <div>
      <h1>Login</h1>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
