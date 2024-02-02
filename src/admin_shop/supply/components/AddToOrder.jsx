import React, { Fragment, useEffect, useState, useContext } from "react";
import OrderList from "./AddOrder";
// prodcontext
import { ProdContext } from "../../../App";

const AddToOrder = ({ orders, setOrders }) => {
  const [inputs, setInputs] = useState({});
  const [array, setArray] = useState([]);

  // get products from context
  const products = useContext(ProdContext);

  setOrders(array);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // submit function
  const onSubmitForm = async (e) => {
    e.preventDefault();
    // array.push(inputs);

    if (inputs.product_id && inputs.quantity && inputs.cost) {
      // if description already exists, update quantity and cost
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
                  // cost: parseInt(item.cost) + parseInt(inputs.cost)
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

    setOrders(array);
    console.log(orders);
  };

  // form
  return (
    <Fragment>
      <div className="d-flex mt-5 justify-content-center">
        <div className="d-flex w-50 justify-content-center">
          <form className="" onSubmit={onSubmitForm}>
            {/* 1st input */}
            <label>
              Product
              {/* <input
                type="text"
                name="product_name"
                className="form-control"
                value={inputs.description}
                onChange={handleChange}
              /> */}
              {/* select with products names as labels and id as value */}
              <select
                className="form-control"
                name="product_id"
                value={inputs.product_id}
                onChange={handleChange}
              >
                <option value="">Select Product</option>
                {products.map((product) => (
                  <option value={product.product_id}>
                    {product.product_name}
                  </option>
                ))}
              </select>
            </label>

            {/* 2nd */}
            <label>
              Quantity
              <input
                type="number"
                name="quantity"
                min="0"
                step="1"
                className="form-control"
                value={inputs.inventory}
                onChange={handleChange}
              />
            </label>

            {/* 3rd */}
            <label>
              Cost
              <input
                type="number"
                name="cost"
                className="form-control"
                value={inputs.cost}
                onChange={handleChange}
              />
            </label>

            <div class="row">
              <div class="col mt-4">
                {/* submit button */}
                <button className="btn btn-success" onClick={onSubmitForm}>
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <OrderList props={array}/> */}
    </Fragment>
  );
};

// export {array};
export default AddToOrder;
