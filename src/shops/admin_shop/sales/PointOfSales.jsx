import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AddToSale from "./components/AddToSale";
import Navbar from "../Navbar";
import AddSale from "./components/AddSale";
import SalesList from "./components/SalesList";
// import ViewSaleModal from "../../../components//ViewSaleModal";

// import { UserContext } from "../../../../index";
// import { UserContext } from "../../../index"; role
// import { ProdContext } from "../../../../index";

function Sales() {
  const [sales, setSales] = useState([]);
  const [customer, setCustomer] = useState({});
  const [orderTotal, setOrderTotal] = useState(0);
  const [showlogs, setShowLogs] = useState(false);
  // const user = useContext(UserContext);
  // const user = useContext(UserContext); role
  // const ProductNames = useContext(ProdContext);
  const ProductNames = { 1: 3 };

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
      <div className="container">
        <div className="row justify-content-center">
          <div className="col ">
            <div className=" d-flex">
              <h1 className="text-center mt-5 ">
                Point of Sales
                <Link to="/tools">
                  <button className="btn btn-primary ml-5">Tools</button>
                </Link>
                <button className="btn btn-warning ml-5" onClick={showLogs}>
                  Show Logs
                </button>
              </h1>
            </div>
          </div>

          {/* logs top right corner of screen */}
          {showlogs && (
            <div className="col ml-5 ">
              <div className="card mt-5 col">
                <div className="card-header">
                  Logs{" "}
                  <button className="btn btn-warning ml-5">
                    <i className="fas fa-plus" />
                  </button>
                  <button className=" ml-5 btn btn-danger">IT </button>
                  <button className=" ml-2 btn btn-success">Finance</button>
                  <button className=" ml-2 btn btn-info">Legal </button>
                </div>
                <div className="card-body">
                  Loggedin: 22/03/21 8:35am
                  <br></br>
                  Sale Initialized: 22/03/21 9:35am
                </div>
              </div>
            </div>
          )}
          {/* </div> */}
        </div>

        <div className=" collapse show " id="POS">
          <div className="row justify-content-center ">
            {/* <div className="col-md-2"> */}
            <div className="col-md-5 justify-content-center">
              <AddToSale
                prodnames={ProductNames}
                setSales={setSales}
                sales={sales}
                setCustomer={setCustomer}
                customer={customer}
              />
            </div>
            <div className="col-md-7 justify-content-center">
              <AddSale
                setSales={setSales}
                sales={sales}
                setOrderTotal={setOrderTotal}
                customer={customer}
              />
            </div>
          </div>
        </div>

        <h1 className="text-center mt-5 mb-5">Sales List </h1>

        <div className="table-responsive">
          <div className="mb-5 collapse show" id="List">
            <div className="row justify-content-center mb-5 ">
              <div className="col-md-10 mb-5">
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
