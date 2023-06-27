import axios from "axios";
import React, { Fragment, useEffect, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = (setUser, user) => {
  const navigate = useNavigate();
  function handleBackClick() {
    navigate(-1);
  }

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  const handleLogout = async () => {
    document.cookie = "token2=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // const res = await axios.post("http://localhost:000/deladminusersessions", {
    //   token: token,
    // });

    window.location.href = "/";
  };
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Fragment>
      <nav
        class="navbar navbar-expand-lg navbar-dark "
        style={{ backgroundColor: "black" }}
      >
        <Link to="/" class="nav-link">
          <a class="navbar-brand ml-3" href="/">
            <img
              src="logo512.png"
              width="30"
              height="30"
              class="d-inline-block align-top mr-3"
              alt=""
              loading="lazy"
            />
            ZAHAB ADMIN
          </a>
        </Link>
        <button onClick={handleBackClick}>Back</button>
        <button
          class="navbar-toggler mr-3"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-5">
            {/* <li class="nav-item">
              <Link to="/admin" class="nav-link">
                <i class="fas fa-money"></i> SALES
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/marketingdash" class="nav-link">
                <i class="fas fa-users"></i> MARKETING
              </Link>
            </li> */}
          </ul>
          <div class="ml-auto">
            <ul class="navbar-nav ml-5 mr-5">
              <li class="nav-item">
                <div class="relative mr-2">
                  <select
                    class="block appearance-none w-full bg-grey border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                    id="language-select"
                    onChange={handleLanguageChange}
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                      <path
                        fill-rule="evenodd"
                        d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-7a1 1 0 011 1v1.586l1.707-1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414 0l-1.707-1.293V14a1 1 0 01-2 0V4a1 1 0 011-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </li>
              <li class="nav-item">
                <Link to="/account" class="nav-link">
                  <i class="fas fa-user"></i> ACCOUNT
                </Link>
              </li>

              <li class="nav-item">
                <Link class="nav-link" onClick={handleLogout}>
                  <i class="fas fa-sign-out-alt "></i> LOGOUT
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
