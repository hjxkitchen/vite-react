// create edit modal
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// fucntional component
const EditModal = ({ product }) => {
  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState({});

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  const handleEditSubmit = async () => {
    // if not all inputs are filled out, fill them with the current values
    // if (!inputs.name) {
    //   inputs.name = product.name;
    // }
    // if (!inputs.price) {
    //   inputs.price = product.price;
    // }
    // if (!inputs.description) {
    //   inputs.description = product.description;
    // }

    const keys = ["username", "roleID", "password"];

    // write a dynamic function to do the above
    // for (const key of keys) {
    //   const value = inputs[key];
    //   if (!value) {
    //     inputs[key] = product[key];
    //   }
    // }

    // the arrat
    await axios.put(
      import.meta.env.VITE_API_URL + "/api/User/" + product.id,
      inputs,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    window.location.reload();
  };

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={"#editModal" + product.id}
        onClick={handleShow}
      >
        Edit
      </button>

      <div
        className="modal fade"
        id={"editModal" + product.id}
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Edit UserId: {product.id}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    defaultValue={product.username}
                    onChange={handleInputChange}
                    name="name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    RoleId:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="recipient-name"
                    defaultValue={product.roleId}
                    onChange={handleInputChange}
                    name="price"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Password:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    defaultValue={product.password}
                    onChange={handleInputChange}
                    name="description"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEditSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
