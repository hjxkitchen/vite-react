import React, { Fragment } from "react";

//components
// import InputSupplier from "../../components/InputSupplier";
import ListSuppliers from "./components/SuppliersList";
import Navbar from "../../../../system/Navbar";
import AddSupplierModal from "./components/AddSupplierModal";
// import EditSupplier from "admin/suppliers/EditSupplier";

function SuppliersList() {
  return (
    <Fragment>
      <Navbar />
      <div class="row justify-content-center ">
        <div class="col-md-9">
          <h1 className="text-center mt-5">Suppliers</h1>
        </div>
        <div class="col-md-3 my-auto justify-content-center">
          <button class="btn btn-primary"> Add From csv</button>

          <AddSupplierModal />
        </div>
      </div>
      {/* <InputSupplier /> */}
      <ListSuppliers />
    </Fragment>
  );
}

export default SuppliersList;
