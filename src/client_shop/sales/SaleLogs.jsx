import React, { Fragment, useContext, useEffect, useState } from "react";
import Navbar from "../../system/Navbar";
// import PublicNavbar from "../PublicNavbar";
import { UserContext } from "../../App";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import ViewSaleItems from "./ViewSaleItems";
// import AddJobModal from "./components/AddJobModal";
import Cookies from "js-cookie";

function Calculators() {
  const user = useContext(UserContext);
  const [saleLogs, setSaleLogs] = React.useState([]);
  const [inputs, setInputs] = React.useState({});
  const [sale, setSales] = React.useState([]);
  const [customer, setCustomer] = React.useState({});

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

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
    // const url = "http://localhost:000/user/" + location.state.sale.user_id;
    // const res = await axios.get(url);
    // const res = await axios.get(
    //   import.meta.env.VITE_APP_API_URL + "/api/user/" + saledata.user_id,
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

    const res1 = await axios.get(
      import.meta.env.VITE_APP_API_URL + "/api/sale/" + sale.sale_id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_APP_API_KEY,
        },
      }
    );

    // getSaleLogs();
    // window.location.href = "/salelogs";
    // getSaleLogs();
    alert("Status Updated");

    // // insert into logs
    const res2 = await axios.post(
      import.meta.env.VITE_APP_API_URL + "/api/salelog",
      {
        sale_id: sale.sale_id,
        salelog: "Status Updated to " + status + " by " + user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_APP_API_KEY,
        },
      }
    );

    // const res2 = await axios.post("http://localhost:000/salelogs", {
    //   sale_id: sale.sale_id,
    //   salelog: "Status Updated to " + status + " by " + user,
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
          <h1 class="text-center mt-5">SaleLogs: Order {sale.sale_id}</h1>
        </div>

        <div class="row justify-content-center">
          <div class="d-flex col-md-3 justify-content-center mt-4">
            <input
              type="text"
              class="form-control text-center"
              value={sale.status}
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
