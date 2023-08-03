import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../system/Navbar";

function UsersList() {
  return (
    <Fragment>
      <Navbar />
      <div class="container mb-5">
        <div class="row justify-content-center ">
          <div class="col-md-9">
            <h1 className="text-center mt-5">Employees</h1>
          </div>
        </div>

        <div class="table-responsive">
          <div class="row mb-3 mt-5 justify-content-center">
            <div class="col-md-9">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Roles</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                {/* data with department fundi, marketing, sales */}
                <tbody>
                  <tr>
                    <Link to="/employee">
                      <th scope="row">John Doe</th>
                    </Link>
                    <td>Marketing</td>
                    <td>
                      <btn class="btn btn-warning">Edit</btn>
                    </td>
                  </tr>
                  <tr>
                    <Link to="/employee">
                      <th scope="row">John Doe</th>
                    </Link>
                    <td>Capital</td>
                    <td>
                      {" "}
                      <btn class="btn btn-warning">Edit</btn>
                    </td>
                  </tr>
                  <tr>
                    <Link to="/employee">
                      <th scope="row">Jane Doe</th>
                    </Link>
                    <td>Sales</td>
                    <td>
                      {" "}
                      <btn class="btn btn-warning">Edit</btn>
                    </td>
                  </tr>
                  <tr>
                    <Link to="/employee">
                      <th scope="row">Jane Doe</th>
                    </Link>
                    <td>Sales</td>
                    <td>
                      {" "}
                      <btn class="btn btn-warning">Edit</btn>
                    </td>
                  </tr>
                  <tr>
                    <Link to="/employee">
                      <th scope="row">John Doe</th>
                    </Link>
                    <td>Technician</td>
                    <td>
                      {" "}
                      <btn class="btn btn-warning">Edit</btn>
                    </td>
                  </tr>
                  <tr>
                    <Link to="/employee">
                      <th scope="row">John Doe</th>
                    </Link>
                    <td>Technician</td>
                    <td>
                      {" "}
                      <btn class="btn btn-warning">Edit</btn>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* </div> */}
    </Fragment>
  );
}

export default UsersList;
