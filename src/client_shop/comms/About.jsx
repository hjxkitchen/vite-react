import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import PublicNavbar from "../PublicNavbar";
import { UserContext } from "../../App";

function Calculators() {
  const user = useContext(UserContext);
  return (
    <Fragment>
      {user && <Navbar />}
      {!user && <PublicNavbar />}
      <div className="container">
        <h1 class="text-center mt-4">About Zahab</h1>
        {/* stickers */}

        {/* row col 2 btns link calc blog*/}
        <div class="row justify-content-center mt-2 ">
          <div class="col-md-3 mt-2 w-75">
            <Link
              to="/calculators"
              class="btn btn-primary btn-lg btn-block"
              role="button"
              aria-pressed="true"
            >
              Calculators
            </Link>
          </div>
          <div class="col-md-3 mt-2 w-75">
            <Link
              to="/blog"
              class="btn btn-primary btn-lg btn-block"
              role="button"
              aria-pressed="true"
            >
              Blog / Resources
            </Link>
          </div>
          {/* <div class="col-md-3 mt-2 w-75">
            <Link
              to="/blog"
              class="btn btn-primary btn-lg btn-block"
              role="button"
              aria-pressed="true"
            >
              Resources
            </Link>
          </div> */}
        </div>
      </div>

      {/* // insert image zahabshoppic from public */}
      <div class="container mt-4 mb-5">
        {/* card */}
        <div class="card mb-4">
          <div class="d-md-flex mb-5 mt-2">
            <div class="col ">
              <img
                src="/zahabshoppic.jpeg"
                class="img-fluid"
                alt="Responsive image"
              />
            </div>
            <div class="col mt-3">
              {/* info about the business */}
              <h5 class="text-center">
                Zahab is a business that cares.
                <br></br>
                <br></br>
                We sell Home, Office, and Specialty Energy Solutions.
                <br></br>
                <br></br>
                We are located in the heart of the city of Arusha, Tanzania.
                <br></br>
                <br></br>
                We have been in business for around 10 years now and we are
                proud to say that we have ammassed a loyal customer base who
                trust us to provide quality goods and services with excellent
                customer service.
                <br></br>
                <br></br>
                We are always looking for new ways to improve our products and
                services.
                <br></br>
                <br></br>
                Our main goal is to make our community and country better,
                healthier, happier, and richer.
              </h5>
              {/* stndard, quality icons */}
              <div class="row justify-content-center  mt-5">
                <div class="col-0 mt-2">
                  {/* font awesome business icons */}
                  <i class="ml-1 fas fa-award fa-3x"></i>
                  <i class="ml-1 fas fa-certificate fa-3x"></i>
                  <i class="ml-1 fas fa-balance-scale fa-3x"></i>
                  <i class="ml-1 fas fa-business-time fa-3x"></i>
                  <i class="ml-1 fas fa-bullhorn fa-3x"></i>
                  <i class="ml-1 fas fa-bullseye fa-3x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Calculators;
