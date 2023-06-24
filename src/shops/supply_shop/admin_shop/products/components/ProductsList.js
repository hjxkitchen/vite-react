import React, { Fragment, useEffect, useState, useContext } from "react";
import { SubcatsContext } from "../../../../../index";
import EditProduct from "./EditProduct";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const subcats = useContext(SubcatsContext);
  // console.log("subcatshere", subcats);

  //delete product function defined
  const deleteProduct = async (product_id) => {
    try {
      const deleteProduct = await fetch(
        `http://localhost:5000/products/${product_id}`,
        {
          method: "DELETE",
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
      const response = await fetch("http://localhost:5000/products");
      const jsonData = await response.json();
      // sort prods by prod id
      // jsonData.sort((a, b) => (a.product_id > b.product_id) ? -1 : 1);
      console.log("products", products);
      const sortedProducts = jsonData.sort((a, b) => {
        if (a.inventory === null) {
          return 1;
        } else if (b.inventory === null) {
          return -1;
        } else {
          return a.inventory - b.inventory;
        }
      });
      setProducts(sortedProducts);
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
        const response = await fetch("http://localhost:5000/allsaleitems");
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
      {/* search  */}
      {/* <div class="justify-content-center mt-3 mb-5  sticky-top"> */}
      <div class="input-group sticky-top mb-5">
        <input
          type="text"
          class="form-control"
          onChange={search}
          placeholder="Search Products"
          aria-label="Search"
          aria-describedby="basic-addon1"
        />
        {/* <br/>
        <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button">Button</button>
  </div> */}
      </div>
      {/* </div> */}

      {/* <div class="container col-md-9 d-flex justify-content-center"> */}
      {/* <h2>Products Table</h2> */}
      {/* <p>The .table class adds basic styling (light padding and horizontal dividers) to a table:</p>             */}

      <div class="table-responsive table-striped">
        <table class="table text-center">
          <thead>
            <tr>
              <th>
                {" "}
                {/* sort btn */}
                <button
                  type="button"
                  class="btn btn-sm ml-2"
                  onClick={sortbyid}
                >
                  <i class="fas fa-sort-down">ID Sort</i>
                </button>
                Product ID
              </th>
              <th>Product Name</th>
              <th>
                {/* <div class="d-flex justify-content-center"> */}
                {/* sort btn */}
                <button
                  type="button"
                  class="btn btn-sm ml-2"
                  onClick={getBestselling}
                >
                  <i class="fas fa-sort-down">Bestselling</i>
                </button>
                Price
                {/* </div> */}
              </th>
              <th>
                {/* d-flec */}
                <div class="d-flex justify-content-center">
                  Inventory
                  {/* sort btn */}
                  <button
                    type="button"
                    class="btn btn-sm ml-2"
                    onClick={sortinv}
                  >
                    <i class="fas fa-sort-down"></i>
                  </button>
                </div>
              </th>
              <th>Cost</th>
              <th>Subcat</th>
              <th>Description</th>
              <th>Images</th>
              {/* <th>Shop</th> */}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.product_name}</td>
                <td>{product.price}K</td>
                <td>{product.inventory}</td>
                <td>
                  {/* prod price + 0.7 rounded up */}
                  {/* {Math.ceil(product.price * 0.7)}K */}
                  getfromlastorder
                </td>
                <td>
                  {/* {product.subcat_id} */}
                  {/* filter subcats */}
                  {subcats === null
                    ? "loading"
                    : subcats
                        .filter(
                          (subcat) => subcat.subcat_id === product.subcat_id
                        )
                        .map((subcat) => (
                          <div key={subcat.subcat_id}>{subcat.subcat_name}</div>
                        ))}
                </td>
                <td>{product.description}</td>
                <td>
                  <div class="d-flex justify-content-center">
                    {/* <h5>{product.images.length + "="}</h5> */}
                    {/* for each path in images array create link */}
                    {product.images.map((path, index) => (
                      <a href={"http://localhost:5000" + path} key={index}>
                        {/* thumbnail */}
                        <img
                          src={"http://localhost:5000" + path}
                          alt="[img]"
                          width="50"
                          height="50"
                        />
                      </a>
                    ))}
                  </div>
                </td>
                {/* <td> 
                        <input type="checkbox" checked={product.shop==true&&"true"}></input>
                    </td> */}
                <td>
                  <EditProduct product={product} />
                </td>
                <td>
                  <button
                    class="btn btn-danger"
                    onClick={() => deleteProduct(product.product_id)}
                  >
                    Delete
                  </button>
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