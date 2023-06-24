import React, { Fragment, useState, useContext } from "react";
import { ProdContext } from "../../../../../index";

const AddProductModal = ({ product }) => {
  const [inputs, setInputs] = useState({});
  const products = useContext(ProdContext);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // submit function
  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      const response = await fetch("http://localhost:5000/featured", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      // window.location = "/inventory";
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      {/* <!-- Button to Open the Modal --> */}
      <button
        type="button"
        class="btn btn-success mt-5"
        data-toggle="modal"
        data-target={`#addOrder`}
      >
        Add
      </button>

      {/* <!-- The Modal --> */}
      <div class="modal" id="addOrder">
        <div class="modal-dialog">
          <div class="modal-content">
            {/* <!-- Modal Header --> */}
            <div class="modal-header">
              <h4 class="modal-title">Add Featured Product</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div class="modal-body">
              <div className="d-flex justify-content-center">
                <div className="d-flex w-50 justify-content-center">
                  <form className="" onSubmit={onSubmitForm}>
                    <div class="row">
                      <div class="col">
                        {/* 1st input */}
                        <label>
                          Product Name
                          <select
                            name="product_id"
                            className="form-control"
                            // value={inputs.product_id}
                            onChange={handleChange}
                          >
                            <option value="0">Select Product</option>
                            {products.map((product) => (
                              <option
                                key={product.product_id}
                                value={product.product_id}
                              >
                                {product.product_name}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div class="modal-footer">
              {/* <button type="button" 
            class="btn btn-warning" 
            data-dismiss="modal"

            >Edit</button> */}

              <button
                type="button"
                class="btn btn-success"
                data-dismiss="modal"
                onClick={onSubmitForm}
              >
                Add
              </button>

              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddProductModal;
