import React, { Fragment, useEffect, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
// import categorycontext
import { CategoryContext } from "./../index";

const Navbar = (setUser, user) => {
  const handleLogout = () => {
    // setUser(null);
    window.location.href = "/";
  };

  const categories = useContext(CategoryContext);

  return (
    <Fragment>
      {/* collabsible navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "black" }}
      >
        <Link to="/shop" className="nav-link">
          <a className="navbar-brand ml-3" href="/">
            {/* import logo512 from public */}
            <img
              src="logo512.png"
              width="30"
              height="30"
              className="d-inline-block align-top mr-3"
              alt=""
              loading="lazy"
            />
            ZAHAB
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
            {/* shop dropdown */}
            <li className="nav-item">
              <li className="dropdown menu-large nav-item">
                {" "}
                <a
                  href="#"
                  className="dropdown-toggle nav-link"
                  data-toggle="dropdown"
                >
                  <i className="fas fa-shopping-bag fa-lg"></i> SHOP
                </a>
                <ul className="dropdown-menu megamenu">
                  <div className="row">
                    {/* map categories */}
                    {categories &&
                      categories.map((category, index) => {
                        return (
                          <li className="col-md-2 dropdown-item">
                            <ul>
                              <li className="dropdown-header">
                                {category.category_name}
                              </li>
                              {/* map subcategories */}
                              {category.subcategories.map(
                                (subcategory, index) => {
                                  return (
                                    <li>
                                      <Link to="#">
                                        {subcategory.subcat_name}
                                      </Link>
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </li>
                        );
                      })}
                  </div>
                </ul>
              </li>
            </li>
            <li className="nav-item">
              <Link to="/featured" className="nav-link">
                <i className="fas fa-star fa-lg"></i> FEATURED
              </Link>
            </li>
            {/* <li className="nav-item">
<Link to="/calculators." className="nav-link disabled" style={{textDecoration:"line-through"}} ><i className="fas fa-calculator fa-lg" ></i> CALCULATORS</Link>
</li>
<li className="nav-item">
<Link to="/blog." className="nav-link disabled" style={{textDecoration:"line-through"}}><i className="fas fa-blog fa-lg" ></i> BLOG</Link>
</li> */}

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
              {/* <li className="nav-item"> */}
              <select className=" mt-2 mb-2">
                <option selected>Language/Lugha</option>
                <option value="en">English</option>
                <option value="sw">Kiswahili</option>
              </select>

              {/* </li> */}
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  <i className="fas fa-address-card fa-lg"></i> ABOUT
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  <i className="fas fa-phone fa-lg"></i> CONTACT
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link">
                  <i className="fas fa-shopping-cart fa-lg"></i> CART
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
