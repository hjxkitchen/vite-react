import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../../components/Navbar";

function UsersList() {
  return (
    <Fragment>
      <Navbar />
      <div class="row justify-content-center ">
        {/* back to employees button */}
        <Link to="/employees">
          <button type="button" class="btn btn-outline-dark mx-auto mt-5">
            Employees
          </button>
        </Link>
        <div class="col-md-9">
          <h1 className="text-center mt-5">Employee: John Doe</h1>
        </div>
      </div>

      <div class="row justify-content-center">
        {/* employee table */}
        <div class="col-md-10 mt-5">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-striped table-bordered zero-configuration">
                  <thead>
                    <tr>
                      {/* head */}
                      <th>Employee ID</th>
                      <th>Employee Name</th>
                      <th>Employee Compensation</th>
                      <th>Employee Success Score</th>
                      {/* <th>Employee ROI</th> */}
                      <th>Employee Incentives</th>
                      <th>Employee Vetting</th>
                      {/*  */}
                    </tr>
                  </thead>
                  <tbody>
                    {/* body */}
                    <tr>
                      <td>1</td>
                      <td>John Doe</td>
                      <td>200k</td>
                      <td>75%</td>
                      {/* <td>10%</td> */}
                      <td>20k+Seniority</td>
                      <td>
                        <Link to="#">Pass</Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOGS INPUT WITH BUTTON AND SAMPLE LOGS */}

      <div class="row justify-content-center text-center">
        <div class="col-md-6 mt-5">
          <input type="text" class="form-control" placeholder="Enter Logs" />
          <button type="submit" class="btn btn-primary mt-4">
            Submit
          </button>
        </div>
      </div>

      <div class="row justify-content-center">
        {/* sample logs */}
        <div class="col-md-5 mt-5 mb-5">
          {/* <div class="card"> */}
          {/* <div class="card-body"> */}
          <div class="table-responsive">
            <table class="table ">
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
