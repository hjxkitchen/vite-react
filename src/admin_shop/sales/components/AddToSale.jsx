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

    const formData = inputs;

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
            {inputs.product_id}
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
                  defaultValue={1}
                  value={inputs.inventory}
                  onChange={handleChange}
                />
              </label>

              {/* discount */}
              <label class="mt-3">
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
