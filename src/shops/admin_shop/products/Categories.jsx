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
        <div class="row justify-content-center ">
          <div class="col-md-12">
            <h1 className="text-center mt-5">Categories</h1>
          </div>
        </div>

        <div class="row justify-content-center ">
          {/* <div class="col-md-3 my-auto justify-content-center"> */}

          <button class="btn btn-primary mt-5"> Add From csv</button>
          {/* <button class="btn btn-success mt-5"> Add </button> */}

          <AddCategoryModal />
          {/* </div> */}
        </div>

        <div class="row justify-content-center ">
          {/* <InputPackage /> */}
          <div class="container">
            <div class="table-responsive">
              <CategoriesList />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default PackagesListcomp;
