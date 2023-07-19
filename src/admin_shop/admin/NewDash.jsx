import React, { Fragment, useContext } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Navbar from "../../system/Navbar";
// import Navbar2 from "../../system/Navbar";
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
        {/* desktop buttons */}
        <h1
          class="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black"
          id="admin"
        >
          LOCATION HQ <h1>{t("welcome")}</h1>
        </h1>
        <div class=" lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
          <Link
            to="/shoplist"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Shop Products List
          </Link>
          <Link
            to="/pointofsales"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            POS
          </Link>

          <Link
            to="/onlinesales"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Sales List
          </Link>
          <Link
            to="/pointofsales"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Jobs
          </Link>
        </div>

        <h1 class="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
          Products
        </h1>
        <div class=" lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
          <Link
            to="/suppliers"
            class=" flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Suppliers, Products, Orders
          </Link>
          <Link
            to="/products"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Warehousing
          </Link>
          <Link
            to="/products"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Team
          </Link>
        </div>

        <h1 class="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
          MARKETING
        </h1>
        <div class=" lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
          <Link
            to="/outboundadmin"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Campaigns
          </Link>
        </div>

        <h1
          class="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black"
          id="admin"
        >
          ADMIN
        </h1>
        <div class=" lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
          <Link
            to="/capitalops"
            class="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Admin
          </Link>
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