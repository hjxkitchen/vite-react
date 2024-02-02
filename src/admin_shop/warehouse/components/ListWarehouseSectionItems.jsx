import React, { Fragment, useEffect, useState, useContext } from "react";
import { ProdContext } from "../../../App";
import EditProduct from "../../products/components/EditProduct";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";

import EditWarehouseSectionItemModal from "./EditWarehouseSectionItemModal";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  const [warehouseSections, setWarehouseSections] = useState([]);

  const { id } = useParams();

  //get products function defeined
  const getProducts = async () => {
    try {
      console.log("getProducts called");
      // const response = await fetch("http://localhost:000/products");
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/warehousesectionitems/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      const jsonData = await response.data;
      console.log("whsecitems", response.data);

      setProducts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const prodNames = useContext(ProdContext);

  // get warehouse details
  const getWarehouseDetails = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/warehouse/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      console.log("warehouse details", response.data);

      if (response.data.warehousesections.length > 0) {
        setWarehouseSections(response.data.warehousesections);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProducts();
    getWarehouseDetails();
  }, []);

  return (
    <Fragment>
      <div class="table table-striped">
        <div className="row justify-content-center">
          <div className="col-6">
            <table class="table text-center">
              <thead>
                <tr>
                  {/* <th>Warehouse Section Item ID</th> */}
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Section </th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td>Panel 50W</td>
                  <td>10</td>
                  <td>Section 1</td>
                </tr> */}

                {products?.map((product) => (
                  <tr>
                    {/* <td>{product.warehouse_section_item_id}</td> */}
                    {/* <td>{product.product_id}</td> */}
                    <td>
                      {/* get name from prodnames */}
                      {prodNames
                        ?.filter(
                          (prod) => prod.product_id === product.product_id
                        )
                        .map((prod) => prod.product_name)}
                    </td>
                    {/* <td>{product.supplier.supplier_product_name}</td> */}
                    {/* <td>{product.warehousesection.warehouse_section_name}</td> */}
                    <td>{product.quantity}</td>
                    {/* <td>{product.warehouse_section_id}</td> */}
                    <td>
                      {/* get name from prodnames */}
                      {warehouseSections
                        ?.filter(
                          (prod) =>
                            prod.warehouse_section_id ===
                            product.warehouse_section_id
                        )
                        .map((prod) => prod.warehouse_section_name)}
                    </td>

                    <td>
                      {/* <Link>
                        <button class="btn btn-warning">Edit</button>
                      </Link> */}
                      <EditWarehouseSectionItemModal
                        product={product}
                        getProducts={getProducts}
                      />
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
