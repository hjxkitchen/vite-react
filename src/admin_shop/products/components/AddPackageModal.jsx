import React, { Fragment, useState } from "react";

const AddProductModal = ({ product }) => {
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
      // const response = await fetch("http://localhost:000/packages", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(inputs),
      // });
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "packages",
        inputs,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      window.location = "/packages";
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
              <h4 class="modal-title">Add Package</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div class="modal-body">
              {/* <div className="d-flex justify-content-center"> */}
              {/* <div className="d-flex w-50 justify-content-center"> */}
              <form className="" onSubmit={onSubmitForm}>
                <div class="row justify-content-center">
                  <div class="col-md-0">
                    {/* 1st input */}
                    <label>
                      Package Name
                      <input
                        type="text"
                        name="package_name"
                        className="form-control"
                        value={inputs.description}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div class="col-md-0">
                    {/* 2nd */}
                    <label>
                      Package Price
                      <input
                        type="number"
                        name="package_price"
                        min="0"
                        step="1"
                        className="form-control"
                        // value={inputs.inventory}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div class="col-md-0">
                    {/* 4th */}
                    <label>
                      Package Description
                      <input
                        type="text"
                        name="package_description"
                        className="form-control"
                        // value={inputs.price}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div class="col-md-0 mt-4">
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
                    <button className="btn btn-success" onClick={onSubmitForm}>
                      Add
                    </button>
                  </div>
                </div>
              </form>
              {/* </div> */}
              {/* </div> */}
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

export default AddProductModal;
