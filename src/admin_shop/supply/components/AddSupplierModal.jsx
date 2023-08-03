import React, { Fragment, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AddSupplierModal = ({ supplier }) => {
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
    console.log("inputs to submit", inputs);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/supplier",
        inputs,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      // add contcats: phone, emial, address, location

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
        class="btn btn-success "
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
              <h4 class="modal-title">Edit Supplier</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div class="modal-body">
              <div className="d-flex mt-3 justify-content-center">
                <div className="d-flex w-50 justify-content-center">
                  <form className="" onSubmit={onSubmitForm}>
                    {/* name */}
                    <div class="row">
                      <div class="col">
                        {/* 1st input */}
                        <label>
                          Name
                          <input
                            type="text"
                            name="supplier_name"
                            className="form-control"
                            value={inputs.description}
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                    </div>
                    {/* email */}
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
                    {/* phone */}
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
                    {/* address */}
                    <div class="row">
                      <div class="col">
                        {/* 4th */}
                        <label>
                          Address
                          <input
                            type="text"
                            name="address"
                            className="form-control"
                            value={inputs.address}
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                    </div>
                    {/* location */}
                    <div class="row">
                      <div class="col">
                        {/* 4th */}
                        <label>
                          Location
                          <input
                            type="text"
                            name="location"
                            className="form-control"
                            value={inputs.location}
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col mt-4 mb-4">
                        <button
                          className="btn btn-success"
                          onClick={onSubmitForm}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
              >
                Edit
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

export default AddSupplierModal;
