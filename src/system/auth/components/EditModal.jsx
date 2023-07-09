import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

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

  const token = Cookies.get(import.meta.env.VITE_APP_COOKIE_NAME);

  const handleEditSubmit = async () => {
    await axios.put(
      import.meta.env.VITE_APP_API_URL + "/api/User/" + product.id,
      inputs,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_APP_API_KEY,
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
        data-toggle="modal"
        data-target={"#editModal" + product.user_id}
        onClick={handleShow}
      >
        Edit
      </button>

      <div
        className="modal "
        id={"editModal" + product.user_id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Edit UserId: {product.user_id}
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
                    defaultValue={product.username}
                    onChange={handleInputChange}
                    name="username"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="roleId" className="col-form-label">
                    RoleId:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="roleId"
                    defaultValue={product.role_id}
                    onChange={handleInputChange}
                    name="roleID"
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="password" className="col-form-label">
                    Password:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    defaultValue={product.password}
                    onChange={handleInputChange}
                    name="password"
                  />
                </div> */}
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
