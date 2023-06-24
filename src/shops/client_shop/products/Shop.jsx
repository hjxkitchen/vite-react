import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import PublicNavbar from "../../PublicNavbar";
import { UserContext, TokenContext } from "../../../index";
import ShopList from "../../../components/shop/ShopList";
import axios from "axios";

function Shop() {
  const token = useContext(TokenContext);
  const user = useContext(UserContext);
  return (
    <Fragment>
      {/* navbar conditionaly rendered */}
      {user && <Navbar />}
      {!user && <PublicNavbar />}

      <div className="container justify-content-center mt-5">
        <div className="row ml-5 mr-5 mb-3 justify-content-center">
          <h1 className="text-center">Shop Products</h1>
        </div>
        <div className="row ml-5 mr-5 mb-3 justify-content-center">
          <h2 style={{ "text-align": "center" }}>
            The Best New Quality Products
          </h2>
        </div>
        <div className="row ml-5 mr-5 justify-content-center">
          <p className="text-center">Weve got you covered with High Quality!</p>
        </div>
        {/* <div className="row ml-5 mr-5 mt-3 mb-5 justify-content-center">
            <Link to="/packages"><button type="button" className="btn btn-outline-dark mr-2">Packages</button></Link>
          </div> */}
      </div>

      <div className="container mb-5">
        <ShopList token={token} />
      </div>
    </Fragment>
  );
}

export default Shop;
