import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AddToSale from "./components/AddToSale";
import Navbar from "../../../../system/Navbar";
import AddSale from "./components/AddSale";
import SalesList from "./components/SalesList";

import Select from "react-select";
import CreatableSelect from "react-select/creatable";
// import ViewSaleModal from "../../../components/admin/sales/ViewSaleModal";

import { UserContext } from "../../../../App";
// import { UserContext } from "../App"; role
import { ProdContext } from "../../../../App";

function Sales() {
  const [sales, setSales] = useState([]);
  const [customer, setCustomer] = useState({});
  const [orderTotal, setOrderTotal] = useState(0);
  const [showlogs, setShowLogs] = useState(false);

  const [customerslist, setCustomersList] = useState([]);
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

  const [byname, setByName] = useState(false);
  const [byphone, setByPhone] = useState(true);

  const byName = () => {
    if (byname) {
      setByName(false);
      setByPhone(true);
    } else {
      setByName(true);
      setByPhone(false);
    }
  };

  const byPhone = () => {
    if (byphone) {
      setByPhone(false);
      setByName(true);
    } else {
      setByPhone(true);
      setByName(false);
    }
  };

  // remove from customerlist whre customer.phone is null or udplicate
  const filteredCustomers = customerslist.filter(
    (customer) => customer.phone !== null
  );
  const uniqueCustomers = filteredCustomers.filter(
    (customer, index, self) =>
      index === self.findIndex((t) => t.phone === customer.phone)
  );

  const customerphoneoptions = uniqueCustomers.map((onecustomer) => {
    return {
      value: onecustomer.phone,
      label: onecustomer.phone,
    };
  });

  const [customername, setCustomerName] = useState("");

  const custPhoneChanged = async (e) => {
    console.log("custPhoneChanged", e.value);

    // set customer phone
    // const customer = {
    //     phone: e.value,
    // };

    // set new customer phone
    setNewCustomer({ ...newcustomer, phone: e.value });

    setCustomer(newcustomer);
    console.log("custy:", newcustomer);

    // find and set customer name from customerslist with phone
    try {
      const customer = customerslist.find(
        (customer) => customer.phone === e.value
      );
      console.log("customer", customer.name);
      setCustomerName(customer.name);
      setCustomer((customer.user_name = customer.name));
      // set customer name
    } catch (error) {
      console.log("error;", error.message);
      setByName(true);
    }
  };

  const getCustomersList = async () => {
    try {
      // const response = await fetch("http://localhost:000/users");

      const response = await axios.get(import.meta.env.VITE_API_URL + "user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      });

      const jsonData = await response.json();
      setCustomersList(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCustomersList();
  }, []);

  const customeroptions = customerslist.map((onecustomer) => {
    return {
      value: onecustomer.name,
      label: onecustomer.name,
    };
  });

  const [customerphone, setCustomerPhone] = useState();

  const custNameChanged = async (e) => {
    console.log("custNameChanged", e.value);

    // // new customer object
    // const customer = {
    //     customer_name: e.value,
    // };
    // set newcustomer customer_name
    setNewCustomer({ ...newcustomer, customer_name: e.value });

    setCustomer(newcustomer);

    console.log("custy:", newcustomer);
    // set customer
    console.log("evalue", e.value, customer);

    // get customer phone
    try {
      // const response = await fetch(
      //   `http://localhost:000/user/phone/${e.value}`
      // );
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "user/" + e.value,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      const jsonData = await response.json();
      console.log(jsonData);
      setCustomerPhone(jsonData[0].phone);
      setCustomer((customer.phone = jsonData[0].phone));
    } catch (error) {
      console.log(error.message);
    }

    // setCustomerPhone(555);
    console.log("customer", customer);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
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

        <div class="row mt-5 justify-content-center">
          <div class="col-6">
            <div class="input-group mb-3 mt-4">
              <div class="input-group-append">
                <div class="input-group-text">
                  <input
                    type="checkbox"
                    aria-label="Checkbox for following text input"
                  />
                </div>
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Text input with checkbox"
                value="Delivery"
              />
            </div>

            <div>Customer Name</div>
            {byphone === true && (
              <CreatableSelect
                class="collapse show"
                options={customeroptions}
                onChange={(e) => {
                  custNameChanged(e);
                }}
              />
            )}
            {byphone !== true && (
              // input text
              <input
                type="text"
                name="customer_name"
                className="form-control"
                // value={customername}
                onChange={handleChange}
              />
            )}
            <button onClick={byName}>By Name</button>

            <div>Customer Phone</div>
            {byphone === true && (
              <CreatableSelect
                class="collapse show"
                options={customerphoneoptions}
                onChange={(e) => {
                  custPhoneChanged(e);
                }}
              />
            )}
            {byphone !== true && (
              <input
                type="text"
                name="phone"
                className="form-control"
                // value={customerphone}
                onChange={handleChange}
              />
            )}

            <button onClick={byPhone}>By Phone</button>
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
