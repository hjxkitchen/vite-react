import React, { Fragment, useContext } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Navbar from "../Navbar";
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

  return (
    <Fragment>
      <Navbar />
      <div className="container">
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
        <h1 className="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
          SOCOS ADMIN
        </h1>
        <div className="hidden lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
          <button className="w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg">
            Capital Ops
          </button>
          <button className="w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg">
            Products
          </button>
        </div>

        <h1 className="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
          SALES
        </h1>
        <div className="hidden lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
          <button className="w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg">
            POS / In-Store
          </button>
          <button className="w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg">
            Online Sales
          </button>
        </div>

        <div className="bg-gray-100 lg:hidden">
          <div className="h-screen flex flex-col justify-center items-center">
            <button className="w-4/5 h-1/4 mb-5 text-2xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg">
              Inventory / Shop List
            </button>
            <button className="w-4/5 h-1/4 mb-5 text-2xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg">
              Point of Sales
            </button>
            <button className="w-4/5 h-1/4 text-2xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg">
              Online Sales
            </button>
          </div>
        </div>

        {/* spacer */}
        <div className="row ml-3 mr-3 justify-content-center ">
          <div className="mb-3"></div>
        </div>

        {/* spacer */}
        <div className="row mt-5 mb-5"></div>
      </div>
    </Fragment>
  );
}

export default Admin;
