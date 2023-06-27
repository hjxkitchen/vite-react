import React, { Fragment, useContext } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Navbar from "../Navbar";
import Navbar2 from "../../system/Navbar";
import Footer from "../../system/Footer";
// import OrdersList from "../../components/admin/fulfillment/orders/OrdersList";
// import SalesList from "../../components/admin/sales/SalesList";
// import SuppliersList from "../../components/admin/suppliers/SuppliersList";
// import UsersList from "../../components/admin/users/UsersList";
// import ProductsList from "../../components/admin/products/ProductsList";

import { useTranslation } from "react-i18next";

function Admin() {
  // const user = useContext(UserContext);
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }
  const { t } = useTranslation();

  return (
    <Fragment>
      <Navbar />
      {/* <Navbar2 /> */}

      <div className="container">
        <div className="row md-2 mt-5 justify-content-center">
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
        <div className="row md-2 mt-5 justify-content-center">
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
          <Link to="/locationbranchhq">
            {/* button oultine black */}
            <button className="btn btn-primary mr-5">Location Admin</button>
          </Link>
          <Link to="/shop">
            <button className="btn btn-success mr-5">Venture Client</button>
          </Link>
        </div>

        {/* desktop buttons */}
        <h1
          class="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black"
          id="admin"
        >
          LOCATION HQ <h1>{t("welcome")}</h1>
        </h1>
        <div class="hidden lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
          <Link
            to="/capitalops"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Capital Ops
          </Link>
          {/* <Link
            to="/recruiting"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Recruiting
          </Link>
          <Link
            to="/employees"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Employees
          </Link> */}
        </div>
        <h1 class="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
          Products
        </h1>
        <div class="hidden lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
          <Link
            to="/suppliers"
            class=" flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Suppliers
          </Link>
          <Link
            to="/products"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Products
          </Link>
          <Link
            to="/procurement"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Procurement
          </Link>
        </div>
        <div class="hidden lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
          {/* <Link
            to="/procurement"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Goods Received
          </Link> */}
          <Link
            to="/inventory"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Inventory
          </Link>
          <Link
            to="/shoplist"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Shop List
          </Link>
        </div>
        <h1 class="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
          SALES
        </h1>
        <div class="hidden lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
          <Link
            to="/pointofsales"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            POS / Sales
          </Link>
          <Link
            to="/onlinesales"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Online Sales
          </Link>
          <Link
            to="/allsales"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Fulfillment
          </Link>
        </div>
        <h1 class="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
          MARKETING
        </h1>
        <div class="hidden lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
          <Link
            to="/outboundadmin"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Marketing Out APIs
          </Link>
          <Link
            to="/inboundadmin"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Marketing In APIs
          </Link>
          <Link
            to="/outboundadmin"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Marketing Campaigns
          </Link>
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

        {/* aggregate shop store */}

        {/* spacer */}
        <div class="row ml-3 mr-3 justify-content-center ">
          <div className="mb-3"></div>
        </div>

        {/* spacer */}
        <div class="row mt-5 mb-5"></div>
      </div>

      <Footer />
    </Fragment>
  );
}

export default Admin;
