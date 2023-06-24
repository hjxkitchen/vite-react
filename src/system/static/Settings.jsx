import React, { useState, useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import i18next, { t } from "i18next";

import Navbar from "./../Navbar";
import Footer from "./../Footer";

const Settings = () => {
  const { t } = useTranslation();

  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    i18next.changeLanguage(language);
  };

  return (
    <>
      <Navbar />
      <h1 className="text-center mt-3"> Preferences </h1>

      {/* card with toggle for dark mode and slector for language */}

      <div className="container">
        <div className="card mt-5">
          <div className="card-body">
            <h5 className="card-title">Dark Mode</h5>
            <p className="card-text">Toggle dark mode on or off</p>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                checked={theme === "dark"}
                onChange={handleThemeToggle}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                {t("dark mode")}
              </label>
            </div>
            <hr />
            <h5 className="card-title">{t("language")}</h5>
            <p className="card-text">Select your language</p>
            <select
              className="form-select"
              aria-label="Default select example"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="en">{t("english")}</option>
              <option value="fr">{t("french")}</option>
            </select>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Settings;
