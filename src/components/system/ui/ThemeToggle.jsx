import React, { useState } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add logic to toggle dark mode here
  };

  return (
    <div>
      <label htmlFor="darkModeToggle">Dark Mode:</label>
      <input
        type="checkbox"
        id="darkModeToggle"
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
    </div>
  );
};

export default ThemeToggle;
