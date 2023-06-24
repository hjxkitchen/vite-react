import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Navbar from "../Navbar";

function UsersList() {
  return (
    <Fragment>
      <Navbar />
      <div className="row justify-content-center ">
        {/* back to employees button */}
        <Link to="/contacts">
          <button type="button" className="btn btn-outline-dark mx-auto mt-5">
            Contacts
          </button>
        </Link>
        <div className="col-md-9"></div>
      </div>
      <h1 className="text-center mt-5">Contact: John Doe</h1>

      {/* LOGS INPUT WITH BUTTON AND SAMPLE LOGS */}

      <div className="row justify-content-center text-center">
        <div className="col-md-6 mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Logs"
          />
          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
        </div>
      </div>

      <div className="row justify-content-center">
        {/* sample logs */}
        <div className="col-md-5 mt-5 mb-5">
          {/* <div className="card"> */}
          {/* <div className="card-body"> */}
          <div className="table-responsive">
            <table className="table ">
              <thead>
                <tr>
                  {/* head */}
                  {/* <th>Log ID</th> */}
                  <th>Log Date</th>
                  <th>Log Data</th>
                </tr>
              </thead>
              <tbody>
                {/* body */}
                <tr>
                  {/* <td>1</td> */}
                  <td>2020-10-10</td>
                  <td>John Doe</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* </div>
            </div> */}
        </div>
      </div>

      {/* </div> */}
    </Fragment>
  );
}

export default UsersList;
