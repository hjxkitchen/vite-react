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
      const response = await fetch("http://localhost:5000/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      window.location = "/categories";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      {/* <!-- Button to Open the Modal --> */}
      <button
        type="button"
        className="btn btn-success mt-5"
        data-toggle="modal"
        data-target={`#addOrder`}
      >
        Add Category
      </button>

      {/* <!-- The Modal --> */}
      <div className="modal" id="addOrder">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Add Category</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              {/* <div className="d-flex justify-content-center"> */}
              {/* <div className="d-flex w-50 justify-content-center"> */}
              <form className="" onSubmit={onSubmitForm}>
                <div className="row justify-content-center">
                  <div className="col-md-0">
                    {/* 1st input */}
                    <label>
                      Category Name
                      <input
                        type="text"
                        name="category_name"
                        className="form-control"
                        value={inputs.description}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-0 mt-4">
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
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
              >
                Edit
              </button>

              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
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

export default AddProductModal;
