import React, { Fragment, useContext } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Navbar from "../../system/Navbar";
import Footer from "../../system/Footer";
import { useTranslation } from "react-i18next";

function Admin() {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Navbar />

      <div className="container">
        <h1 className="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
          LOCATION HQ <h1>{t("welcome")}</h1>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          <Link
            to="/shoplist"
            className="flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg py-6 text-3xl font-bold text-center"
          >
            Shop Products List
          </Link>
          <Link
            to="/pointofsales"
            className="flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg py-6 text-3xl font-bold text-center"
          >
            POS
          </Link>
          <Link
            to="/onlinesales"
            className="flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg py-6 text-3xl font-bold text-center"
          >
            Sales List
          </Link>
          <Link
            to="/pointofsales"
            className="flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg py-6 text-3xl font-bold text-center"
          >
            Jobs
          </Link>
        </div>

        <h1 className="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
          Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          <Link
            to="/suppliers"
            className="flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg py-6 text-3xl font-bold text-center"
          >
            Suppliers, Products, Orders
          </Link>
          <Link
            to="/products"
            className="flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg py-6 text-3xl font-bold text-center"
          >
            Warehousing
          </Link>
          <Link
            to="/products"
            className="flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg py-6 text-3xl font-bold text-center"
          >
            Team
          </Link>
        </div>

        <h1 className="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
          MARKETING
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          <Link
            to="/outboundadmin"
            className="flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg py-6 text-3xl font-bold text-center"
          >
            Campaigns
          </Link>
        </div>

        <h1 className="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
          ADMIN
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          <Link
            to="/capitalops"
            className="flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg py-6 text-3xl font-bold text-center"
          >
            Admin
          </Link>
        </div>

        <div className="row mt-5 mb-5"></div>
      </div>

      <Footer />
    </Fragment>
  );
}

export default Admin;
