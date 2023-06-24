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
        <h1 className="text-center mt-5">Legal Tickets</h1>
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
                  <td>1</td>
                  <td>Contract Review</td>
                  <td>Open</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Trademark Registration</td>
                  <td>In progress</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Regulatory Compliance</td>
                  <td>Resolved</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Litigation Support</td>
                  <td>Resolved</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Employment Law</td>
                  <td>Resolved</td>
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
