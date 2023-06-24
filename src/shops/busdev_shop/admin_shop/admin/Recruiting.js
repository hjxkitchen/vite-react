import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../../components/Navbar";
import PublicNavbar from "../../../components/PublicNavbar";
import { UserContext } from "../../../index";

function Component() {
  const user = useContext(UserContext);
  return (
    <Fragment>
      {user && <Navbar />}
      {!user && <PublicNavbar />}
      <div>
        <h1 class="text-center mt-5">Recruits</h1>
      </div>
      <div class="table-responsive">
        <div class="row mb-3 mt-5 justify-content-center">
          <div class="col-md-9">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Roles</th>
                  <th scope="col">Status</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              {/* data with department fundi, marketing, sales */}
              <tbody>
                <tr>
                  <Link to="/contact">
                    <th scope="row">John Doe</th>
                  </Link>
                  <td>Marketing</td>
                  <a href="#">Onboarding</a>
                  <td>
                    <btn class="btn btn-warning">Edit</btn>
                  </td>
                </tr>
                <tr>
                  <Link to="/contact">
                    <th scope="row">John Doe</th>
                  </Link>
                  <td>Capital</td>
                  <a href="#">Onboarding</a>
                  <td>
                    {" "}
                    <btn class="btn btn-warning">Edit</btn>
                  </td>
                </tr>
                <tr>
                  <Link to="/contact">
                    <th scope="row">Jane Doe</th>
                  </Link>
                  <td>Sales</td>
                  <a href="#">Onboarding</a>
                  <td>
                    {" "}
                    <btn class="btn btn-warning">Edit</btn>
                  </td>
                </tr>
                <tr>
                  <Link to="/contact">
                    <th scope="row">Jane Doe</th>
                  </Link>
                  <td>Sales</td>
                  <a href="#">Onboarding</a>
                  <td>
                    {" "}
                    <btn class="btn btn-warning">Edit</btn>
                  </td>
                </tr>
                <tr>
                  <Link to="/contact">
                    <th scope="row">John Doe</th>
                  </Link>
                  <td>Technician</td>
                  <a href="#">Onboarding</a>
                  <td>
                    {" "}
                    <btn class="btn btn-warning">Edit</btn>
                  </td>
                </tr>
                <tr>
                  <Link to="/contact">
                    <th scope="row">John Doe</th>
                  </Link>
                  <td>Technician</td>
                  <a href="#">Onboarding</a>
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
    </Fragment>
  );
}

export default Component;
