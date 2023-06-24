// responsive bootstrap navbar

import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

// import LogoutButton from "./LogoutButton";

import { ThemeContext } from "../contexts/ThemeContext";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { theme } = useContext(ThemeContext);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    Cookies.remove(import.meta.env.VITE_COOKIE_NAME);
    window.location.href = "/login";
  };

  const userRole = Cookies.get(import.meta.env.VITE_COOKIE_NAME)
    ? JSON.parse(
        atob(Cookies.get(import.meta.env.VITE_COOKIE_NAME).split(".")[1])
      ).roleId
    : null;

  return (
    <>
      <nav
        className={
          "navbar fixed-top navbar-expand-lg navbar-" + theme + " bg-" + theme
        }
        style={{ paddingTop: "20px" }}
      >
        <div className="container-fluid cssnav">
          <button
            className={"btn btn-" + theme + " bg-" + theme + " toggle-btn"}
            onClick={toggleSidebar}
          >
            {isCollapsed ? ">" : "<"}
          </button>
          <Link className="navbar-brand" to="/">
            Zahab Admin
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  <i className="fas fa-sitemap fa "></i>
                  Products / Packages
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">
                  <i className="fas fa-hand-holding-usd fa "></i>
                  Orders
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/saleslist">
                  <i className="fas fa fa-dollar-sign "></i>
                  Sales
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/adminops">
                  <i className="fas fa fa-user-cog "></i>
                  Admin Ops
                </Link>
              </li>
            </ul>
            {/* with some space on the right */}
            <ul className="navbar-nav ms-auto rightmost-nav-link">
              <li className="nav-item dropdown text-center">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user-circle fa "></i>
                  Account
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end text-center mb-3"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link className="dropdown-item" to="account">
                      <i className="fas fa-user-circle fa "></i>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/settings">
                      <i className="fas fa-cog fa "></i>
                      Settings
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt fa "></i>
                      Logout
                    </a>
                    {/* <LogoutButton /> */}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* sidebar */}
      <div
        className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
        //   bg color and text color based on theme
        style={{
          backgroundColor: theme === "dark" ? "#343a40" : "#f8f9fa",
        }}
      >
        <div className="sidebar-content">
          <ul className="sidebar-nav">
            <li className="sidebar-item">
              <Link to="/playbooks">
                <i className="fas fa-book fa "></i> Playbooks
              </Link>
            </li>
            {/* if user role is 1 */}
            {userRole === 1 && (
              <li className="sidebar-item">
                <Link to="/team">
                  <i className="fas fa-users fa "></i> Team
                </Link>
              </li>
            )}
            <li className="sidebar-item">
              <Link to="/settings">
                <i className="fas fa fa-cog "></i> Preferences
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/account">
                <i className="fa fa-user "></i> Account
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/contact">
                <i className="fa fa-phone "></i> Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
