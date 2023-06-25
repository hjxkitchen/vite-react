import React, { Fragment, useContext } from "react";
import Navbar from "../Navbar";
import PublicNavbar from "../PublicNavbar";
import { UserContext } from "../../App";
import TechnicianJobsList from "./components/DeliveryJobsList";

function Component() {
  const user = useContext(UserContext);
  return (
    <Fragment>
      {user && <Navbar />}
      {!user && <PublicNavbar />}

      <div class="row mb-3 mt-5 justify-content-center">
        <h1 class="text-center">Technician Jobs</h1>

        <button className="btn btn-success ml-5 mt-3">Add Job</button>
      </div>
      <div class="table-responsive mt-5">
        <div class="row mb-5 justify-content-center">
          <div class="col-md-9">
            <TechnicianJobsList />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Component;
