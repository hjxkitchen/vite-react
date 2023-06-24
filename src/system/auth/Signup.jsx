import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PublicNavbar from "../../shops/admin_shop//PublicNavbar";
import axios from "axios";

function Contact() {
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
    let res = await axios.post("http://localhost:5000/adminsignup", inputs);
    console.log("data returned is: ");
    let data = res.data;

    if ((res.data = "success")) {
      console.log("success");
      window.location.href = "/login";
    } else {
      console.log("failed");
      alert("failed");
    }
  };

  return (
    <Fragment>
      <PublicNavbar />
      <div class="container">
        <div>
          <h1 class="text-center mt-5">Signup</h1>
        </div>
        <div class="row justify-content-center mt-5">
          {/* <div class="col-sm-1"></div> */}
          <div class="card col-md-6 mb-5 justify-content-center">
            <div class="card-body">
              <form>
                <div class="form-group">
                  <label for="name">Name*</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                  <label for="phone">Phone Number</label>
                  <input
                    type="text"
                    class="form-control"
                    id="phone"
                    name="phone"
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                  <label for="exampleInputEmail1">Email address*</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                  <label for="password">Password*</label>
                  <input
                    type="text"
                    class="form-control"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Enter password"
                  />
                  <div class="row mx-auto">
                    <button
                      class="btn btn-primary mt-4 mr-2"
                      onClick={onSubmitForm}
                    >
                      {" "}
                      Signup
                    </button>
                    <div class="mt-5">
                      or <Link to="/login">Login</Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* <div class="col-sm-1"></div> */}
        </div>
      </div>
    </Fragment>
  );
}

export default Contact;
