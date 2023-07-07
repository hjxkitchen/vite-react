import React, { Fragment } from "react";

//components
// import InputPackage from "InputPackage";
import PackagesList from "./components/PackagesList";
import Navbar from "../../../../system/Navbar";
import AddPackageModal from "./components/AddPackageModal";
// import EditPackage from "../admin/packages/EditPackage";

function PackagesListcomp() {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <div class="row justify-content-center ">
          <div class="col-md-12">
            <h1 className="text-center mt-5">Packages</h1>
          </div>
        </div>

        <div class="row justify-content-center ">
          {/* <div class="col-md-3 my-auto justify-content-center"> */}

          <AddPackageModal />
          {/* </div> */}
        </div>

        <div class="row justify-content-center ">
          {/* <InputPackage /> */}
          <div class="container">
            <div class="table-responsive">
              <PackagesList />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default PackagesListcomp;