import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Assuming you have already set up the i18n configuration

import { ThemeProvider } from "./contexts/ThemeContext";

import Login from "./components/system/Login";
import ProtectedRoute from "./components/system/ProtectedRoute";
import Home from "./pages/system/Home";

import Settings from "./pages/system/Settings";

import Account from "./pages/system/Account";
import Contact from "./pages/system/Contact";

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
              path="/"
              element={
                <ProtectedRoute
                  setToken={setToken}
                  token={token}
                  allowedRoles={[1, 2]}
                >
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="login"
              element={<Login setToken={setToken} token={token} />}
            />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
            <Route path="contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </I18nextProvider>
    </ThemeProvider>
  );
};

export default App;
