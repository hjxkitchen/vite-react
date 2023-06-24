import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Assuming you have already set up the i18n configuration

import { ThemeProvider } from "./contexts/ThemeContext";

import Login from "./system/components/Login";
import ProtectedRoute from "./system/components/ProtectedRoute";
import Home from "./system/Home";

import Settings from "./system/Settings";

import Account from "./system/Account";
import Contact from "./system/Contact";

import Team from "./system/Team";

import Token from "./system/components/Token";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
    console.log("getting token from cookie", storedToken);
    if (storedToken) {
      console.log("setting token", storedToken);
      setToken(storedToken);
    }
  }, []);

  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Routes>
            <Route path="token" element={<Token />} />
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
            <Route
              path="team"
              element={
                <ProtectedRoute token={token} allowedRoles={[1]}>
                  <Team />
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
