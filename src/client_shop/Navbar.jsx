import axios from "axios";
import React, {
  Fragment,
  useEffect,
  useContext,
  Suspense,
  useState,
} from "react";
import { Outlet, Link } from "react-router-dom";
import { TokenContext, UserContext, CategoryContext } from "../App";

import { useTranslation } from "react-i18next";

const languages = [
  { value: "", text: "Language/Lugha" },
  { value: "en", text: "English" },
  { value: "sw", text: "Swahili" },
];

const Navbar = () => {
  const user = useContext(UserContext);
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
            class="navbar navbar-expand-lg navbar-dark"
            style={{ backgroundColor: "black" }}
          >
            <Link to="/shop" class="nav-link">
              <a class="navbar-brand ml-3" href="/">
                <img
                  src="/logo512.png"
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
                  <Link to="/featured" class="nav-link ml-1">
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

                  {/* 
<select class="mt-2 mb-2" value={lang} onChange={handleChange}>
				{languages.map(item => {	
					return (<option key={item.value}
					value={item.value}>{item.text}</option>);
				})}
</select> */}

                  <li class="nav-item ">
                    <Link to="/about" class="nav-link">
                      <i class="fas fa-address-card fa-lg"></i> {t("ABOUT")}
                    </Link>
                  </li>

                  <li class="nav-item">
                    <Link to="/contact" class="nav-link">
                      <i class="fas fa-phone fa-lg"></i> {t("CONTACT")}
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/cart" class="nav-link">
                      <i class="fas fa-shopping-cart fa-lg"></i>{" "}
                      {t("CART").toUpperCase()}
                    </Link>
                  </li>

                  {/* account dropdown */}
                  <li class="nav-item dropdown ml-1">
                    <a
                      class="nav-link dropdown-toggle"
                      href="/admin"
                      id="navbardrop"
                      data-toggle="dropdown"
                    >
                      <i class="fas fa-user fa-lg"></i>
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
                      <Link to="/favorites">
                        <a class="dropdown-item" href="/favorites">
                          <i class="fas fa-heart"></i> {t("Favorites")}
                        </a>
                      </Link>
                      <Link class="dropdown-item" onClick={handleLogout}>
                        <i class="fas fa-sign-out-alt fa-lg "></i> {t("LOGOUT")}
                      </Link>
                      {/* <a class="dropdown-item" onClick={handleLogout}><i class="fas fa-sign-out-alt" ></i> Sign Out</a>
      <a class="dropdown-item" href="/login"><i class="fas fa-sign-in-alt"></i> Log in</a>
      <a class="dropdown-item" href="/signup"><i class="fas fa-user-plus"></i> Sign up</a> */}
                    </div>
                  </li>

                  {/* <li class="nav-item">
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
