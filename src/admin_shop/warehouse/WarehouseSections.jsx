import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

//components
// import InputProduct from "InputProduct";
import ListWarehouseSections from "./components/ListWarehouseSections";
import Navbar from "../../system/Navbar";
import AddProductModal from "../products/components/AddProductModal";
// import EditProduct from "../admin/products/EditProduct";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  //   get warehouse id from url
  const { id } = useParams();

  return (
    <Fragment>
      <Navbar />
      <div className="container text-center p-3">
        <div class="row justify-content-center ">
          <div class="col-md-12">
            <h1 className="text-center mt-5">Warehouse {id} Sections</h1>
          </div>
        </div>

        <div class="d-flex justify-content-center ">
          {/* <div class="col-md-3 my-auto justify-content-center"> */}

          <AddProductModal />
          {/* </div> */}
          <button class="btn btn-warning ml-5 mt-5 ">Edit</button>
        </div>

        <div class="row justify-content- mt-5 ">
          {/* <InputProduct /> */}
          {/* <div class="col-md-12 ml-5"> */}
          <ListWarehouseSections />
          {/* </div> */}
        </div>
      </div>
    </Fragment>
  );
}

export default ProductsList;
