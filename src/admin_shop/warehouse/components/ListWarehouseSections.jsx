import React, { Fragment, useEffect, useState, useContext } from "react";
import { SubcatsContext } from "../../../App";
import EditProduct from "../../products/components/EditProduct";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const subcats = useContext(SubcatsContext);
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  //get warehouse id from url
  const { id } = useParams();

  //get products function defeined
  const getProducts = async () => {
    try {
      console.log("getProducts called");
      // const response = await fetch("http://localhost:000/products");
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/warehouse/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      const jsonData = await response.data;
      console.log("products", response.data.warehousesections);

      if (response.data.warehousesections.length > 0) {
        setProducts(response.data.warehousesections);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Fragment>
      <div class="table table-striped">
        <div class="row justify-content-center">
          <div class="col-6">
            <table class="table text-center">
              <thead>
                <tr>
                  {/* <th>Warehouse Section Item ID</th> */}
                  <th>Section</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td>Section 1</td>
                </tr> */}

                {products.length > 0 &&
                  products.map((product) => (
                    <tr key={product.warehouse_section_id}>
                      <td>{product.warehouse_section_name}</td>

                      <td>
                        <Link to={`/warehouse/${product.warehouse_id}`}>
                          <button class="btn btn-warning">Edit</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* </div> */}
    </Fragment>
  );
};

export default ListProducts;
