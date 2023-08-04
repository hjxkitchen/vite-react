import React, { Fragment, useContext, useEffect, useState } from "react";
import Navbar from "../../system/Navbar";
// import PublicNavbar from "../PublicNavbar";
import { UserContext } from "../../App";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import ViewOrderItems from "./components/ViewOrderItems";
import ReceiveOrder from "./components/ReceiveOrder";
// import AddJobModal from "./components/AddJobModal";
import Cookies from "js-cookie";

function Calculators() {
  const user = useContext(UserContext);
  const [orderLogs, setOrderLogs] = React.useState([]);
  const [inputs, setInputs] = React.useState({});
  const [order, setOrders] = React.useState([]);
  const [customer, setCustomer] = React.useState({});

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  const location = useLocation();
  // const { orderdata } = location.state;
  // console.log("orderdata", location.state.order.order_id);

  // get order id from url eg. /orderlogs/1
  const { order_id } = useParams();
  console.log("order_id", order_id);

  // const url = "http://localhost:000/order/" + location.state.order.order_id;

  // const getorders = async () => {
  //   console.log("utl", url);
  //   const result = await axios.get(url);
  //   console.log("ressssss", result.data[0]);
  //   setOrders(result.data[0]);
  // };

  const getorders = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL +
          "/api/order/" +
          order_id +
          "?include=product",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      console.log("res", response.data);
      setOrders(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getOrderLogs = async () => {
    console.log("res is", order.order_id);
    const res = await axios.get(
      import.meta.env.VITE_API_URL +
        "/api/order/" +
        order_id +
        "?include=orderlog",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );
    // if not an array, make it an array
    if (!Array.isArray(res.data.orderlogs)) {
      res.data.orderlogs = [res.data.orderlogs];
      console.log("res is not array", res.data.orderlogs);
      setOrderLogs(res.data.orderlogs);
    }
    console.log("res is orderlogs", res.data.orderlogs);
    setOrderLogs(res.data.orderlogs);
  };

  const getCustomer = async () => {
    // const url = "http://localhost:000/user/" + location.state.order.user_id;
    // const res = await axios.get(url);
    // const res = await axios.get(
    //   import.meta.env.VITE_APP_API_URL + "/api/user/" + orderdata.user_id,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "x-api-key": import.meta.env.VITE_APP_API_KEY,
    //     },
    //   }
    // );
    // console.log("res", res.data);
    // setCustomer(res.data[0]);
  };

  useEffect(() => {
    if (order.length === 0) {
      getorders();
    }
    getOrderLogs();
    getCustomer();
  }, [order]);

  // useEffect(() => {
  //   try {

  //     getOrderLogs();
  //   } catch (error) {

  //   }
  // }, []);

  // hnadlechange with inputs and name
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitLog = async (e) => {
    // console.log("orderLogs", inputs.orderlog);
    const data = inputs.orderlog;
    e.preventDefault();
    const res5 = await axios.post(
      import.meta.env.VITE_API_URL + "/api/orderlog",
      {
        order_id: order.order_id,
        log_data: data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    // console.log("res is", res);
    // getOrderLogs();
    // get order
    // setOrderLogs(result.data);

    // window.location.href = "/orderlogs";
    window.location.reload();
  };

  const initstatus = order.order_status;
  const [status, setStatus] = React.useState(initstatus);
  console.log("status", status);

  const handleStatusChange = async (e) => {
    // console.log("res issad", e.target.value);
    setStatus(e.target.value);
    e.preventDefault();
    // const res = await axios.put("http://localhost:000/orders/"+ order.order_id, {status: inputs.status});
    // getOrderLogs();
    // window.location.href = "/orderlogs";
    // window.location.reload();
  };

  const submitStatus = async (e) => {
    // console.log("orderLogs", inputs.orderlog);
    e.preventDefault();
    console.log(status);

    // update status
    // const res = await axios.put(
    //   "http://localhost:000/orders/status/" + order.order_id,
    //   {
    //     status: status,
    //   }
    // );

    // const res = await axios.put(
    //   import.meta.env.VITE_APP_API_URL + "/api/order/" + orderdata.order_id,
    //   {
    //     status: status,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "x-api-key": import.meta.env.VITE_APP_API_KEY,
    //     },
    //   }
    // );

    // console.log("res is", res);

    // const url = "http://localhost:000/order/" + order.order_id;
    // console.log(url);
    // const result = await axios.get(url);
    // console.log("ressssss", result.data[0].order_status);
    // setStatus(result.data[0].order_status);

    const res1 = await axios.get(
      import.meta.env.VITE_APP_API_URL +
        "/api/order/" +
        order.order_id +
        "?include=product",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_APP_API_KEY,
        },
      }
    );

    // getOrderLogs();
    // window.location.href = "/orderlogs";
    // getOrderLogs();
    alert("Status Updated");

    // // insert into logs
    const res2 = await axios.post(
      import.meta.env.VITE_APP_API_URL + "/api/orderlog",
      {
        order_id: order.order_id,
        orderlog: "Status Updated to " + status + " by " + user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_APP_API_KEY,
        },
      }
    );

    // const res2 = await axios.post("http://localhost:000/orderlogs", {
    //   order_id: order.order_id,
    //   orderlog: "Status Updated to " + status + " by " + user,
    // });
    window.location.reload();
  };

  const [editContact, setEditContact] = React.useState(false);

  const handleEditContact = () => {
    if (editContact) {
      setEditContact(false);
    } else {
      setEditContact(true);
    }
  };

  const addJob = async (e) => {
    e.preventDefault();
  };

  const [showVentureOverview, setShowVentureOverview] = React.useState(false);

  const handleVentureOverview = () => {
    setShowVentureOverview(!showVentureOverview);
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <div class="row justify-content-center">
          <h1 class="text-center mt-5">OrderLogs: Order {order.order_id}</h1>
        </div>

        <div class="row justify-content-center">
          <div class="d-flex col-md-3 justify-content-center mt-4">
            <input
              type="text"
              class="form-control text-center"
              value={order.status}
              disabled
            />
          </div>
        </div>

        {/* collapse show button */}
        <div class="container">
          <div class="row justify-content-center mt-4">
            <div class="col-md-2">
              <button
                class="btn btn-warning btn-block"
                type="button"
                data-toggle="collapse"
                data-target="#orderDetails"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                View Order Details
              </button>
            </div>
          </div>
        </div>

        {/* order details */}
        <div class="collapse" id="orderDetails">
          <div class="row justify-content-center" id="orderDetails">
            <div class="col-3">
              <div class="row ml-5 mr-5 justify-content-center mt-4">
                <div class="my-auto">
                  <p class="text-center ">
                    Order Id: {order.order_id}
                    <br></br>
                    Order Date: {order.createdAt?.split("T")[0]}
                    <br></br>
                    Order Status: {order.status}
                    <br></br>
                    Order Total: {order.total_amount}
                    <br></br>
                    Customer Id: {order.user_id}
                  </p>
                </div>
              </div>

              <div class="row ml-5 mr-5 justify-content-center mt-4">
                <div class=" my-auto">
                  <ViewOrderItems order={order} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* end add log form */}
        {/* <div class="row justify-content-center">
            <div class="col-6">
                <table class="table table-responsive">

                    <thead> 
                        <tr>
                            <th>Log ID</th>
                            <th>Log</th>
                            <th>Log Date</th>
                            <th>Edit</th>
                            <th>Delete</th> */}

        {/* orderlog table */}
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-0 mt-5">
              <table class="table table-responsive">
                <thead>
                  <tr>
                    {/* <th>OrderLog ID</th> */}
                    <th>OrderLog Date</th>
                    <th>OrderLog Data</th>
                  </tr>
                </thead>
                <tbody>
                  {orderLogs.map((orderLog) => (
                    <tr key={orderLog.orderlog_id}>
                      {/* <td>{orderLog.orderlog_id}</td> */}
                      <td>
                        {/* get only date from createdAt */}
                        {orderLog.createdAt.substring(0, 10)}
                      </td>
                      <td>{orderLog.log_data}</td>
                    </tr>
                  ))}
                  <ReceiveOrder order={order} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Calculators;
