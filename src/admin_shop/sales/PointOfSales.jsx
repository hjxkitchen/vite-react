import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AddToSale from "./components/AddToSale";
import Navbar from "../../system/Navbar";
import AddSale from "./components/AddSale";
import SalesList from "./components/SalesList";
import axios from "axios";
import Cookies from "js-cookie";

import Select from "react-select";
import CreatableSelect from "react-select/creatable";
// import ViewSaleModal from "../../../components/admin/sales/ViewSaleModal";

import { UserContext } from "../../App";
// import { UserContext } from "../App"; role
import { ProdContext } from "../../App";

function Sales() {
  const [sales, setSales] = useState([]);
  const [customer, setCustomer] = useState({});
  const [orderTotal, setOrderTotal] = useState(0);
  const [showlogs, setShowLogs] = useState(false);
  const [isNewContact, setIsNewContact] = useState(false);

  const handleNameChange = (e) => {
    console.log("handleNameChange", e.target.value);
    setName(e.target.value);
  };

  const handleCreatableSelectChange = (newValue, actionMeta) => {
    if (actionMeta.action === "create-option") {
      // If the selected value is newly created, enable the Customer Name input
      setIsNewContact(true);
      setCustomerPhone(newValue.value);
    } else {
      // If an existing option is selected, disable the Customer Name input
      setIsNewContact(false);
      console.log("handleCreatableSelectChange", newValue);
      custPhoneChanged(newValue);
    }
    // Add your other logic here for handling CreatableSelect change
  };

  const [customerslist, setCustomersList] = useState([]);
  const user = useContext(UserContext);
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  // const user = useContext(UserContext); role
  const ProductNames = useContext(ProdContext);

  const showLogs = () => {
    if (showlogs) {
      setShowLogs(false);
    } else {
      setShowLogs(true);
    }
  };

  const [names, setNames] = useState([]);
  const [name, setName] = useState(null);

  const getNames = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      console.log("namesuseffect", response.data);
      setNames(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const customerphoneoptions = customerslist.map((onecustomer) => ({
    value: onecustomer.user_id,
    label: onecustomer.number,
  }));

  console.log("customerphoneoptions", customerphoneoptions);

  const [customerid, setCustomerid] = useState(null);

  const custPhoneChanged = async (newValue) => {
    console.log("custPhoneChanged", newValue.value);
    setCustomerid(newValue.value);

    // set customer phone
    // console.log("newvalue", newValue);
    setCustomerPhone(newValue.label);

    // const customer = {
    //     phone: e.value,
    // };
    console.log("names", names);

    const newcustomer = names.find((name) => name.user_id === newValue.value);

    console.log("newcustomer", newcustomer);
    setName(newcustomer.username);

    // set new customer phone
    setNewCustomer({ ...newcustomer, phone: newValue.value });

    // setCustomer(newcustomer);
    // console.log("custy:", newcustomer);
  };

  const getCustomersList = async () => {
    try {
      // const response = await fetch("http://localhost:000/users");

      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/phone",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      const jsonData = await response.data;
      console.log("customerslist", jsonData);
      setCustomersList(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCustomersList();
    getNames();
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

  const addNewContact = async (e) => {
    console.log(name, customerphone);

    // if any of the inputs are empty, return alert
    if (!name || !customerphone)
      return alert("Please fill all customer inputs");

    // create contact object
    let contact = { customer_name: name, customer_phone: customerphone };

    // post to server with axios
    axios
      .post(import.meta.env.VITE_API_URL + "/api/contact", contact, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      })
      .then((res) => {
        console.log(res.data, "res.data");
        // SET CUSTOMER ID
        // document.querySelector("input[name=customerID]").value = res.data.id;
        //
        // alert success
        alert("Customer added successfully");

        // get id from response
        // const id = res.data.id;

        // add to contacts state
        // setContacts([
        //   ...contacts,
        //   { id, customer_name, customer_phone, score: 0 },
        // ]);

        // set newcontact flase
        // setisNewContact(false);
        // setCreatedNewContact(true);
      })
      .catch((err) => {
        alert("Error adding customer");
      });
  };

  return (
    <Fragment>
      {/* <ViewSaleModal/> */}
      <Navbar />
      <div class="container p-5">
        <div class="row justify-content-center">
          <div class="col-6 ">
            <div class=" d-flex">
              <button class="btn btn-warning ml-5" onClick={showLogs}>
                Show Logs
              </button>
            </div>
          </div>

          {/* logs top right corner of screen */}
          {showlogs && (
            <div class="col-12 ml-5 ">
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
        <div class="row justify-content-center">
          <div class="col-6 ">
            <div class=" d-flex">
              <h1 class="text-center mt-5 ">
                Point of Sales
                <Link to="/tools">
                  <button class="btn btn-primary ml-5">Tools</button>
                </Link>
              </h1>
            </div>
          </div>
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
                customerid={customerid}
                customerphone={customerphone}
                name={name}
                isNewContact={isNewContact}
              />
            </div>
          </div>
        </div>

        {/* customer contact */}
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
            <div>
              <div>Customer Phone</div>

              <CreatableSelect
                class="collapse show"
                options={customerphoneoptions}
                onChange={handleCreatableSelectChange}
              />
            </div>
            <div>
              <div>Customer Name</div>

              {/* <CreatableSelect
                class="collapse show"
                options={customeroptions}
                onChange={(e) => {
                  custNameChanged(e);
                }}
              /> */}
              {isNewContact ? (
                <input
                  type="text"
                  class="form-control"
                  aria-label="Text input with checkbox"
                  value={name}
                  // onchange with value
                  onChange={(e) => {
                    handleNameChange(e);
                  }}
                />
              ) : (
                <input
                  type="text"
                  class="form-control"
                  aria-label="Text input with checkbox"
                  value={name}
                  disabled
                />
              )}
            </div>

            {/* newcontact and plus button */}
            {isNewContact && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  addNewContact();
                }}
              >
                Add New Contact
              </button>
            )}

            {/* notes div */}
            <div>
              <div>Notes</div>
              <textarea
                type="text"
                class="form-control"
                aria-label="Text input with checkbox"
                rows={4}
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
