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
        <div className="row justify-content-center ">
          <div className="col-md-12">
            <h1 className="text-center mt-5">Featured</h1>
          </div>
        </div>

        <div className="row justify-content-center ">
          {/* <div className="col-md-3 my-auto justify-content-center"> */}

          <button className="btn btn-primary mt-5"> Add From csv</button>

          <AddFeaturedModal />
          {/* </div> */}
        </div>

        <div className="row justify-content-center ">
          {/* <InputFeatured /> */}
          <div className="col-md-12 ml-5">
            <FeaturedList />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default FeaturedListcomp;
