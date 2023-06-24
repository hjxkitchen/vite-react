import React, { Fragment, useContext } from "react";
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
        <h1 class="text-center mt-5">Bus Dev</h1>
      </div>
      <div class="table-responsive">
        <div class="row mb-3 mt-5 justify-content-center">
          <div class="col-md-9">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Mission</th>
                  <th>Leads</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Market research</td>
                  <td>Marketing team</td>
                  <td>Completed</td>
                </tr>
                <tr>
                  <td>Client onboarding</td>
                  <td>Sales team</td>
                  <td>In progress</td>
                </tr>
                <tr>
                  <td>Product development</td>
                  <td>Product team</td>
                  <td>Upcoming</td>
                </tr>
                <tr>
                  <td>Budget planning</td>
                  <td>Finance team</td>
                  <td>In progress</td>
                </tr>
                <tr>
                  <td>Employee training</td>
                  <td>HR team</td>
                  <td>Upcoming</td>
                </tr>
                <tr>
                  <td>IT system upgrade</td>
                  <td>IT team</td>
                  <td>Open</td>
                </tr>
                <tr>
                  <td>Legal compliance</td>
                  <td>Legal team</td>
                  <td>Completed</td>
                </tr>
                <tr>
                  <td>Partnerships</td>
                  <td>Business dev team</td>
                  <td>Upcoming</td>
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
