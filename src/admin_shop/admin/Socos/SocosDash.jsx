import React, { Fragment, useContext } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Navbar from "../../Navbar";
// import OrdersList from "../../components/admin/fulfillment/orders/OrdersList";
// import SalesList from "../../components/admin/sales/SalesList";
// import SuppliersList from "../../components/admin/suppliers/SuppliersList";
// import UsersList from "../../components/admin/users/UsersList";
// import ProductsList from "../../components/admin/products/ProductsList";

function Admin() {
  // const user = useContext(UserContext);
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  const [showVentureOverview, setShowVentureOverview] = React.useState(false);

  const handleVentureOverview = () => {
    setShowVentureOverview(!showVentureOverview);
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <button className="btn btn-warning" onClick={handleVentureOverview}>
          Show Venture Overview
        </button>
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

        {/* BUTTONS */}
        <div className="row md-2 mt-5 justify-content-center">
          {/* online shop */}
          <a href="http://localhost:3000">
            <button className="btn btn-outline-dark mr-5">
              Individual Online Client Shop Listing
            </button>
          </a>
          <Link to="https://localhost:3000">
            {/* button oultine black */}
            <button className="btn btn-primary mr-5">
              Aggregate Shop Store Listing
            </button>
          </Link>
        </div>

        {/* desktop buttons */}
        <h1 class="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
          SOCOS ADMIN
        </h1>
        <div class="hidden lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
          <button class="w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg">
            Capital Ops
          </button>
          <button class="w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg">
            Products
          </button>
        </div>

        <h1 class="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
          SALES
        </h1>
        <div class="hidden lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
          <button class="w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg">
            POS / In-Store
          </button>
          <button class="w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg">
            Online Sales
          </button>
        </div>

        <div class="bg-gray-100 lg:hidden">
          <div class="h-screen flex flex-col justify-center items-center">
            <button class="w-4/5 h-1/4 mb-5 text-2xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg">
              Inventory / Shop List
            </button>
            <button class="w-4/5 h-1/4 mb-5 text-2xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg">
              Point of Sales
            </button>
            <button class="w-4/5 h-1/4 text-2xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg">
              Online Sales
            </button>
          </div>
        </div>

        {/* spacer */}
        <div class="row ml-3 mr-3 justify-content-center ">
          <div className="mb-3"></div>
        </div>

        {/* spacer */}
        <div class="row mt-5 mb-5"></div>
      </div>
    </Fragment>
  );
}

export default Admin;
