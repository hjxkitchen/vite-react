import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Assuming you have already set up the i18n configuration

import { ThemeProvider } from "./contexts/ThemeContext";

import Login from "./system/components/system/Login";
import ProtectedRoute from "./system/components/system/ProtectedRoute";
import Home from "./system/Home";

import Settings from "./system/Settings";

import Account from "./system/Account";
import Contact from "./system/Contact";

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
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Routes>
            <Route
              path="login"
              element={<Login setToken={setToken} token={token} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute token={token} allowedRoles={[1, 2]}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute token={token} allowedRoles={[1, 2]}>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="account"
              element={
                <ProtectedRoute token={token} allowedRoles={[1, 2]}>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="contact"
              element={
                <ProtectedRoute token={token} allowedRoles={[1, 2]}>
                  <Contact />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </I18nextProvider>
    </ThemeProvider>
  );
};

export default App;
