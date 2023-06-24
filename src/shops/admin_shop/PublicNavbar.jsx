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
        className="navbar navbar-expand-lg navbar-dark"
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
            {/* optional search bar */}
            {/* <li>
<form className="form-inline ml-5" action="/action_page.php">
    <input className="form-control mr-sm-2" type="text" placeholder="Search"></input>
    <button className="btn btn-success" type="submit">Search Products</button>
</form>
</li> */}
          </ul>
          <div className="ml-auto">
            <ul className="navbar-nav ml-5 mr-5">
              {/* <!-- Admin Dropdown --> */}
              {/* <li className="nav-item dropdown">
  <a className="nav-link dropdown-toggle" href="/admin" id="navbardrop" data-toggle="dropdown">
  ADMIN
  </a>
  <div className="dropdown-menu">
      <a className="dropdown-item" href="/admin">Dashboard</a>
      <a className="dropdown-item" href="/inventory">Inventory</a>
      <a className="dropdown-item" href="/sales">Sales</a>
      <a className="dropdown-item" href="/orders">Orders</a>
      <a className="dropdown-item" href="/suppliers">Suppliers</a>
      <a className="dropdown-item" href="/users">Users</a>
  </div>
</li> */}
              {/* <li className="nav-item">
  <Link to="/admin" className="nav-link"> ADMIN</Link>
</li> */}

              {/* <li className="nav-item">
<select className="mr-2 mt-2">
  <option selected>Select Language</option>
  <option value="en">English</option>
  <option value="sw">Kiswahili</option>
</select>

</li> */}

              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  <i className="fas fa-phone fa-lg"></i> CONTACT
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  <i className="fas fa-sign-in-alt"></i> LOGIN
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
