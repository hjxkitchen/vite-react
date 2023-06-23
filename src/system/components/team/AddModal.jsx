// create Add modal

import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// fucntional component
const AddModal = () => {
  const [inputs, setInputs] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  const handleSubmit = async () => {
    await axios.post(import.meta.env.VITE_API_URL + "/api/User", inputs, {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
    });
    window.location.reload();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary mt-4 mb-4 mx-auto d-block"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal1"
        onClick={handleShow}
      >
        Add
      </button>

      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add
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
                    name="username"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    RoleID:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="recipient-name"
                    name="roleId"
                    onChange={handleInputChange}
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
                    name="password"
                    onChange={handleInputChange}
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
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddModal;
