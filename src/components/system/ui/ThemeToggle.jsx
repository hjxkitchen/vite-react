import React, { useContext } from "react";
import ThemeContext from "../../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

const ThemeToggle = () => {
  const { t } = useTranslation();

  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <div>
      {/* bootstrap checkbox */}
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="activate"
          checked={theme === "dark"}
          onChange={handleThemeToggle}
        />
        <label
          className="form-check-label"
          htmlFor="activate"
          style={{ color: theme === "dark" ? "white" : "grey" }}
        >
          {t("dark mode")}
        </label>
      </div>
    </div>
  );
};

export default ThemeToggle;
