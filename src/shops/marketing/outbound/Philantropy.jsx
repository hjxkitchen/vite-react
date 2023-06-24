import React, { Fragment, useContext } from "react";
import Navbar from "../../admin_shop/Navbar";
import PublicNavbar from "../../admin_shop/PublicNavbar";
// import { UserContext } from "../../index";
import PhilantropyList from "./components/PhilantropyList";

function Component() {
  //   const user = useContext(UserContext);
  return (
    <Fragment>
      {user && <Navbar />}
      {!user && <PublicNavbar />}
      <div>
        <h1 class="text-center mt-5">Philantropy List</h1>
      </div>

      <div class="table-responsive mt-5">
        <div class="row mb-5 justify-content-center">
          <div class="col-md-9">
            <PhilantropyList />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Component;
