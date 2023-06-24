import React, { Fragment, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

const Navbar = (setUser, user) => {
  const handleLogout = () => {
    // setUser(null);
    window.location.href = "/";
  };

  return (
    <Fragment>
      {/* collabsible navbar */}
      <nav
        class="navbar navbar-expand-lg navbar-dark"
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
            {/* optional search bar */}
            {/* <li>
<form class="form-inline ml-5" action="/action_page.php">
    <input class="form-control mr-sm-2" type="text" placeholder="Search"></input>
    <button class="btn btn-success" type="submit">Search Products</button>
</form>
</li> */}
          </ul>
          <div class="ml-auto">
            <ul class="navbar-nav ml-5 mr-5">
              {/* <!-- Admin Dropdown --> */}
              {/* <li class="nav-item dropdown">
  <a class="nav-link dropdown-toggle" href="/admin" id="navbardrop" data-toggle="dropdown">
  ADMIN
  </a>
  <div class="dropdown-menu">
      <a class="dropdown-item" href="/admin">Dashboard</a>
      <a class="dropdown-item" href="/inventory">Inventory</a>
      <a class="dropdown-item" href="/sales">Sales</a>
      <a class="dropdown-item" href="/orders">Orders</a>
      <a class="dropdown-item" href="/suppliers">Suppliers</a>
      <a class="dropdown-item" href="/users">Users</a>
  </div>
</li> */}
              {/* <li class="nav-item">
  <Link to="/admin" class="nav-link"> ADMIN</Link>
</li> */}

              {/* <li class="nav-item">
<select class="mr-2 mt-2">
  <option selected>Select Language</option>
  <option value="en">English</option>
  <option value="sw">Kiswahili</option>
</select>

</li> */}

              <li class="nav-item">
                <Link to="/contact" class="nav-link">
                  <i class="fas fa-phone fa-lg"></i> CONTACT
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/login" class="nav-link">
                  <i class="fas fa-sign-in-alt"></i> LOGIN
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
