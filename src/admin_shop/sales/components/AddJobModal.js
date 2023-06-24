import React, { Fragment, useState } from "react";
// import Navbar from "../../../components/Navbar";
// import PublicNavbar from "../../../components/PublicNavbar";
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
        class="btn btn-primary "
        data-toggle="modal"
        data-target={`#addOrder`}
      >
        Add Job to Sale
      </button>

      {/* <!-- The Modal --> */}
      <div class="modal" id="addOrder">
        <div class="modal-dialog">
          <div class="modal-content">
            {/* <!-- Modal Header --> */}
            <div class="modal-header">
              <h4 class="modal-title">Add Job to Sale</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div class="modal-body">
              {/* select type of job */}
              <div
                class="form-group
                "
              >
                <label for="exampleFormControlSelect1">Job Type</label>
                <select
                  class="form-control"
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
            <div class="modal-footer"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Component;
