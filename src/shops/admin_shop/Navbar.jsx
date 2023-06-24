import axios from "axios";
import React, { Fragment, useEffect, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
// import { TokenContext } from "../index";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Navbar = (setUser, user) => {
  const navigate = useNavigate();
  function handleBackClick() {
    navigate(-1);
  }

  // const token = useContext(TokenContext);
  const handleLogout = async () => {
    document.cookie = "token2=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    const res = await axios.post("http://localhost:5000/deladminusersessions", {
      token: token,
    });

    window.location.href = "/";
  };

  return (
    <Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-dark "
        style={{ backgroundColor: "black" }}
      >
        <Link to="/" className="nav-link">
          <a className="navbar-brand ml-3" href="/">
            <img
              src="logo512.png"
              width="30"
              height="30"
              className="d-inline-block align-top mr-3"
              alt=""
              loading="lazy"
            />
            ZAHAB ADMIN
          </a>
        </Link>
        <button onClick={handleBackClick}>Back</button>
        <button
          className="navbar-toggler mr-3"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-5">
            {/* <li className="nav-item">
              <Link to="/admin" className="nav-link">
                <i className="fas fa-money"></i> SALES
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/marketingdash" className="nav-link">
                <i className="fas fa-users"></i> MARKETING
              </Link>
            </li> */}
          </ul>
          <div className="ml-auto">
            <ul className="navbar-nav ml-5 mr-5">
              <li className="nav-item">
                <div className="relative mr-2">
                  <select
                    className="block appearance-none w-full bg-grey border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                    id="language-select"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                      <path
                        fillRule="evenodd"
                        d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-7a1 1 0 011 1v1.586l1.707-1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414 0l-1.707-1.293V14a1 1 0 01-2 0V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <Link to="/account" className="nav-link">
                  <i className="fas fa-user"></i> ACCOUNT
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt "></i> LOGOUT
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
