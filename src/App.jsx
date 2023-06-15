import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Login from "./components/system/Login";
import ProtectedRoute from "./components/system/ProtectedRoute";
import Home from "./pages/system/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute setToken={setToken} token={token}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setToken={setToken} token={token} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
