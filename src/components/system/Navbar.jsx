import React from "react";
import Cookies from "js-cookie";
import LanguageToggle from "./ui/LanguageToggle";
import ThemeToggle from "./ui/ThemeToggle";

const Navbar = () => {
  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <LanguageToggle />
      <ThemeToggle />
    </>
  );
};

export default Navbar;
