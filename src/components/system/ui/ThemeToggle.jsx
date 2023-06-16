import React, { useContext } from "react";
import ThemeContext from "./../../../ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <div>
      <label htmlFor="themeToggle">Theme:</label>
      <input
        type="checkbox"
        id="themeToggle"
        checked={theme === "dark"}
        onChange={handleThemeToggle}
      />
    </div>
  );
};

export default ThemeToggle;
