import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../admin_shop/Navbar";

function UsersList() {
  return (
    <Fragment>
      <Navbar />
      <div class="container">
        <div class="row justify-content-center ">
          <h1 className="text-center mt-5">Outbound Marketing</h1>
        </div>

        <div class="row ml-5 mr-5 mb-3  justify-content-center">
          {/* input form for ad */}
          <div class="col-md-9">
            <h1 className="text-center mt-5">Create Ad</h1>
          </div>
          <div class="col-md-4 ">
            <form>
              <div
                class="form-group
                "
              >
                <label for="exampleFormControlInput1">Ad Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Ad Name"
                />
                {/* theme */}
                <label for="exampleFormControlInput1">Theme</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Theme"
                />
                {/* products */}
                <label for="exampleFormControlInput1">Products</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Products"
                />
                {/* ad details */}
                <label for="exampleFormControlInput1">Ad Write up</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Ad Write up"
                />
                {/* ad video */}
                {/* <label for="exampleFormControlInput1">Ad Video</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Ad Video"/> */}
              </div>
            </form>
          </div>
          {/* send to social media buttons sms, whatsapp, facebook, ig */}
          <div class="row justify-content-center">
            <div class="mt-5">
              <Link to="/send">
                <button type="button" class="btn btn-outline-dark mr-2 mt-3">
                  Auto Broadcast Send
                </button>
              </Link>
            </div>
            <br></br>
            SMS, Whatsapp, Facebook, Instagram
          </div>

          {/* empty spacer */}
          <div class="col-md-9 mb-5 mt-5">
            {/* <h1 className="text-center mt-5">Create Ad</h1> */}
          </div>
        </div>
      </div>

      {/* </div> */}
    </Fragment>
  );
}

export default UsersList;
