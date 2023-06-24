import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Navbar from "../Navbar";

function UsersList() {
  return (
    <Fragment>
      <Navbar />
      <div className="container mb-5">
        <div className="row justify-content-center ">
          <div className="col-md-9">
            <h1 className="text-center mt-5">Financials</h1>
          </div>
        </div>

        {/* Finance section */}
        <div className="row ml-5 mr-5 mt-5 justify-content-center">
          <h1 className="text-center">3 Finance statements and more</h1>
        </div>
        {/* Income statement table */}
        <div className="row ml-5 mr-5 justify-content-center text-center">
          <div className="table-responsive mt-5">
            Income statement
            <table className="table " style={{ maxHeight: "375px" }}>
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Revenue</th>
                  <th scope="col">Expenses</th>
                  <th scope="col">Profit</th>
                  <th scope="col">Operating Expenses</th>
                  <th scope="col">Net Income</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1/1/2020</th>
                  <td>$100</td>
                  <td>$50</td>
                  <td>$50</td>
                  <td>$50</td>
                  <td>$50</td>
                </tr>
                <tr>
                  <th scope="row">1/1/2020</th>
                  <td>$100</td>
                  <td>$50</td>
                  <td>$50</td>
                  <td>$50</td>
                  <td>$50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* cashflow table */}
        <div className="row ml-5 mr-5  mt-5 justify-content-center text-center">
          <div className="table-responsive">
            Cash Flow Statement
            <table className="table " style={{ maxHeight: "375px" }}>
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Net Income</th>
                  <th scope="col">Cash In</th>
                  <th scope="col">Cash Out</th>
                  <th scope="col">Net Cash Flow</th>
                  <th scope="col">Ending Cash Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1/1/2020</th>
                  <td>$100</td>
                  <td>$50</td>
                  <td>$50</td>
                  <td>$50</td>
                  <td>$50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* balance sheet table */}
        <div
          className="row ml-5 mr-5  mt-5 justify-content-center text-center"
          id="balancesheet"
        >
          <div className="table-responsive">
            Balance Sheet
            <table className="table" style={{ maxHeight: "375px" }}>
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Cash Balance</th>
                  <th scope="col">Assets</th>
                  <th scope="col">Liabilities</th>
                  <th scope="col">Equity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1/1/2020</th>
                  <td>$100</td>
                  <td>$50</td>
                  <td>$50</td>
                  <td>$50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h1 className="text-5xl font-bold tracking-wider uppercase text-center py-4 mt-8 border-b-4 border-black">
          ANALYSIS
        </h1>
        <div className="hidden lg:flex lg:justify-center lg:items-center bg-gray-100 h-64 flex justify-center items-center ">
          <Link
            to="#"
            className="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            Basic Analysis
          </Link>
          <Link
            to="#"
            className="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 mr-5 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            DCF
          </Link>
          <Link
            to="#"
            className="flex justify-center items-center w-4/5 h-3/5 md:w-1/3 md:h-1/2 lg:w-1/4 lg:h-3/5 text-3xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          >
            M&A
          </Link>
        </div>
      </div>

      {/* </div> */}
    </Fragment>
  );
}

export default UsersList;
