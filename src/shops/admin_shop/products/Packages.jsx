import React, { Fragment } from "react";

//components
// import InputPackage from "../../../components/InputPackage";
import PackagesList from "./components/PackagesList";
import Navbar from "../Navbar";
import AddPackageModal from "./components/AddPackageModal";
// import EditPackage from "../../../../components/admin/packages/EditPackage";

function PackagesListcomp() {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center ">
          <div className="col-md-12">
            <h1 className="text-center mt-5">Packages</h1>
          </div>
        </div>

        <div className="row justify-content-center ">
          {/* <div className="col-md-3 my-auto justify-content-center"> */}

          <AddPackageModal />
          {/* </div> */}
        </div>

        <div className="row justify-content-center ">
          {/* <InputPackage /> */}
          <div className="container">
            <div className="table-responsive">
              <PackagesList />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default PackagesListcomp;
