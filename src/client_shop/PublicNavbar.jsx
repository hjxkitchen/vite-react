import React, { Fragment, useEffect, useState, useContext } from "react";
import axios from "axios";
import { Outlet, Link } from "react-router-dom";
// import categorycontext
import { CategoryContext } from "./../App";

const Navbar = (setUser, user) => {
  const handleLogout = () => {
    // setUser(null);
    window.location.href = "/";
  };

  const [categories, setCategories] = useState();

  // console.log("categories", categories);
  const getCats = async () => {
    try {
      console.log("Asdasdasd");
      const response = await axios.get("http://localhost:5000/cat-subcat");
      console.log("cats are", response.data);
      setCategories(response.data);
      // console.log("cats are", categories);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCats();
  }, []);

  return (
    <Fragment>
      {/* collabsible navbar */}
      <nav
        class="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "black" }}
      >
        <Link to="/shop" class="nav-link">
          <a class="navbar-brand ml-3" href="/">
            {/* import logo512 from public */}
            <img
              src="logo512.png"
              width="30"
              height="30"
              class="d-inline-block align-top mr-3"
              alt=""
              loading="lazy"
            />
            ZAHAB
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
            {/* shop dropdown */}
            <li class="nav-item">
              <li class="dropdown menu-large nav-item">
                {" "}
                <a
                  href="#"
                  class="dropdown-toggle nav-link"
                  data-toggle="dropdown"
                >
                  <i class="fas fa-shopping-bag fa-lg"></i> SHOP
                </a>
                <ul class="dropdown-menu megamenu">
                  <div class="row">
                    {/* map categories */}
                    {categories &&
                      categories.map((category, index) => {
                        return (
                          <li class="col-md-2 dropdown-item">
                            <ul>
                              <li class="dropdown-header">
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
            <li class="nav-item">
              <Link to="/featured" class="nav-link">
                <i class="fas fa-star fa-lg"></i> FEATURED
              </Link>
            </li>
            {/* <li class="nav-item">
<Link to="/calculators." class="nav-link disabled" style={{textDecoration:"line-through"}} ><i class="fas fa-calculator fa-lg" ></i> CALCULATORS</Link>
</li>
<li class="nav-item">
<Link to="/blog." class="nav-link disabled" style={{textDecoration:"line-through"}}><i class="fas fa-blog fa-lg" ></i> BLOG</Link>
</li> */}

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
              {/* <li class="nav-item"> */}
              <select class=" mt-2 mb-2">
                <option selected>Language/Lugha</option>
                <option value="en">English</option>
                <option value="sw">Kiswahili</option>
              </select>

              {/* </li> */}
              <li class="nav-item">
                <Link to="/about" class="nav-link">
                  <i class="fas fa-address-card fa-lg"></i> ABOUT
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/contact" class="nav-link">
                  <i class="fas fa-phone fa-lg"></i> CONTACT
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/cart" class="nav-link">
                  <i class="fas fa-shopping-cart fa-lg"></i> CART
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
