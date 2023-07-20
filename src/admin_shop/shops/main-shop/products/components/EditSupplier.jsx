import React, { Fragment, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const EditSupplier = ({ supplier }) => {
  const [description, setDescription] = useState(supplier.description);

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  //edit description function
  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      // const response = await fetch(
      //   `http://localhost:000/suppliers/${supplier.id}`,
      //   {
      //     method: "PUT",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(body),
      //   }
      // );
      const response = await axios.put(
        import.meta.env.VITE_API_URL + "/api/supplier/" + supplier.supplier_id,
        inputs,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      console.log("resid", response);

      window.location = "/suppliers";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      {/* <!-- Button to Open the Modal --> */}
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${supplier.supplier_id}`}
      >
        Edit
      </button>

      {/* <!-- The Modal --> */}
      <div class="modal" id={`id${supplier.supplier_id}`}>
        <div class="modal-dialog">
          <div class="modal-content">
            {/* <!-- Modal Header --> */}
            <div class="modal-header">
              <h4 class="modal-title">Edit Supplier</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setDescription(supplier.description)}
              >
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div class="modal-body">
              <div class="row">
                <div class="col">
                  {/* 1st input */}
                  <label>
                    Name
                    <input
                      type="text"
                      name="supplier_name"
                      className="form-control"
                      defaultValue={supplier.supplier_name}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  {/* 4th */}
                  <label>
                    Email
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      value={inputs.price}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  {/* 4th */}
                  <label>
                    Phone
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      value={inputs.price}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateDescription(e)}
              >
                Edit
              </button>

              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(supplier.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditSupplier;
