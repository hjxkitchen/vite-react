import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import i18next, { t } from "i18next";
import ThemeContext from "../../../contexts/ThemeContext";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const { theme } = useContext(ThemeContext);

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    i18next.changeLanguage(language);
  };

  return (
    <div>
      <label
        htmlFor="languageSelect"
        // style={{ color: theme === "dark" ? "white" : "grey" }}
      >
        {t("language")}
      </label>
      <select
        id="languageSelect"
        value={selectedLanguage}
        onChange={handleLanguageChange}
      >
        <option value="en">{t("english")}</option>
        <option value="fr">{t("french")}</option>
      </select>
    </div>
  );
};

export default LanguageToggle;
