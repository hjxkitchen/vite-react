import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AddToSale from "./components/AddToSale";
import Navbar from "../../../../system/Navbar";
import AddSale from "./components/AddSale";
import SalesList from "./components/SalesList";
// import ViewSaleModal from "../../../components/admin/sales/ViewSaleModal";

import { UserContext } from "../../../../App";
// import { UserContext } from "../App"; role
import { ProdContext } from "../../../../App";

function Sales() {
  const [sales, setSales] = useState([]);
  const [customer, setCustomer] = useState({});
  const [orderTotal, setOrderTotal] = useState(0);
  const [showlogs, setShowLogs] = useState(false);
  const user = useContext(UserContext);
  // const user = useContext(UserContext); role
  const ProductNames = useContext(ProdContext);

  const showLogs = () => {
    if (showlogs) {
      setShowLogs(false);
    } else {
      setShowLogs(true);
    }
  };

  return (
    <Fragment>
      {/* <ViewSaleModal/> */}
      <Navbar />
      <div class="container p-5">
        <div class="row justify-content-center">
          <div class="col ">
            <div class=" d-flex">
              <h1 class="text-center mt-5 ">
                Point of Sales
                <Link to="/tools">
                  <button class="btn btn-primary ml-5">Tools</button>
                </Link>
                <button class="btn btn-warning ml-5" onClick={showLogs}>
                  Show Logs
                </button>
              </h1>
            </div>
          </div>

          {/* logs top right corner of screen */}
          {showlogs && (
            <div class="col ml-5 ">
              <div class="card mt-5 col">
                <div class="card-header">
                  Logs{" "}
                  <button class="btn btn-warning ml-5">
                    <i class="fas fa-plus" />
                  </button>
                  <button class=" ml-5 btn btn-danger">IT </button>
                  <button class=" ml-2 btn btn-success">Finance</button>
                  <button class=" ml-2 btn btn-info">Legal </button>
                </div>
                <div class="card-body">
                  Loggedin: 22/03/21 8:35am
                  <br></br>
                  Sale Initialized: 22/03/21 9:35am
                </div>
              </div>
            </div>
          )}
          {/* </div> */}
        </div>

        <div class=" collapse show " id="POS">
          <div class="row justify-content-center ">
            {/* <div class="col-md-2"> */}
            <div class="col-md-5 justify-content-center">
              <AddToSale
                prodnames={ProductNames}
                setSales={setSales}
                sales={sales}
                setCustomer={setCustomer}
                customer={customer}
              />
            </div>
            <div class="col-md-7 justify-content-center">
              <AddSale
                setSales={setSales}
                sales={sales}
                setOrderTotal={setOrderTotal}
                customer={customer}
              />
            </div>
          </div>
        </div>

        <h1 class="text-center mt-5 mb-5">Sales List </h1>

        <div class="table-responsive">
          <div class="mb-5 collapse show" id="List">
            <div class="row justify-content-center mb-5 ">
              <div class="col-md-10 mb-5">
                <SalesList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Sales;
