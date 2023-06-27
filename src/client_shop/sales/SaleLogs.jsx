import React, { Fragment, useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import PublicNavbar from "../PublicNavbar";
import { UserContext } from "./../../App";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import ViewSaleItems from "./ViewSaleItems";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function Calculators() {
  const user = useContext(UserContext);
  const [saleLogs, setSaleLogs] = React.useState([]);
  const [inputs, setInputs] = React.useState({});
  const [sale, setSales] = React.useState([]);
  const [customer, setCustomer] = React.useState({});
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  const location = useLocation();
  const { saledata } = location.state;
  console.log("saledata", location.state.sale.sale_id);

  // const url = "http://localhost:000/sale/" + location.state.sale.sale_id;

  const getsales = async () => {
    console.log("utl", url);
    // const result = await axios.get(url);
    const result = await axios.get(
      import.meta.env.VITE_API_URL + "/sale/" + location.state.sale.sale_id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );
    console.log("ressssss", result.data[0]);
    setSales(result.data[0]);
  };

  const getSaleLogs = async () => {
    console.log("res is", sale.sale_id);
    // const url = "http://localhost:000/salelogs/" + location.state.sale.sale_id;
    // console.log(url);
    // const res = await axios.get(url);
    await axios.get(
      import.meta.env.VITE_API_URL + "/salelogs/" + location.state.sale.sale_id
    ),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }.then((res) => {
        console.log("res is", res.data);
      });
    setSaleLogs(res.data);
  };

  const getCustomer = async () => {
    // const url = "http://localhost:000/user/" + location.state.sale.user_id;
    // const res = await axios.get(url);
    const res = await axios.get(
      import.meta.env.VITE_API_URL + "/user/" + location.state.sale.user_id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );
    console.log("res", res.data);
    setCustomer(res.data[0]);
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
    // const res = await axios.post("http://localhost:000/salelogs", {
    //   sale_id: sale.sale_id,
    //   salelog: data,
    // });

    const res = await axios.post(
      import.meta.env.VITE_API_URL + "/salelogs",
      {
        sale_id: sale.sale_id,
        salelog: data,
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
    const res = await axios.put(
      import.meta.env.VITE_API_URL + "/sales/" + sale.sale_id,
      { status: e.target.value },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );
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
    const res = await axios.put(
      import.meta.env.VITE_API_URL + "/sales/status/" + sale.sale_id,
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

    console.log("res is", res);

    // const url = "http://localhost:000/sale/" + sale.sale_id;
    // console.log(url);
    // const result = await axios.get(url);
    const result = await axios.get(
      import.meta.env.VITE_API_URL + "/sale/" + sale.sale_id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    console.log("ressssss", result.data[0].sale_status);
    setStatus(result.data[0].sale_status);

    // getSaleLogs();
    // window.location.href = "/salelogs";
    // getSaleLogs();
    alert("Status Updated");

    // insert into logs
    // const res2 = await axios.post("http://localhost:000/salelogs", {
    //   sale_id: sale.sale_id,
    //   salelog: "Status Updated to " + status + " by " + user,
    // });
    const res2 = await axios.post(
      import.meta.env.VITE_API_URL + "/salelogs",
      {
        sale_id: sale.sale_id,
        salelog: "Status Updated to " + status + " by " + user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );
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

  return (
    <Fragment>
      {user && <Navbar />}
      {!user && <PublicNavbar />}
      <div className="container">
        {/* header */}
        <div class="row justify-content-center">
          <h1 class="text-center mt-5">SaleLogs: Order {sale.sale_id}</h1>
        </div>

        {/* seelct */}
        <div class="row justify-content-center">
          <div class="d-flex col-md-3 justify-content-center mt-4">
            {/* <div class=" my-auto"> */}
            <input
              class="form-control text-center"
              value={sale.sale_status}
              disabled
            ></input>
            {/* select input */}
            {/* <select
              class="form-control"
              name="salelog"
              onChange={handleStatusChange}
              disabled
              defaultValue={sale.sale_status}
            >
              <option value={sale.sale_status}>{sale.sale_status}</option>
              <option value="initialized">Initialized</option>
              <option value="delivered">Delivered</option>
            </select> */}
            {/* submit button */}

            {/* </div> */}
          </div>
        </div>

        {/* sale details */}
        <div class="row justify-content-center" id="saleDetails">
          <div class="col-3">
            <div class="row ml-5 mr-5 justify-content-center mt-4">
              <div class="my-auto">
                <p class="text-center ">
                  Sale Id: {sale.sale_id}
                  <br></br>
                  Sale Date: {sale.sale_date}
                  <br></br>
                  Sale Status: {sale.sale_status}
                  <br></br>
                  Sale Total: {sale.sale_total}
                  <br></br>
                  Customer Id: {sale.user_id}
                </p>
              </div>
            </div>

            <div class="row ml-5 mr-5 justify-content-center mt-4">
              <div class=" my-auto">
                <ViewSaleItems sale={location.state.sale} />
              </div>
            </div>
          </div>
          <div class="col-3">
            {!editContact && (
              <div class="row justify-content-center mt-4 mr-5">
                <div class=" my-auto">
                  {/* name, email, phone input form */}
                  <form onSubmit={submitLog}>
                    <div class="form-group input-group">
                      <input
                        type="text"
                        class="form-control"
                        name="name"
                        defaultValue={customer.name}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                    <div class="form-group input-group">
                      <input
                        type="text"
                        class="form-control"
                        name="phone"
                        defaultValue={customer.phone}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                    <div class="form-group input-group">
                      <input
                        type="text"
                        class="form-control"
                        name="email"
                        defaultValue={customer.email}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                  </form>
                </div>
              </div>
            )}

            {editContact && (
              <div class="row justify-content-center mt-4 ">
                <div class=" my-auto">
                  {/* name, email, phone input form */}
                  <form onSubmit={submitLog}>
                    <div class="form-group input-group">
                      {customer && (
                        <input
                          type="text"
                          class="form-control"
                          name="name"
                          value={customer.name}
                          onChange={handleChange}
                          disabled
                        />
                      )}
                      <div class="input-group-append">
                        <button class="btn btn-warning" type="button">
                          Edit/Add
                        </button>
                      </div>
                    </div>
                    <div class="form-group input-group">
                      {customer && (
                        <input
                          type="text"
                          class="form-control"
                          name="phone"
                          value={customer.phone}
                          onChange={handleChange}
                          disabled
                        />
                      )}
                      <div class="input-group-append">
                        <button class="btn btn-warning" type="button">
                          Edit/Add
                        </button>
                        {/*  */}
                      </div>
                    </div>
                    <div class="form-group input-group">
                      {customer && (
                        <input
                          type="text"
                          class="form-control"
                          name="email"
                          value={customer.email}
                          onChange={handleChange}
                          disabled
                        />
                      )}
                      <div class="input-group-append">
                        <button class="btn btn-warning" type="button">
                          Edit/Add
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

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
                      <td>{saleLog.log_date}</td>
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
