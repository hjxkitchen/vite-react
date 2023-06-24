import React, { Fragment, useContext } from "react";
import Navbar from "../Navbar";
import PublicNavbar from "../PublicNavbar";
// import { UserContext } from "../../../index";

function Component() {
  // const user = useContext(UserContext);
  return (
    <Fragment>
      {user && <Navbar />}
      {!user && <PublicNavbar />}
      <div>
        <h1 className="text-center mt-5">IT Tickets</h1>
      </div>
      <div className="table-responsive">
        <div className="row mb-3 mt-5 justify-content-center">
          <div className="col-md-9">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Ticket ID</th>
                  <th scope="col">Ticket Name</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">12345</th>
                  <td>Network connection issues</td>
                  <td>Open</td>
                </tr>
                <tr>
                  <th scope="row">67890</th>
                  <td>Software installation request</td>
                  <td>Resolved</td>
                </tr>
                <tr>
                  <th scope="row">24680</th>
                  <td>Printer malfunction</td>
                  <td>In progress</td>
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
