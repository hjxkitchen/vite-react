import axios from "axios";
import React, {
  Fragment,
  useEffect,
  useContext,
  Suspense,
  useState,
} from "react";
import { Outlet, Link } from "react-router-dom";
import { TokenContext, UserContext, CategoryContext } from "../index";

import { useTranslation } from "react-i18next";

const languages = [
  { value: "", text: "Language/Lugha" },
  { value: "en", text: "English" },
  { value: "sw", text: "Swahili" },
];

const Navbar = () => {
  const user = useContext(UserContext);
  const categories = useContext(CategoryContext);

  // console.log("categories", categories);

  const { t } = useTranslation();

  const [lang, setLang] = useState("");

  // This function put query that helps to
  // change the language
  const handleChange = (e) => {
    setLang(e.target.value);
    let loc = "http://localhost:3000/about";
    window.location.replace(loc + "?lng=" + e.target.value);
  };

  const token = useContext(TokenContext);

  const handleLogout = async () => {
    // setUser(null);

    // set cookie null
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // console.log("delete token is", token);

    const res = await axios.post("http://localhost:5000/delusersessions", {
      token: token,
    });

    // console.log("res is", res);

    window.location.href = "/";
  };

  return (
    <Fragment>
      <React.StrictMode>
        <Suspense fallback="loading">
          {/* collabsible navbar */}
          <nav
            className="navbar navbar-expand-lg navbar-dark"
            style={{ backgroundColor: "black" }}
          >
            <Link to="/shop" className="nav-link">
              <a className="navbar-brand ml-3" href="/">
                <img
                  src="/logo512.png"
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

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-5">
                {/* dropdown */}
                {/* <li className="nav-item dropdown">
<Link to="/shop" className="nav-link dropdown-toggle ml-1" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
<i className="fas fa-shopping-bag fa-lg"></i> {t('SHOP').toUpperCase()}
</Link>
<div className="dropdown-menu" aria-labelledby="navbarDropdown">
<Link to="/shop" className="dropdown-item" >Power Generation</Link>
<Link to="/shop" className="dropdown-item" >Appliances</Link>
<Link to="/shop" className="dropdown-item" >Specialty</Link>
</div>
</li> */}
                {/* shop dropdown */}
                <li className="nav-item">
                  <li className="dropdown menu-large nav-item">
                    {" "}
                    <a
                      href="#"
                      className="dropdown-toggle nav-link"
                      data-toggle="dropdown"
                    >
                      <i className="fas fa-shopping-bag fa-lg"></i>{" "}
                      {t("SHOP").toUpperCase()}{" "}
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
                  <Link to="/featured" className="nav-link ml-1">
                    <i className="fas fa-fire fa-lg"></i> FEATURED
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link to="/packages" className="nav-link">
                    <i className="fas fa-store fa-lg"></i> PACKAGES
                  </Link>
                </li>

                {/* <li className="nav-item">
<Link to="/calculators" className="nav-link disabled" style={{textDecoration:"line-through"}}><i className="fas fa-calculator fa-lg" ></i> CALCULATORS</Link>
</li>
<li className="nav-item">
<Link to="/blog" className="nav-link disabled" style={{textDecoration:"line-through"}}><i className="fas fa-blog fa-lg" ></i> BLOG</Link>
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

                  {/* 
<select className="mt-2 mb-2" value={lang} onChange={handleChange}>
				{languages.map(item => {	
					return (<option key={item.value}
					value={item.value}>{item.text}</option>);
				})}
</select> */}

                  <li className="nav-item ">
                    <Link to="/about" className="nav-link">
                      <i className="fas fa-address-card fa-lg"></i> {t("ABOUT")}
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/contact" className="nav-link">
                      <i className="fas fa-phone fa-lg"></i> {t("CONTACT")}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/cart" className="nav-link">
                      <i className="fas fa-shopping-cart fa-lg"></i>{" "}
                      {t("CART").toUpperCase()}
                    </Link>
                  </li>

                  {/* account dropdown */}
                  <li className="nav-item dropdown ml-1">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/admin"
                      id="navbardrop"
                      data-toggle="dropdown"
                    >
                      <i className="fas fa-user fa-lg"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                      <Link to="/account">
                        <a className="dropdown-item" href="/account">
                          <i className="fas fa-user"></i> {t("Account")}
                        </a>
                      </Link>
                      <Link to="/order_history">
                        <a className="dropdown-item" href="/order_history">
                          <i className="fas fa-shopping-cart"></i> {t("Orders")}
                        </a>
                      </Link>
                      <Link to="/favorites">
                        <a className="dropdown-item" href="/favorites">
                          <i className="fas fa-heart"></i> {t("Favorites")}
                        </a>
                      </Link>
                      <Link className="dropdown-item" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt fa-lg "></i>{" "}
                        {t("LOGOUT")}
                      </Link>
                      {/* <a className="dropdown-item" onClick={handleLogout}><i className="fas fa-sign-out-alt" ></i> Sign Out</a>
      <a className="dropdown-item" href="/login"><i className="fas fa-sign-in-alt"></i> Log in</a>
      <a className="dropdown-item" href="/signup"><i className="fas fa-user-plus"></i> Sign up</a> */}
                    </div>
                  </li>

                  {/* <li className="nav-item">
</li> */}
                </ul>
              </div>
            </div>
          </nav>
        </Suspense>
      </React.StrictMode>
    </Fragment>
  );
};

export default Navbar;
