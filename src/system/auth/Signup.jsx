// signup page

import React, { useState } from "react";
import axios from "axios";

import Navbar from "../Navbar";
import Footer from "../Footer";

const Signup = () => {
  const [inputs, setInputs] = useState({});

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
      role_id: 2,
    }));
  };

  const handleSubmit = async () => {
    console.log("submitinputs:", inputs);

    await axios.post(import.meta.env.VITE_API_URL + "/team/signup", inputs, {
      headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
    });
    // go to login
    window.location.href = "/login";
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-center mt-5">Signup</h1>
        <form>
          <div className="form-group mt-5 text-center justify-content-center row">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control col-4"
              id="name"
              name="username"
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={handleInputChange}
            />
          </div> */}
          <div className="form-group mt-5 text-center justify-content-center row">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control col-4"
              id="password"
              name="password"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mt-5 text-center justify-content-center row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
        <br />
      </div>
      <Footer />
    </>
  );
};
export default Signup;
