import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../system/Navbar";

// DASH
import Finance from "../logs/Finance";
import Legal from "../logs/Legal";
import Infotech from "../logs/IT";

import Team from "../team/components/TeamList";
import OrdersList from "./../supply/components/OrdersList";

import BusDev from "../busdev/BusDev";
import Philanthropy from "./../marketing/outbound/Philantropy";

const Capitalops = () => {
  const [showVentureOverview, setShowVentureOverview] = React.useState(true);

  const handleVentureOverview = () => {
    setShowVentureOverview(!showVentureOverview);
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className=" col-md-6 text-center">
            <button
              className="btn btn-outline-dark "
              onClick={handleVentureOverview}
            >
              {showVentureOverview ? "Hide" : "Show"} Venture Overview
            </button>
          </div>
        </div>
        <div className="row md-2 mt-5 mb-5 justify-content-center">
          {/* online shop */}

          <Link to="/hjxadmin">
            <button className="btn btn-warning mr-5">
              Ventures SuperAdmin
            </button>
          </Link>
          <Link to="/multinationalhq">
            {/* button oultine black */}
            <button className="btn btn-primary mr-5">
              Multinational Admin
            </button>
          </Link>

          <Link to="/shop">
            <button className="btn btn-success mr-5">Venture Client</button>
          </Link>
        </div>
        <div className="row md-2 mt-5 mb-5 justify-content-center">
          {/* online shop */}

          <Link to="/socossuperadmin">
            <button className="btn btn-warning mr-5">Socos SuperAdmin</button>
          </Link>
          <Link to="/socos">
            <button className="btn btn-primary mr-5">Socos Admin</button>
          </Link>
          <Link to="/socosclient">
            <button className="btn btn-success mr-5">Socos Client</button>
          </Link>
          {/* <Link to="/socoscom">
            <button className="btn btn-primary mr-5">
              Aggregate Shop Store Listing
            </button>
          </Link> */}
        </div>
        <div
          className={`container mb-5 collapse ${
            showVentureOverview ? "show" : ""
          }`}
        >
          {/* VENTURE OVERVIEW */}
          <div className="row justify-content-center">
            <div className="card col-md-6 text-center">
              <div className="card-header">
                <h3>Venture Overview </h3>
              </div>
              <div className="card-body">
                {/* table fro each header*/}
                {/* col-md-3 */}
                <div className="row justify-content-center ">
                  <div className="card col-md-3 text-center">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Finance (+2200)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <button className="btn btn-primary">Open</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="card col-md-3 text-center">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Metrics (90%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <button className="btn btn-primary">Open</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="card col-md-3 text-center">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Employees (4400)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <button className="btn btn-primary">Open</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* venture overview */}
            <div class="col-md-3 ">
              <div class="card mt-5 col">
                <div class="card-header">
                  Logs{" "}
                  <button class="btn btn-warning ml-5">
                    <i class="fas fa-plus" />
                  </button>
                </div>
                <div class="card-body">
                  Loggedin: 22/03/21 2:35am
                  <br></br>
                  Logged: Zahab Payment Processing
                </div>
              </div>
            </div>
          </div>

          {/* strategy board */}
          <div class="row justify-content-center mb-5">
            <div class="card mt-5 col-md-6">
              <div class="card-header">
                Mission Statement: Strategy Board{" "}
                <button class="btn btn-warning ml-5">
                  <i class="fas fa-edit" />
                </button>
              </div>
              <div class="card-body">
                Mission: Civil Development with Energy Solutions.
                <br></br>
                Strategy: Build a Brand + Offer Value at Sales to Build a Proud
                To Pay Model, then Scale Ops.
              </div>
            </div>
          </div>
        </div>
        <h1 class="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
          Capital Ops
        </h1>
        {/* dashboard finance on left, legal/it on right */}
        <div class="row ml-5 mr-5 justify-content-center text-center">
          <div class="col-6">
            <Finance />
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-12">
                <Legal />
              </div>
              <div class="col-12">
                <Infotech />
              </div>
            </div>
          </div>
        </div>
        {/* team, orders*/}
        <div class="row ml-5 mr-5 justify-content-center text-center">
          <div class="col-6">
            <OrdersList />
          </div>
          <div class="col-6">
            <Team />
          </div>
        </div>

        {/* busdev, philsnthropy  */}
        <div class="row ml-5 mr-5 justify-content-center text-center">
          <div class="col-6">
            <BusDev />
          </div>
          <div class="col-6">
            <Philanthropy />
          </div>
        </div>
      </div>
    </>
  );
};

export default Capitalops;
