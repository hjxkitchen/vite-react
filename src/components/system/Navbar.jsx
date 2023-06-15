import React from "react";

const Navbar = ({ handleLogout }) => {
  return <button onClick={handleLogout}>Logout</button>;
};

export default Navbar;
