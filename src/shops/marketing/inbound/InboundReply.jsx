import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../admin_shop/Navbar";

function UsersList() {
  return (
    <Fragment>
      <Navbar />
      <div className="row justify-content-center ">
        <div className="col-md-9">
          <h1 className="text-center mt-5">Inbound Reply</h1>
        </div>
      </div>

      {/* show message */}
      <div className="row ml-5 mr-5 mb-3 mt-5 justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5
                className="card-title
                    "
              >
                Whatsapp Message from: 0789877877{" "}
              </h5>
              <p className="card-text">Hi. I would like to buy a car.</p>
              {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
          </div>
        </div>
        {/* </div> */}

        {/* reply box and submit */}
        {/* <div className="row ml-5 mr-5 mb-3 mt-5 justify-content-center"> */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5
                className="card-title
                    "
              >
                Reply Message
              </h5>
              <div
                className="form-group
                        text-center"
              >
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
              <button type="button" className="btn btn-primary mr-2 mt-3">
                Submit
              </button>
              {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
          </div>
        </div>
      </div>

      {/* </div> */}
    </Fragment>
  );
}

export default UsersList;
