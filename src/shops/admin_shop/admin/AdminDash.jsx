import React, { Fragment, useContext } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Navbar from "./../Navbar";
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
    <>
      <Navbar />

      <div className="container">
        <div className="row md-2 mt-5 justify-content-center">
          {/* online shop */}
          <a href="/venturecom">
            <button className="btn btn-outline-dark mr-5">
              Individual Online Client Shop Listing
            </button>
          </a>
          <Link to="/socoscom">
            {/* button oultine black */}
            <button className="btn btn-primary mr-5">
              Aggregate Shop Store Listing
            </button>
          </Link>
        </div>
        <div className="row md-2 mt-5 justify-content-center">
          {/* online shop */}
          <Link to="/hjxadmin">
            <button className="btn btn-outline-dark mr-5">Venture Admin</button>
          </Link>
          <Link to="/multinationalhq">
            {/* button oultine black */}
            <button className="btn btn-primary mr-5">Multinational HQ</button>
          </Link>
          <Link to="/locationbranchhq">
            {/* button oultine black */}
            <button className="btn btn-primary mr-5">Location Branch HQ</button>
          </Link>
        </div>

        {/* desktop buttons */}
        <h1 className="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
          LOCATION HQ {t("welcome")}
        </h1>
        <div className="hidden lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
          <Link
            to="/capitalops"
            className="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Capital Ops
          </Link>
          <Link
            to="/recruiting"
            className="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Recruiting
          </Link>
          <Link
            to="/employees"
            className="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Employees
          </Link>
        </div>
        <h1 className="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
          Products
        </h1>
        <div className="hidden lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
          <Link
            to="/suppliers"
            className=" flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Suppliers
          </Link>
          <Link
            to="/products"
            className="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Products
          </Link>
          <Link
            to="/procurement"
            className="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Procurement
          </Link>
        </div>
        <div className="hidden lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
          {/* <Link
            to="/procurement"
            className="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Goods Received
          </Link> */}
          <Link
            to="/inventory"
            className="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Inventory
          </Link>
          <Link
            to="/shoplist"
            className="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Shop List
          </Link>
        </div>
        <h1 className="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
          SALES
        </h1>
        <div className="hidden lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
          <Link
            to="/pointofsales"
            className="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            POS / Sales
          </Link>
          <Link
            to="/onlinesales"
            className="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Online Sales
          </Link>
          <Link
            to="/allsales"
            className="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Fulfillment
          </Link>
        </div>
        <h1 className="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
          MARKETING
        </h1>
        <div className="hidden lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
          <Link
            to="/outboundadmin"
            className="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Marketing Out APIs
          </Link>
          <Link
            to="/inboundadmin"
            className="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Marketing In APIs
          </Link>
          <Link
            to="/outboundadmin"
            className="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Marketing Campaigns
          </Link>
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

        {/* aggregate shop store */}

        {/* spacer */}
        <div className="row ml-3 mr-3 justify-content-center ">
          <div className="mb-3"></div>
        </div>

        {/* spacer */}
        <div className="row mt-5 mb-5"></div>
      </div>
    </>
  );
}

export default Admin;
