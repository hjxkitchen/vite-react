import React, { Fragment, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AddProductModal = ({ product }) => {
  const [inputs, setInputs] = useState({});

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // submit function
  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log(inputs);
    // set input price as parseint cost * 1.4
    inputs.price = parseInt(inputs.cost) * 1.4;
    try {
      // const response = await fetch("http://localhost:000/products", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(inputs),
      // });
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/product",
        inputs,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      window.location = "/shoplist";
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
              <h4 class="modal-title">Add Product</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div class="modal-body">
              <div className="d-flex justify-content-center">
                {/* <div className="d-flex w-50 justify-content-center"> */}
                <form className="" onSubmit={onSubmitForm}>
                  <div class="row">
                    <div class="col">
                      {/* 1st input */}
                      <label>
                        Product Name
                        <input
                          type="text"
                          name="product_name"
                          className="form-control"
                          value={inputs.description}
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                    <div class="col">
                      {/* 4th */}
                      <label>
                        Cost
                        <input
                          type="number"
                          name="cost"
                          className="form-control"
                          // value={inputs.cost}
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      {/* 4th */}
                      <label>
                        Description
                        <input
                          type="text"
                          name="description"
                          className="form-control"
                          // value={inputs.cost}
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                    <div class="col">
                      {/* 4th */}
                      <label>
                        Inventory
                        <input
                          type="number"
                          name="inventory"
                          className="form-control"
                          // value={inputs.cost}
                          onChange={handleChange}
                        />
                      </label>
                    </div>

                    {/* <div class = "col mt-4">
                        <button className="btn btn-success" onClick={onSubmitForm}>Add</button>
                    </div> */}
                  </div>
                  <div class="row text-center mt-2">
                    <div class="col">
                      {/* 4th */}
                      <label>
                        Subcategory
                        {/* select */}
                        <select
                          name="subcategory_id"
                          className="form-control"
                          onChange={handleChange}
                        >
                          <option value="0">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </select>
                      </label>
                    </div>

                    {/* <div class = "col mt-4">
                        <button className="btn btn-success" onClick={onSubmitForm}>Add</button>
                    </div> */}
                  </div>

                  <div class="row">
                    <div class="col mt-4 ">
                      <form
                        // action="http://localhost:000/upload"
                        action={import.meta.env.VITE_API_URL + "/upload"}
                        method="post"
                        enctype="multipart/form-data"
                      >
                        <input
                          className="form-control collapse"
                          type="number"
                          name="product_id"
                        />
                        <input
                          className="form-control"
                          type="file"
                          name="images"
                        />
                        <input
                          className="form-control"
                          type="submit"
                          value="Upload"
                        />
                      </form>
                    </div>
                  </div>
                </form>
                {/* </div> */}
              </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div class="modal-footer">
              <button className="btn btn-success" onClick={onSubmitForm}>
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
