import React, { Fragment, useEffect, useState } from "react";
import SaleList from "./AddSale";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const AddToSale = ({ prodnames, sales, setSales, setCustomer, customer }) => {
  const [inputs, setInputs] = useState({});
  const [array, setArray] = useState([]);
  const [customerslist, setCustomersList] = useState([]);
  const [newcustomer, setNewCustomer] = useState({});

  const getCustomersList = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
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
      const response = await fetch(
        `http://localhost:5000/user/phone/${e.value}`
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

  setSales(array);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // const handleCustChange = (event) => {
  //     const name = event.target.name;
  //     const value = event.target.value;
  //     setCustomer(values => ({...values, [name]: value}))
  // }

  // submit function
  const onSubmitForm = async (e) => {
    e.preventDefault();
    // array.push(inputs);
    console.log(inputs);

    if (inputs.product_id && inputs.quantity > 0 && inputs.price > 0) {
      // if description already exists, update quantity and price
      let found = false;
      for (let i = 0; i < array.length; i++) {
        if (array[i].product_id === inputs.product_id) {
          // change quantity with set array
          setArray(
            array.map((item, index) => {
              if (index === i) {
                return {
                  ...item,
                  quantity: parseInt(item.quantity) + parseInt(inputs.quantity),
                  // cost: parseInt(item.price) + parseInt(inputs.price)
                };
              }
              return item;
            })
          );
          found = true;
          break;
        }
      }

      // if description does not exist, add to array
      if (!found) {
        setArray((array) => [...array, inputs]);
      }
    }

    setSales(array);
    console.log(sales);
  };

  const options = prodnames.map((prodname) => {
    return {
      value: prodname.product_id,
      label: prodname.product_name,
    };
  });

  const [defaultprice, setDefaultPrice] = useState(0);

  const changedd = (e) => {
    setInputs((values) => ({ ...values, product_id: e.value }));

    // set default price
    const defaultprice = prodnames.find(
      (prodname) => prodname.product_id === e.value
    );
    console.log("defaultprice", defaultprice.price);
    setDefaultPrice(defaultprice.price);

    // set inputs price
    setInputs((values) => ({ ...values, price: defaultprice.price }));
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

  // form
  return (
    <Fragment>
      <div className="d-flex mt-3 justify-content-center">
        <div className="d-flex w-75 justify-content-center">
          <form className="" onSubmit={onSubmitForm}>
            {/* 1st input */}
            <div>Product</div>
            {/* 
                        <input 
                            type="text" 
                            name="product_id"
                            className="form-control" 
                            value={inputs.description} 
                            onChange={handleChange} 
                            /> */}

            <Select options={options} onChange={changedd} />

            {/* </label>                                     */}

            {/* 2nd */}
            <div class="d-flex">
              <label class="mt-3">
                Quantity
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  step="1"
                  className="form-control"
                  value={inputs.inventory}
                  onChange={handleChange}
                />
              </label>

              {/* 3rd */}
              <label class="mt-3">
                Price (K Tshs)
                <div class="d-flex">
                  <input
                    type="number"
                    name="price"
                    min="1"
                    step="1"
                    className="form-control"
                    // value={inputs.price}
                    value={defaultprice}
                    onChange={handleChange}
                  />
                  <button class="btn btn-warning">Edit</button>
                </div>
              </label>
            </div>

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

            <div class="row">
              <div class="col mt-4">
                <button className="btn btn-success" onClick={onSubmitForm()}>
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <SaleList props={array}/> */}
    </Fragment>
  );
};

// export {array};
export default AddToSale;
