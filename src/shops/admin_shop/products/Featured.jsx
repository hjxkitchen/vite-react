import React, { Fragment } from "react";

//components
// import InputFeatured from "../../../components/InputFeatured";
import FeaturedList from "./components/FeaturedList";
import Navbar from "../Navbar";
import AddFeaturedModal from "./components/AddFeaturedModal";
// import EditFeatured from "../../../../components/admin/featured/EditFeatured";

function FeaturedListcomp() {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <div class="row justify-content-center ">
          <div class="col-md-12">
            <h1 className="text-center mt-5">Featured</h1>
          </div>
        </div>

        <div class="row justify-content-center ">
          {/* <div class="col-md-3 my-auto justify-content-center"> */}

          <button class="btn btn-primary mt-5"> Add From csv</button>

          <AddFeaturedModal />
          {/* </div> */}
        </div>

        <div class="row justify-content-center ">
          {/* <InputFeatured /> */}
          <div class="col-md-12 ml-5">
            <FeaturedList />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default FeaturedListcomp;
