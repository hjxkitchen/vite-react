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
            <h1 className="text-center mt-5">Contacts</h1>
          </div>
        </div>

        <div class="table-responsive">
          <div class="row mb-3 mt-5 justify-content-center">
            <div class="col-md-9">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                {/* data with department fundi, marketing, sales */}
                <tbody>
                  <tr>
                    <Link to="/contact">
                      <th scope="row">John Doe</th>
                    </Link>
                    <td>0786 654 434</td>
                    <td>
                      <btn class="btn btn-warning">Edit</btn>
                    </td>
                  </tr>
                  <tr>
                    <Link to="/contact">
                      <th scope="row">John Doe</th>
                    </Link>
                    <td>0786 654 434</td>
                    <td>
                      {" "}
                      <btn class="btn btn-warning">Edit</btn>
                    </td>
                  </tr>
                  <tr>
                    <Link to="/contact">
                      <th scope="row">Jane Doe</th>
                    </Link>
                    <td>0786 654 434</td>
                    <td>
                      {" "}
                      <btn class="btn btn-warning">Edit</btn>
                    </td>
                  </tr>
                  <tr>
                    <Link to="/contact">
                      <th scope="row">Jane Doe</th>
                    </Link>
                    <td>0786 654 434</td>
                    <td>
                      {" "}
                      <btn class="btn btn-warning">Edit</btn>
                    </td>
                  </tr>
                  <tr>
                    <Link to="/contact">
                      <th scope="row">John Doe</th>
                    </Link>
                    <td>0786 654 434</td>
                    <td>
                      {" "}
                      <btn class="btn btn-warning">Edit</btn>
                    </td>
                  </tr>
                  <tr>
                    <Link to="/contact">
                      <th scope="row">John Doe</th>
                    </Link>
                    <td>0786 654 434</td>
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
