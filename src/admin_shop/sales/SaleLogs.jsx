import React, { Fragment, useContext, useEffect, useState } from "react";
import Navbar from "../../system/Navbar";
// import PublicNavbar from "../PublicNavbar";
// import { UserContext } from "../../App";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import ViewSaleItems from "./components/ViewSaleItems";
import AddJobModal from "./components/AddJobModal";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

function Calculators() {
  const [saleLogs, setSaleLogs] = React.useState([]);
  const [inputs, setInputs] = React.useState({});
  const [sale, setSales] = React.useState([]);
  const [customer, setCustomer] = React.useState({});

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  const user = jwt_decode(token).username;
  const role_id = jwt_decode(token).role_id;

  const location = useLocation();
  // const { saledata } = location.state;
  // console.log("saledata", location.state.sale.sale_id);

  // get sale id from url eg. /salelogs/1
  const { sale_id } = useParams();
  console.log("sale_id", sale_id);

  // const url = "http://localhost:000/sale/" + location.state.sale.sale_id;

  // const getsales = async () => {
  //   console.log("utl", url);
  //   const result = await axios.get(url);
  //   console.log("ressssss", result.data[0]);
  //   setSales(result.data[0]);
  // };

  const getsales = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/sale/" + sale_id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      console.log("res", response.data);
      setSales(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSaleLogs = async () => {
    console.log("res is", sale.sale_id);
    const res = await axios.get(
      import.meta.env.VITE_API_URL +
        "/api/sale/" +
        sale_id +
        "?include=salelog",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );
    // if not an array, make it an array
    if (!Array.isArray(res.data.salelogs)) {
      res.data.salelogs = [res.data.salelogs];
      console.log("res is not array", res.data.salelogs);
      setSaleLogs(res.data.salelogs);
    }
    console.log("res is salelogs", res.data.salelogs);
    setSaleLogs(res.data.salelogs);
  };

  const getCustomer = async () => {
    console.log("sale.user_id", sale.user_id);
    // const url = "http://localhost:000/user/" + location.state.sale.user_id;
    // const res = await axios.get(url);
    const res = await axios.get(
      import.meta.env.VITE_API_URL +
        "/api/user/" +
        sale.user_id +
        "?include=phone,email,name",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );
    console.log("contacts res", res.data);
    setCustomer(res.data);
  };

  useEffect(() => {
    if (sale.length === 0) {
      getsales();
    }
    getSaleLogs();
    getCustomer();
  }, [sale]);

  // useEffect(() => {
  //   try {

  //     getSaleLogs();
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
    // console.log("saleLogs", inputs.salelog);
    const data = inputs.salelog;
    e.preventDefault();
    const res5 = await axios.post(
      import.meta.env.VITE_API_URL + "/api/salelog",
      {
        sale_id: sale.sale_id,
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
    // getSaleLogs();
    // get sale
    // setSaleLogs(result.data);

    // window.location.href = "/salelogs";
    window.location.reload();
  };

  const initstatus = sale.sale_status;
  const [status, setStatus] = React.useState(initstatus);
  console.log("status", status);

  const handleStatusChange = async (e) => {
    // console.log("res issad", e.target.value);
    setStatus(e.target.value);
    e.preventDefault();
    // const res = await axios.put("http://localhost:000/sales/"+ sale.sale_id, {status: inputs.status});
    // getSaleLogs();
    // window.location.href = "/salelogs";
    // window.location.reload();
  };

  const submitStatus = async (e) => {
    // console.log("saleLogs", inputs.salelog);
    e.preventDefault();
    console.log(status);

    // if status is not changed, return
    if (status === sale.status) {
      alert("Status not changed");
      return;
    }

    // UPDATE SALE STATUS IN SALE TABLE
    const res = await axios.put(
      import.meta.env.VITE_API_URL + "/api/sale/" + sale.sale_id,
      {
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    // update status
    // const res = await axios.put(
    //   "http://localhost:000/sales/status/" + sale.sale_id,
    //   {
    //     status: status,
    //   }
    // );

    // const res = await axios.put(
    //   import.meta.env.VITE_APP_API_URL + "/api/order/" + saledata.order_id,
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

    // const url = "http://localhost:000/sale/" + sale.sale_id;
    // console.log(url);
    // const result = await axios.get(url);
    // console.log("ressssss", result.data[0].sale_status);
    // setStatus(result.data[0].sale_status);

    // const res1 = await axios.get(
    //   import.meta.env.VITE_API_URL + "/api/sale/" + sale.sale_id,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "x-api-key": import.meta.env.VITE_API_KEY,
    //     },
    //   }
    // );

    // getSaleLogs();
    // window.location.href = "/salelogs";
    // getSaleLogs();

    // // insert into logs
    const res2 = await axios.post(
      import.meta.env.VITE_API_URL + "/api/salelog",
      {
        sale_id: sale.sale_id,
        log_data: "Status Updated to " + status + " by " + user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    alert("Status Updated");

    // const res2 = await axios.post("http://localhost:000/salelogs", {
    //   sale_id: sale.sale_id,
    //   salelog: "Status Updated to " + status + " by " + user,
    // });

    // if role_id is 6, redirect to /
    if (role_id === 6) {
      window.location.href = "/";
    } else {
      window.location.reload();
    }
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

  // ANCHOR NAME JOIN
  // get all email property from each customer.emails array
  const email = customer.emails;
  console.log("email", email);
  // get all values from email array and seperate by comma
  const emailsr =
    customer.emails && customer.emails.map((email) => email.email);
  console.log("emails", emailsr);

  // ANCHOR NAME JOIN
  // get all phone property from each customer.phones array
  const [phones, setPhone] = React.useState([]);
  // console.log("phone", phone);
  // get all values from phone array and seperate by comma
  // const phones = phone && phone.map((phone) => phone.number).join(", ");
  // get all values from phone array and put in array
  const phonesr =
    customer.phones && customer.phones.map((phone) => phone.number);
  console.log("phones", phonesr);

  const statusOptions = [
    "initialized",
    "paid",
    "prepped",
    "shipped",
    "delivered",
    "completed",
    "cancelled",
  ];

  const currentStatusIndex =
    sale.status &&
    statusOptions.findIndex(
      (option) => option.toLowerCase() === sale.status.toLowerCase()
    );

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        {/* <div className="row justify-content-center">
          <div className=" col-md-6 text-center">
            <button
              className="btn btn-outline-dark "
              onClick={handleVentureOverview}
            >
              Show Venture Overview
            </button>
          </div>
        </div> */}
        <div
          className={`container mb-5 collapse ${
            showVentureOverview ? "show" : ""
          }`}
        >
          <div class="row justify-content-center mb-5">
            {/* logs */}
            <div class="col-md-5 ">
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
                  Loggedin: 22/03/21 2:35am
                  <br></br>
                  Logged: Zahab Payment Processing
                </div>
              </div>
            </div>

            {/* strategy board */}
            <div class="card mt-5 col-md-6">
              <div class="card-header">Mission Statement: Strategy Board </div>
              <div class="card-body">
                Mission: Civil Development with Energy Solutions.
                <br></br>
                Strategy: Build a Brand + Offer Value at Sales to Build a Proud
                To Pay Model, then Scale Ops.
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-center">
          <h1 class="text-center mt-5">SaleLogs: Order {sale.sale_id}</h1>
        </div>

        <div class="row justify-content-center">
          <div class="d-flex col-md-3 justify-content-center mt-4">
            {/* <div class=" my-auto"> */}
            {/* select input */}
            {/* <select
              class="form-control"
              name="salelog"
              onChange={handleStatusChange}
              defaultValue={sale.status}
            >
              <option value={sale.status}>{sale.status}</option>
              <option value="initialized">Initialized</option>
              <option value="paid">Paid</option>
              <option value="prepped">Prepped</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select> */}
            <select
              class="form-control"
              name="salelog"
              onChange={handleStatusChange}
              defaultValue={sale.status}
            >
              {statusOptions
                .slice(currentStatusIndex, currentStatusIndex + 2) // Get options ahead of the current status
                .map((status, index) => (
                  <option key={index} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
                    {/* Capitalize the first letter */}
                  </option>
                ))}
            </select>
            {/* submit button */}
            <button
              class="btn btn-primary"
              type="submit"
              onClick={submitStatus}
            >
              Submit
            </button>
            {/* </div> */}
            {/* button to add technician, delivery jobs */}
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
                data-target="#saleDetails"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                View Sale Details
              </button>
            </div>
          </div>
        </div>

        {/* sale details */}
        <div class="collapse" id="saleDetails">
          <div class="row justify-content-center" id="saleDetails">
            <div class="col-3">
              <div class="row ml-5 mr-5 justify-content-center mt-4">
                <div class="my-auto">
                  <p class="text-center ">
                    Sale Id: {sale.sale_id}
                    <br></br>
                    Sale Date: {sale.createdAt?.split("T")[0]}
                    <br></br>
                    Sale Status: {sale.status}
                    <br></br>
                    Sale Total: {sale.total_amount}
                    <br></br>
                    Customer Id: {sale.user_id}
                  </p>
                </div>
              </div>

              <div class="row ml-5 mr-5 justify-content-center mt-4">
                <div class=" my-auto">
                  <ViewSaleItems sale_id={sale_id} />
                </div>
              </div>
            </div>
            <div class="col-3">
              <div class="row justify-content-center mt-4 ">
                <div class=" my-auto">
                  {/* name, email, phone input form */}
                  <form onSubmit={submitLog}>
                    <div className="form-group input-group">
                      <div className="inline-flex items-center mb-2 mt-3">
                        {"Name: "}
                        <span className="inline-block bg-gray-300 text-gray-800 rounded-full py-1 px-3 whitespace-no-wrap overflow-x-auto">
                          <input
                            type="text"
                            className="bg-transparent border-none focus:outline-none"
                            name="name"
                            value={`${customer?.name?.name} `}
                            disabled
                          />
                        </span>
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded ml-2"
                          onClick={() => {
                            setEditContact(true);
                          }}
                        >
                          <i className="fas fa-edit" />
                        </button>
                      </div>
                    </div>

                    {/* Show phones with edit button for each */}
                    <div class="form-group input-group">
                      <div className="flex overflow-x-auto">
                        {"Phones: "}
                        {phonesr?.map((phone) => (
                          <div className="flex items-center mb-2 mr-2">
                            <span className="bg-gray-300 text-gray-800 rounded-full py-1 px-3 whitespace-no-wrap">
                              {phone}
                            </span>
                            <button
                              className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded ml-2"
                              onClick={() => {
                                setEditContact(true);
                              }}
                            >
                              <i className="fas fa-edit" />
                            </button>
                          </div>
                        ))}
                        {/* plus button */}
                        <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded ml-2 mb-2">
                          <i className="fas fa-plus" />
                        </button>
                      </div>
                    </div>

                    <div class="form-group input-group">
                      <div className="flex overflow-x-auto">
                        {"Emails: "}
                        {emailsr?.map((email) => (
                          <div className="flex items-center mb-2 mr-2">
                            <span className="bg-gray-300 text-gray-800 rounded-full py-1 px-3 whitespace-no-wrap">
                              {email}
                            </span>
                            <button
                              className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded ml-2"
                              onClick={() => {
                                setEditContact(true);
                              }}
                            >
                              <i className="fas fa-edit" />
                            </button>
                          </div>
                        ))}
                        {/* plus button */}
                        <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded ml-2 mb-2">
                          <i className="fas fa-plus" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* add log input */}
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6 ">
              <form>
                <div class="form-group text-center mt-5">
                  <label for="log">Log</label>
                  <input
                    type="text"
                    class="form-control"
                    name="salelog"
                    onChange={handleChange}
                    id="log"
                    placeholder="Enter log"
                  />

                  {/* row of buttons */}
                  <button
                    type="submit"
                    onClick={submitLog}
                    class="btn btn-primary mt-4"
                  >
                    Submit
                  </button>

                  {/* <div class="d-flex mt-5 justify-content-center ">
                    <AddJobModal />
                  </div> */}
                </div>
              </form>
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

        {/* salelog table */}
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-0 mt-5">
              <table class="table table-responsive">
                <thead>
                  <tr>
                    {/* <th>SaleLog ID</th> */}
                    <th>SaleLog Date</th>
                    <th>SaleLog Data</th>
                  </tr>
                </thead>
                <tbody>
                  {saleLogs.map((saleLog) => (
                    <tr key={saleLog.salelog_id}>
                      {/* <td>{saleLog.salelog_id}</td> */}
                      <td>
                        {/* get only date from createdAt */}
                        {saleLog.createdAt.substring(0, 10)}
                      </td>
                      <td>{saleLog.log_data}</td>
                    </tr>
                  ))}
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
