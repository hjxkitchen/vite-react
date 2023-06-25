import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Navbar from "../Navbar";

function UsersList() {
  return (
    <Fragment>
      <Navbar />
      <div class="row justify-content-center ">
        <div class="col-md-9">
          <h1 className="text-center mt-5">Inbound Reply</h1>
        </div>
      </div>

      {/* show message */}
      <div class="row ml-5 mr-5 mb-3 mt-5 justify-content-center">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5
                class="card-title
                    "
              >
                Whatsapp Message from: 0789877877{" "}
              </h5>
              <p class="card-text">Hi. I would like to buy a car.</p>
              {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
            </div>
          </div>
        </div>
        {/* </div> */}

        {/* reply box and submit */}
        {/* <div class="row ml-5 mr-5 mb-3 mt-5 justify-content-center"> */}
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5
                class="card-title
                    "
              >
                Reply Message
              </h5>
              <div
                class="form-group
                        text-center"
              >
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
              <button type="button" class="btn btn-primary mr-2 mt-3">
                Submit
              </button>
              {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
            </div>
          </div>
        </div>
      </div>

      {/* </div> */}
    </Fragment>
  );
}

export default UsersList;
