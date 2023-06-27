import React, { Fragment, useEffect, useState } from "react";
// import AddToOrder from "admin/orders/AddToOrder";
import Navbar from "../Navbar";
// import AddOrder from "admin/orders/AddOrder";
import OrdersList from "./components/OrdersList";
// import DataTable from "react-data-table-component";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [orderslist, setOrdersList] = useState([]);

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
        <div class="row justify-content-center">
          <div class="col-md-10">
            <h1 class="text-center mt-5">Orders</h1>
          </div>
          <div class="container  mb-5 mt-5 collapse show" id="List">
            {/* <div class="row justify-content-center mb-5"> */}
            {/* <div class="col-md-10 mb-5"> */}
            <OrdersList />
            {/* <DataTable columns={columns} data={data} /> */}

            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Orders;
