import React, { Fragment, useContext } from "react";
import Navbar from "../../admin_shop/Navbar";
import PublicNavbar from "../../admin_shop/PublicNavbar";
// import { UserContext } from "../../../../index";
import BillboardsList from "./components/BillboardsList";

function Component() {
  //   const user = useContext(UserContext);
  return (
    <Fragment>
      {user && <Navbar />}
      {!user && <PublicNavbar />}
      <div>
        <h1 className="text-center mt-5">Billboards List</h1>
      </div>
      <div className="table-responsive mt-5">
        <div className="row mb-5 justify-content-center">
          <div className="col-md-9">
            <BillboardsList />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Component;
