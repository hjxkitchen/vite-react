import React, { Fragment, useContext } from "react";
import Navbar from "../Navbar";
import PublicNavbar from "../PublicNavbar";
import { UserContext } from "../../App";
import SokooList from "./components/SokooList";

function Component() {
  const user = useContext(UserContext);
  return (
    <Fragment>
      {user && <Navbar />}
      {!user && <PublicNavbar />}
      <div>
        <h1 class="text-center mt-5">Sokoos List</h1>
      </div>
      <div class="table-responsive mt-5">
        <div class="row mb-5 justify-content-center">
          <div class="col-md-9">
            <SokooList />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Component;
