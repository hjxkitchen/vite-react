import React, { Fragment, useEffect, useState } from "react";
// import SaleList from "./AddSale";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import Cookies from "js-cookie";

const AddToSale = ({ prodnames, sales, setSales, setCustomer, customer }) => {
  const [inputs, setInputs] = useState({});
  const [array, setArray] = useState([]);
  const [newcustomer, setNewCustomer] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);
  const [inventory, setInventory] = useState(0);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  // setSales(array);

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

  const onSubmitForm = async (e) => {
    e.preventDefault();
    // Assuming you have some form data with product_id, quantity, and price
    // const formData = {
    //   product_id: 1,
    //   quantity: 3,
    //   price: 100,
    // };

    // get values from selectedValue and defaultprice
    const formData = {
      product_id: selectedValue.value,
      price: defaultprice,
      quantity: document.getElementsByName("quantity")[0].value,
    };

    // console.log("formData2", formData2);

    // const formData = inputs;

    const existingProductIndex = sales.findIndex(
      (product) => product.product_id === formData.product_id
    );

    if (existingProductIndex !== -1) {
      // If the product exists, update its quantity
      setSales((prevSales) => {
        const updatedSales = [...prevSales];
        updatedSales[existingProductIndex] = {
          ...updatedSales[existingProductIndex],
          quantity:
            parseInt(updatedSales[existingProductIndex].quantity) +
            parseInt(formData.quantity),
        };
        return updatedSales;
      });
    } else {
      // If the product does not exist, add a new entry to the sales array
      setSales((prevSales) => [...prevSales, formData]);
    }
  };

  const options = prodnames.map((prodname) => {
    return {
      value: prodname.product_id,
      label:
        // prodname.size + " - " + prodname.model + " - " +
        prodname.product_name,
    };
  });

  const discountchanged = (e) => {
    // subtract discount from price
    // const discount = (e.target.value / 100) * defaultprice;
    const discount = e.target.value;
    const newprice = defaultprice - discount;
    setInputs((values) => ({ ...values, price: newprice }));
  };

  const [defaultprice, setDefaultPrice] = useState(0);

  const [pid, setPID] = useState(0);

  const changedd = async (e) => {
    // set selected value
    setSelectedValue(e);

    console.log("e", e.value);

    setInputs((values) => ({ ...values, product_id: e.value }));

    // get price from product_id
    const defaultprice = await axios.get(
      import.meta.env.VITE_API_URL +
        "/api/product/" +
        e.value +
        "?attributes=price",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    console.log("defaultprice", defaultprice.data);
    setDefaultPrice(defaultprice.data.price);

    // set html qiamtity to 1
    setInputs((values) => ({ ...values, quantity: 1 }));

    // set inputs price
    setInputs((values) => ({ ...values, price: defaultprice.data.price }));
    console.log("inputs", inputs);

    // get inventory
    const inventory = await axios.get(
      import.meta.env.VITE_API_URL + "/inventory/" + e.value,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );
    // set inventory to sum of quantities
    if (inventory.data.length > 0) {
      const sum = inventory.data.reduce((a, b) => a + b.quantity, 0);
      setInventory(sum);
    } else {
      setInventory(0);
    }

    // setInventory(inventory.data.length);
    console.log("inventory", inventory);
  };

  // Debounce function to delay execution
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Your handleBarcodeChange function with debounce
  const handleBarcodeChange = async (e) => {
    // Your existing code here if needed before the delay

    // filter from prodnames where barcode = e.target.value
    const filtered = prodnames.filter(
      (prodname) => prodname.barcode === e.target.value
    );

    console.log("filtered", filtered);

    // if filtered is empty, focus on barcode input and return
    if (filtered.length === 0) {
      // clear barcode input
      document.getElementsByName("barcode")[0].value = "";
      document.getElementsByName("barcode")[0].focus();
      return;
    }

    // make an object with value as filtered[0].product_id and label as filtered[0].product_name
    const obj = {
      value: filtered[0].product_id,
      label: filtered[0].product_name,
    };

    // set selected value
    setSelectedValue(obj);

    // setdefaultprice
    setDefaultPrice(filtered[0].price);

    // set inputs.product_id
    setInputs((values) => ({ ...values, product_id: filtered[0].product_id }));

    // set prodname select to filtered[0].product_name
    document.getElementById("prodnameselect").value = filtered[0].product_name;

    // clear barcode input
    document.getElementsByName("barcode")[0].value = "";

    // keep cursor on barcode input
    document.getElementsByName("barcode")[0].focus();

    // console.log("barcode changed", e.target.value);
    // // get product_id from barcode
    // console.log(prodnames);
  };

  // Apply debounce to handleBarcodeChange
  const debouncedHandleBarcodeChange = debounce(handleBarcodeChange, 1000);

  useEffect(() => {
    document.getElementsByName("barcode")[0].focus();
  }, []);

  // form
  return (
    <Fragment>
      <div className="d-flex mt-3 justify-content-center">
        <div className="d-flex w-75 justify-content-center">
          <form
            className=""
            // do nothing on submit
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {/* barcode input */}
            <div>Barcode</div>
            <input
              type="text"
              name="barcode"
              className="form-control"
              value={inputs.barcode}
              onChange={(e) => debouncedHandleBarcodeChange(e)}
            />
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
            <Select
              id="prodnameselect"
              options={options}
              onChange={changedd}
              value={selectedValue}
            />
            {inputs.product_id}
            {/* </label>                                     */}
            {/* Inventory */}
            <br />
            <br />
            Inventory: {inventory}
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
                  defaultValue={1}
                  value={inputs.inventory}
                  onChange={handleChange}
                />
              </label>

              {/* discount */}
              {/* <label class="mt-3">
                Discount (Tshs)
                <input
                  type="number"
                  name="discount"
                  min="0"
                  step="1"
                  className="form-control"
                  defaultValue={0}
                  onChange={discountchanged}
                />
              </label> */}

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
            {/* <div class="input-group mb-3 mt-4">
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

            <button onClick={byPhone}>By Phone</button> */}
            <div class="row">
              <div class="col mt-4">
                <button className="btn btn-success" onClick={onSubmitForm}>
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
