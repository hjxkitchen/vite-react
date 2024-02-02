// create Add modal

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// fucntional component
const AddModal = ({ roles }) => {
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
    console.log("submitinputs:", inputs);

    await axios.post(import.meta.env.VITE_API_URL + "/team/signup", inputs, {
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
        data-toggle="modal"
        data-target="#exampleModal1"
        onClick={handleShow}
      >
        Add
      </button>

      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="username" className="col-form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role" className="col-form-label">
                    Role:
                  </label>
                  {/* <input
                    type="number"
                    className="form-control"
                    id="role"
                    name="role"
                    onChange={handleInputChange}
                  /> */}
                  {/* select  */}
                  <select
                    className="form-control"
                    id="role"
                    name="role_id"
                    onChange={handleInputChange}
                  >
                    <option>Select Role</option>
                    {/* map role as options without 1 and 2  */}
                    {roles
                      .filter(
                        (role) => role.role_id !== 1 && role.role_id !== 2
                      )
                      .map((role) => (
                        <option key={role.role_id} value={role.role_id}>
                          {role.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="col-form-label">
                    Password:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
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
                data-dismiss="modal"
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
