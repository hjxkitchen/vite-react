import React, { Fragment } from "react";

//components
// import InputPackage from "../../components/InputPackage";
import CategoriesList from "./components/CategoriesList";
import Navbar from "../Navbar";
import AddCategoryModal from "./components/AddCategoryModal";
// import EditCategory from "../../../components/admin/categories/EditCategory";

function PackagesListcomp() {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center ">
          <div className="col-md-12">
            <h1 className="text-center mt-5">Categories</h1>
          </div>
        </div>

        <div className="row justify-content-center ">
          {/* <div className="col-md-3 my-auto justify-content-center"> */}

          <button className="btn btn-primary mt-5"> Add From csv</button>
          {/* <button className="btn btn-success mt-5"> Add </button> */}

          <AddCategoryModal />
          {/* </div> */}
        </div>

        <div className="row justify-content-center ">
          {/* <InputPackage /> */}
          <div className="container">
            <div className="table-responsive">
              <CategoriesList />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default PackagesListcomp;
