import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../system/Navbar";
// import Navbar2 from "../../system/Navbar";
// import PublicNavbar from "../PublicNavbar";
import { UserContext } from "../../../App";
import ShopList from "./SocosShopList";
import axios from "axios";
import Cookies from "js-cookie";

function Shop() {
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  const user = useContext(UserContext);
  return (
    <Fragment>
      {/* navbar conditionaly rendered */}
      {/* {user && <Navbar />} */}

      <Navbar />
      {/* <Navbar2 /> */}

      <div class="container justify-content-center mt-5">
        <div class="row ml-5 mr-5 mb-3 justify-content-center">
          <h1 class="text-center">Shop Products</h1>
        </div>
        <div class="row ml-5 mr-5 mb-3 justify-content-center">
          <h2 style={{ "text-align": "center" }}>
            The Best New Quality Products
          </h2>
        </div>
        <div class="row ml-5 mr-5 justify-content-center">
          <p class="text-center">Weve got you covered with High Quality!</p>
        </div>
        {/* <div class="row ml-5 mr-5 mt-3 mb-5 justify-content-center">
            <Link to="/packages"><button type="button" class="btn btn-outline-dark mr-2">Packages</button></Link>
          </div> */}
      </div>

      <div class="container mb-5">
        <ShopList token={token} />
      </div>
    </Fragment>
  );
}

export default Shop;
