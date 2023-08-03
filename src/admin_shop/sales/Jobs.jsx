import React, { Fragment, useContext } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Navbar from "../../system/Navbar";
import Footer from "../../system/Navbar";
import { useTranslation } from "react-i18next";

function Admin() {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Navbar />

      <div className="container">
        <h1 className="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
          LOCATION DEPTS <h1>{t("JOBS")}</h1>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          <Link
            to="/shoplist"
            className="flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg py-6 text-3xl font-bold text-center"
          >
            Warehouse
          </Link>
          <Link
            to="/pointofsales"
            className="flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg py-6 text-3xl font-bold text-center"
          >
            Technicians
          </Link>
          <Link
            to="/allsales"
            className="flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg py-6 text-3xl font-bold text-center"
          >
            Delivery
          </Link>
        </div>

        <div className="row mt-5 mb-5"></div>
      </div>

      <Footer />
    </Fragment>
  );
}

export default Admin;
