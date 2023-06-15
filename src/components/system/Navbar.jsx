import React from "react";
import Cookies from "js-cookie";

const Navbar = () => {
  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Navbar;
