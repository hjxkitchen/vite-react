import React, { Fragment, useContext } from "react";
import Navbar from "../../../../system/Navbar";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../App";
// import OrdersList from "../admin/orders/OrdersList";
import DeliveriesList from "./components/DeliveryJobsList";

function Contact() {
  const user = useContext(UserContext);

  return (
    <Fragment>
      <Navbar />

      {/* buttons */}
      <div class="container mt-5 mb-5">
        {/* technician jobs table */}

        <div class="row ml-5 mr-5 mb-3 justify-content-center">
          <h1 class="text-center"> Delivery Jobs</h1>

          <button className="btn btn-success ml-5 mt-3">Add Job</button>
        </div>

        {/* Delivery jobs */}
        <div class="table-responsive mt-5">
          <div class="row justify-content-center">
            <div class="col-md-9">
              <DeliveriesList />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Contact;
