import React, { Fragment, useEffect, useState, useContext } from "react";
// import AddToSale from "../../../components/admin/sales/AddToSale";
import Navbar from "../Navbar";
// import AddSale from "../../../components/admin/sales/pos/AddSale";
import SalesList from "./components/SalesList";
// import ViewSaleModal from "../../../components/admin/sales/ViewSaleModal";

// import { UserContext } from "../../../index";
// import { UserContext } from "../../../index"; role
// import { ProdContext } from "../../../index";

function Sales() {
  const [sales, setSales] = useState([]);
  const [customer, setCustomer] = useState({});
  const [orderTotal, setOrderTotal] = useState(0);
  // const user = useContext(UserContext);
  // const user = useContext(UserContext); role
  // const ProductNames = useContext(ProdContext);

  return (
    <Fragment>
      {/* <ViewSaleModal/> */}
      <Navbar />
      <div class="container">
        <h1 class="text-center mt-5 mb-5">All Sales List </h1>

        <div class="container mb-5 collapse show" id="List">
          {/* <div class="row justify-content-center mb-5" > */}
          {/* <div class="col-md-6 mb-5"> */}
          <table class="table table-responsive">
            <SalesList />
          </table>
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </Fragment>
  );
}

export default Sales;
