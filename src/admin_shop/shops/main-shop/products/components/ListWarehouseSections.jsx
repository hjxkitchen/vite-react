import React, { Fragment, useEffect, useState, useContext } from "react";
import { SubcatsContext } from "../../../../../App";
import EditProduct from "./EditProduct";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const subcats = useContext(SubcatsContext);
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  // console.log("subcatshere", subcats);

  //delete product function defined
  const deleteProduct = async (product_id) => {
    try {
      // const deleteProduct = await fetch(
      //   `http://localhost:000/products/${product_id}`,
      //   {
      //     method: "DELETE",
      //   }
      // );
      const deleteProduct = await axios.delete(
        import.meta.env.VITE_APP_API_URL + "/api/Product/" + product_id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_APP_API_KEY,
          },
        }
      );

      setProducts(
        products.filter((product) => product.product_id !== product_id)
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  //get products function defeined
  const getProducts = async () => {
    try {
      console.log("getProducts called");
      // const response = await fetch("http://localhost:000/products");
      const response = await axios.get(
        import.meta.env.VITE_API_URL +
          "/api/warehousesectionitem?include=warehousesection,supplierproduct",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      const jsonData = await response.data;
      console.log("products", response.data);
      // sort prods by prod id
      // jsonData.sort((a, b) => (a.product_id > b.product_id) ? -1 : 1);
      const sortedProducts = jsonData.sort((a, b) => {
        if (a.inventory === null) {
          return 1;
        } else if (b.inventory === null) {
          return -1;
        } else {
          return a.inventory - b.inventory;
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const search = async (e) => {
    e.preventDefault();

    if (e.target.value === "") {
      getProducts();
    } else {
      // set search term from e
      const searchTerm = e.target.value;
      console.log("searchTerm is: ", searchTerm);

      // filter products by search term
      const filteredProducts = products.filter((product) => {
        return product.product_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      // set products to filtered products
      setProducts(filteredProducts);
    }
  };

  const [invsorted, setInvsorted] = useState(false);
  const [idsorted, setIdsorted] = useState(false);

  const sortbyid = async (e) => {
    e.preventDefault();
    if (idsorted === false) {
      const sortedProducts = products.sort((a, b) => {
        return a.product_id - b.product_id;
      });
      setProducts(sortedProducts);
      setIdsorted(true);
    } else {
      const sortedProducts = products.sort((a, b) => {
        return b.product_id - a.product_id;
      });
      setProducts(sortedProducts);
      setIdsorted(false);
    }
  };

  const sortinv = async (e) => {
    e.preventDefault();

    if (invsorted === false) {
      // sort by inventory
      const sortedProducts = products.sort((a, b) =>
        a.inventory > b.inventory ? 1 : -1
      );

      setProducts(sortedProducts);
      setInvsorted(true);
    } else {
      getProducts();
      setInvsorted(false);
    }
  };

  const [salessorted, setSalessorted] = useState(false);
  //   bestselling products
  // get all sales items
  const getBestselling = async () => {
    if (salessorted === false) {
      try {
        console.log("sales items");
        // const response = await fetch("http://localhost:000/allsaleitems");
        const response = await axios.get(
          import.meta.env.VITE_APP_API_URL + "/api/SaleItem",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": import.meta.env.VITE_APP_API_KEY,
            },
          }
        );

        const jsonData = await response.json();

        // from saleitems rank products by total quantity sold across all sales

        // find total of each product sold
        const totalSold = jsonData.reduce((acc, item) => {
          if (acc[item.product_id]) {
            acc[item.product_id] += item.quantity;
          } else {
            acc[item.product_id] = item.quantity;
          }
          return acc;
        }, {});

        // convert to array
        const totals = Object.entries(totalSold);

        // sort by total quantity sold
        const sortedTotals = totals.sort((a, b) => (a[1] > b[1] ? -1 : 1));

        // turn prod id to integer
        const sortedTotalsInt = sortedTotals.map((item) => {
          return [parseInt(item[0]), item[1]];
        });

        // setProducts(sortedTotals);
        console.log("sortedtotals:", sortedTotalsInt);

        // sort products by sortedtotals
        const sortedProducts = products.sort((a, b) => {
          // for each product in products, find the index of the product in sortedtotals
          const aIndex = sortedTotalsInt.findIndex(
            (item) => item[0] === a.product_id
          );
          const bIndex = sortedTotalsInt.findIndex(
            (item) => item[0] === b.product_id
          );
          // if aIndex is -1, it means the product is not in sortedtotals, so it should be at the end of the list
          if (aIndex === -1) {
            return 1;
          }
          // if bIndex is -1, it means the product is not in sortedtotals, so it should be at the end of the list
          if (bIndex === -1) {
            return -1;
          }
          // if aIndex is greater than bIndex, a should be higher in the list
          if (aIndex > bIndex) {
            return 1;
          }
          // if bIndex is greater than aIndex, b should be higher in the list
          if (bIndex > aIndex) {
            return -1;
          }
          // if aIndex and bIndex are the same, they should be in the same order
          return 0;
        });

        console.log("sorted products", sortedProducts);

        // add total sold to product name
        const sortedProductsTotals = sortedProducts.map((product) => {
          const productIndex = sortedTotalsInt.findIndex(
            (item) => item[0] === product.product_id
          );
          if (productIndex === -1) {
            return product;
          }
          const total = sortedTotalsInt[productIndex][1];
          return {
            ...product,
            product_name: `${product.product_name} (${total})`,
          };
        });

        setProducts(sortedProductsTotals);

        // setProducts(sortedProducts);

        setSalessorted(true);

        // get top 5 products
        // const top5 = sortedTotals.slice(0, 5);
        // console.log("top5", top5);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      getProducts();
      setSalessorted(false);
    }
  };

  return (
    <Fragment>
      <div class="table-responsive table-striped">
        <table class="table text-center">
          <thead>
            <tr>
              {/* <th>Warehouse Section Item ID</th> */}
              <th>Warehouse Product</th>
              <th>Warehouse Section </th>
              <th>Quantity</th>

              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.warehouse_section_item_id}>
                {/* <td>{product.warehouse_section_item_id}</td> */}
                {/* <td>{product.supplier_product_id}</td> */}
                <td>{product.supplierproduct.supplier_product_name}</td>
                {/* <td>{product.warehouse_section_id}</td> */}
                <td>{product.warehousesection.warehouse_section_name}</td>
                <td>{product.quantity}</td>

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
      {/* </div> */}
    </Fragment>
  );
};

export default ListProducts;
