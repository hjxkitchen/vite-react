import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
// import AddToOrder from "admin/orders/AddToOrder";
import Navbar from "../../system/Navbar";
// import AddOrder from "admin/orders/AddOrder";
import OrdersList from "./components/ReceiveOrdersList";
// import DataTable from "react-data-table-component";
import jwt_decode from "jwt-decode";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [orderslist, setOrdersList] = useState([]);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  const role_id = jwt_decode(token).role_id;

  //get products function defeined
  const getOrders = async () => {
    try {
      // const response = await fetch("http://localhost:000/orderslist");
      // const jsonData = await response.json();
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "orderslist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      setOrdersList(jsonData);
      // console.log(products);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // columns
  const columns = [
    {
      name: "Order ID",
      selector: "order_id",
      sortable: true,
    },
    {
      name: "Order Date",
      selector: "order_date",
      sortable: true,
    },
    {
      name: "Order Status",
      selector: "order_status",
      sortable: true,
    },
    {
      name: "Order Total",
      selector: "order_total",
      sortable: true,
    },
    {
      name: "Supplier Name",
      selector: "name",
      sortable: true,
    },
  ];

  const data = orderslist;

  return (
    <Fragment>
      <Navbar />
      <div class="container">
        {/* suppliers button */}{" "}
        {role_id === 1 ? (
          <div class="d-flex justify-content-center ">
            <Link to="/suppliers">
              <div className="btn btn-primary mt-5 mr-3">Suppliers</div>
            </Link>
          </div>
        ) : (
          ""
        )}
        <div class="row justify-content-center">
          <div class="col">
            <h1 class="text-center mt-5">Orders</h1>
          </div>
        </div>
        {role_id === 1 ? (
          <div class="row justify-content-center">
            <Link to="/orderpos">
              <button class="btn btn-success mt-5">Add Order</button>
            </Link>
          </div>
        ) : (
          ""
        )}
        <div class="container  mb-5 mt-5 collapse show" id="List">
          {/* <div class="row justify-content-center mb-5"> */}
          {/* <div class="col-md-10 mb-5"> */}
          <OrdersList />
          {/* <DataTable columns={columns} data={data} /> */}

          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </Fragment>
  );
}

export default Orders;
