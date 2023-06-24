import React, { Fragment, useState } from "react";
// import Navbar from "../Navbar";
// import PublicNavbar from "../../PublicNavbar";
// import { UserContext } from "../../../index";

function Component() {
  const [technicianJob, setTechnicianJob] = useState(true);
  const [deliveryJob, setDeliveryJob] = useState(false);

  const selectJobType = (e) => {
    if (e.target.value === "technician") {
      setTechnicianJob(true);
      setDeliveryJob(false);
    } else if (e.target.value === "delivery") {
      setDeliveryJob(true);
      setTechnicianJob(false);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primary "
        data-toggle="modal"
        data-target={`#addOrder`}
      >
        Add Job to Sale
      </button>

      {/* <!-- The Modal --> */}
      <div className="modal" id="addOrder">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Add Job to Sale</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              {/* select type of job */}
              <div
                className="form-group
                "
              >
                <label for="exampleFormControlSelect1">Job Type</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={selectJobType}
                >
                  <option value="technician">Installation</option>
                  <option value="delivery">Delivery</option>
                  <option value="technician">Service</option>
                  <option value="technician">Repair</option>
                </select>
                {/* input technician id, address, description, fee if technician job is true */}
                {technicianJob && (
                  <div>
                    <label>
                      Technician ID
                      <input
                        type="text"
                        name="technician_id"
                        className="form-control"
                        // defaultValue={product.product_name}
                        // onChange ={e => setDescription(e.target.value)}
                        // onChange={handleChange}
                      />
                    </label>
                    <label>
                      Address
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        // defaultValue={product.product_name}
                        // onChange ={e => setDescription(e.target.value)}
                        // onChange={handleChange}
                      />
                    </label>
                    <label>
                      Description
                      <input
                        type="text"
                        name="description"
                        className="form-control"
                        // defaultValue={product.product_name}
                        // onChange ={e => setDescription(e.target.value)}
                        // onChange={handleChange}
                      />
                    </label>
                    <label>
                      Fee
                      <input
                        type="number"
                        name="fee"
                        className="form-control"
                        // defaultValue={product.product_name}
                        // onChange ={e => setDescription(e.target.value)}
                        // onChange={handleChange}
                      />
                    </label>
                  </div>
                )}
                {/* input driver_id, delivery adress, delivery fee  */}
                {deliveryJob && (
                  <div>
                    <label>
                      Driver ID
                      <input
                        type="text"
                        name="driver_id"
                        className="form-control"
                        // defaultValue={product.product_name}
                        // onChange ={e => setDescription(e.target.value)}
                        // onChange={handleChange}
                      />
                    </label>
                    <label>
                      Address
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        // defaultValue={product.product_name}
                        // onChange ={e => setDescription(e.target.value)}
                        // onChange={handleChange}
                      />
                    </label>
                    <label>
                      Fee
                      <input
                        type="number"
                        name="fee"
                        className="form-control"
                        // defaultValue={product.product_name}
                        // onChange ={e => setDescription(e.target.value)}
                        // onChange={handleChange}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Component;
