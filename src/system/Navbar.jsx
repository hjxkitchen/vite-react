import axios from "axios";
import React, {
  Fragment,
  useEffect,
  useContext,
  Suspense,
  useState,
} from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext, CategoryContext } from "../App";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";

const languages = [
  { value: "", text: "Language/Lugha" },
  { value: "en", text: "English" },
  { value: "sw", text: "Swahili" },
];

const Navbar = () => {
  const user = useContext(UserContext);
  const [categories, setCategories] = useState();
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  // console.log("categories", categories);
  const getCats = async () => {
    try {
      const response = await axios.get(
        (await import.meta.env.VITE_API_URL) +
          "/api/category?include=subcategory",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      console.log("cats are", response.data.subcategories);
      setCategories(response.data);
      // console.log("cats are", categories);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCats();
  }, []);

  const { t } = useTranslation();

  const [lang, setLang] = useState("");

  // This function put query that helps to
  // change the language
  const handleChange = (e) => {
    setLang(e.target.value);
    let loc = "http://localhost:3000/about";
    window.location.replace(loc + "?lng=" + e.target.value);
  };

  // const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  const handleLogout = () => {
    Cookies.remove(import.meta.env.VITE_COOKIE_NAME);
    window.location.href = "/login";
  };

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const userRole = Cookies.get(import.meta.env.VITE_COOKIE_NAME)
    ? JSON.parse(
        atob(Cookies.get(import.meta.env.VITE_COOKIE_NAME).split(".")[1])
      ).role_id
    : null;

  const navigate = useNavigate();
  function handleBackClick() {
    navigate(-1);
  }

  return (
    <Fragment>
      {/* <React.StrictMode>
        <Suspense fallback="loading"> */}
      {/* collabsible navbar */}
      <nav
        class="navbar fixed-top navbar-expand-lg navbar-dark"
        style={{
          backgroundColor: "dark" === "dark" ? "#343a40" : "#f8f9fa",
        }}
      >
        <div className="container-fluid cssnav">
          {userRole === 1 && (
            <button
              className={`btn btn-dark bg-dark toggle-btn`}
              onClick={toggleSidebar}
            >
              {isCollapsed ? ">" : "<"}
            </button>
          )}
          <Link to="/" class="nav-link">
            <a class="navbar-brand " href="/">
              <img
                src="/logo.png"
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
            class="navbar-toggler mr-1"
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
            <ul class="navbar-nav ">
              {/* dropdown */}
              {/* <li class="nav-item dropdown">
<Link to="/shop" class="nav-link dropdown-toggle ml-1" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
<i class="fas fa-shopping-bag fa-lg"></i> {t('SHOP').toUpperCase()}
</Link>
<div class="dropdown-menu" aria-labelledby="navbarDropdown">
<Link to="/shop" class="dropdown-item" >Power Generation</Link>
<Link to="/shop" class="dropdown-item" >Appliances</Link>
<Link to="/shop" class="dropdown-item" >Specialty</Link>
</div>
</li> */}
              {/* shop dropdown */}
              <li class="nav-item">
                <li class="dropdown menu-large nav-item">
                  {" "}
                  <a
                    href="#"
                    class="dropdown-toggle nav-link"
                    data-toggle="dropdown"
                  >
                    <i class="fas fa-shopping-bag fa-lg"></i>{" "}
                    {t("SHOP").toUpperCase()}{" "}
                  </a>
                  <ul class="dropdown-menu megamenu">
                    <div class="row megamenu-container">
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
                                        <a
                                          href={
                                            "/category/" +
                                            subcategory.subcategory_id
                                          }
                                        >
                                          {subcategory.subcategory_name}
                                        </a>
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
                <Link to="/featured" class="nav-link ">
                  <i class="fas fa-fire fa-lg"></i> FEATURED
                </Link>
              </li>
              <li class="nav-item ">
                <Link to="/packages" class="nav-link">
                  <i class="fas fa-store fa-lg"></i> PACKAGES
                </Link>
              </li>

              {/* <li class="nav-item">
<Link to="/calculators" class="nav-link disabled" style={{textDecoration:"line-through"}}><i class="fas fa-calculator fa-lg" ></i> CALCULATORS</Link>
</li>
<li class="nav-item">
<Link to="/blog" class="nav-link disabled" style={{textDecoration:"line-through"}}><i class="fas fa-blog fa-lg" ></i> BLOG</Link>
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
              <ul class="navbar-nav  ">
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
                {/* 
<select class="mt-2 mb-2" value={lang} onChange={handleChange}>
				{languages.map(item => {	
					return (<option key={item.value}
					value={item.value}>{item.text}</option>);
				})}
</select> */}
                ``{" "}
                {userRole === 2 && (
                  <li class="nav-item">
                    <Link to="/favorites" class="nav-link">
                      <i class="fas fa-heart fa-lg"></i> {t("FAVORITES")}
                    </Link>
                  </li>
                )}
                {userRole === 1 && (
                  <li class="nav-item">
                    <Link to="/ordercart" class="nav-link">
                      <i class="fas fa-shopping-cart fa-lg"></i>{" "}
                      {t("ORDERCART").toUpperCase()}
                    </Link>
                  </li>
                )}
                <li class="nav-item">
                  <Link to="/cart" class="nav-link">
                    <i class="fas fa-shopping-cart fa-lg"></i>{" "}
                    {t("CART").toUpperCase()}
                  </Link>
                </li>
                {/* account dropdown */}
                {userRole === 2 && (
                  <li class="nav-item dropdown ">
                    <a
                      class="nav-link dropdown-toggle"
                      href="/admin"
                      id="navbardrop"
                      data-toggle="dropdown"
                    >
                      <i class="fas fa-user fa-lg"></i> ACCOUNT
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                      <Link to="/account">
                        <a class="dropdown-item" href="/account">
                          <i class="fas fa-user"></i> {t("Account")}
                        </a>
                      </Link>
                      <Link to="/order_history">
                        <a class="dropdown-item" href="/order_history">
                          <i class="fas fa-shopping-cart"></i> {t("Orders")}
                        </a>
                      </Link>
                      <Link to="/settings">
                        <a class="dropdown-item" href="/account">
                          <i class="fas fa-user"></i> {t("Preferences")}
                        </a>
                      </Link>
                      <Link to="/about">
                        <a class="dropdown-item" href="/about">
                          <i class="fas fa-address-card"></i> {t("About Us")}
                        </a>
                      </Link>

                      <Link to="/contact">
                        <a class="dropdown-item" href="/contact">
                          <i class="fas fa-phone"></i> {t("Contact Us")}
                        </a>
                      </Link>

                      <Link class="dropdown-item" onClick={handleLogout}>
                        <i class="fas fa-sign-out-alt fa-lg "></i>{" "}
                        {t("Log Out")}
                      </Link>
                      {/* <a class="dropdown-item" onClick={handleLogout}><i class="fas fa-sign-out-alt" ></i> Sign Out</a>
      <a class="dropdown-item" href="/login"><i class="fas fa-sign-in-alt"></i> Log in</a>
      <a class="dropdown-item" href="/signup"><i class="fas fa-user-plus"></i> Sign up</a> */}
                    </div>
                  </li>
                )}
                {!userRole && (
                  <li class="nav-item">
                    <Link to="/login" class="nav-link">
                      <i class="fas fa-sign-in-alt fa-lg "></i> {t("Log In")}
                    </Link>
                  </li>
                )}
                {userRole === 1 && (
                  <li class="nav-item">
                    <Link onClick={handleLogout} class="nav-link">
                      <i class="fas fa-sign-in-alt fa-lg "></i> {t("Log Out")}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {userRole === 1 && (
        <div
          className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
          style={{
            backgroundColor: "dark" === "dark" ? "#343a40" : "#f8f9fa",
          }}
        >
          <div className="sidebar-content">
            <ul className="sidebar-nav">
              <li className="sidebar-item">
                <Link to="/contacts">
                  <i className="fas fa-users fa"></i> Contacts
                </Link>
              </li>

              <hr style={{ backgroundColor: "white" }} />

              {userRole === 1 && (
                <li className="sidebar-item">
                  <Link to="/team">
                    <i className="fas fa-users fa"></i> Team
                  </Link>
                </li>
              )}
              <li className="sidebar-item">
                <Link to="/settings">
                  <i className="fas fa fa-cog"></i> Preferences
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to="/account">
                  <i className="fa fa-user"></i> Account
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div>
        {userRole === 1 && (
          <button className="back-button" onClick={handleBackClick}>
            Back
          </button>
        )}
      </div>
      {/* <div className="forward-button">
        <button onClick={handleBackClick}>Forward</button>
      </div> */}

      {/* </Suspense>
      </React.StrictMode> */}
    </Fragment>
  );
};

export default Navbar;
