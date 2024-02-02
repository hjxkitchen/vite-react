import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

//components
// import InputProduct from "InputProduct";
import ListWarehouseSectionItems from "./components/ListWarehouseSectionItems";
import Navbar from "../../system/Navbar";
import AddWarehouseSectionItemModal from "./components/AddWarehouseSectionItemModal";
// import EditProduct from "../admin/products/EditProduct";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  //   get warehouse id from url
  const { id } = useParams();

  const getWarehouseDetails = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/warehouse/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      console.log("warehouse details", response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getWarehouseDetails();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className="container text-center p-3">
        <div class="row justify-content-center ">
          <div class="col-md-12">
            <h1 className="text-center mt-5">Warehouse {id} Section Items</h1>
          </div>
        </div>

        <div class="d-flex justify-content-center ">
          {/* <div class="col-md-3 my-auto justify-content-center"> */}

          <AddWarehouseSectionItemModal />
          {/* </div> */}
          {/* <button class="btn btn-warning ml-5 mt-5 ">Edit</button> */}
          <Link to={"/warehouse/sections/" + id}>
            <button class="btn btn-warning ml-5 mt-5 ">Sections</button>
          </Link>
        </div>

        <div class="row justify-content- mt-5 ">
          {/* <InputProduct /> */}
          {/* <div class="col-md-12 ml-5"> */}
          <ListWarehouseSectionItems />
          {/* </div> */}
        </div>
      </div>
    </Fragment>
  );
}

export default ProductsList;
