import React, { Fragment, useState } from "react";

const AddSupplierModal = ({ supplier }) => {
  const [inputs, setInputs] = useState({});

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
      const response = await fetch("http://localhost:5000/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
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
              <h4 class="modal-title">Edit Supplier</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div class="modal-body">
              <div className="d-flex mt-5 justify-content-center">
                <div className="d-flex w-50 justify-content-center">
                  <form className="" onSubmit={onSubmitForm}>
                    <div class="row">
                      <div class="col">
                        {/* 1st input */}
                        <label>
                          Name
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={inputs.description}
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

                      <div class="col mt-4">
                        {/* 6th */}
                        {/* <label>Shop
                        <input 
                            type="text" 
                            name="shop"
                            className="form-control" 
                            value={inputs.shop} 
                            onChange={handleChange} 
                        />
                        </label> */}
                        {/* submit button */}
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
