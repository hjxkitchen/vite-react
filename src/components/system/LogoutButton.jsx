import React from "react";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../contexts/ThemeContext";

const LogoutButton = () => {
  const { t } = useTranslation();

  const { theme } = React.useContext(ThemeContext);

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <button className={"btn btn-" + theme} onClick={handleLogout}>
      {t("logout")}
    </button>
  );
};

export default LogoutButton;
