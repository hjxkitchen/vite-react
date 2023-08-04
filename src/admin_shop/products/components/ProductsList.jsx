import React, { Fragment, useEffect, useState, useContext } from "react";
import { SubcatsContext } from "../../../App";
import EditProduct from "./EditProduct";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [subcats, setSubcats] = useState([]);
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  // console.log("subcatshere", subcats);

  const getSubcats = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/subcategory",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      setSubcats(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

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
          "/api/product?include=supplier,productimage",
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

  const [supplierNames, setSupplierNames] = useState([]);

  const getSupplierNames = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL +
          "/api/attr/supplier?attributes=supplier_id,supplier_name",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      console.log("suppliersnames", response.data);
      setSupplierNames(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProducts();
    getSupplierNames();
    getSubcats();
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

  const user = Cookies.get(import.meta.env.VITE_COOKIE_NAME)
    ? jwtDecode(token).user_id
    : null;

  // add to sale cart
  const addToCart = (e) => {
    console.log("addtocart ");
    if (user === null) {
      const func = async () => {
        // const addtocart = await axios.post(
        //   "http://localhost:000/carts/token",
        //   {
        //     token: cartToken,
        //     product_id: e.product_id,
        //     quantity: 1,
        //     price: e.price,
        //   }
        // );
        // add to local storage
        const addtocart = localStorage.setItem(
          "cart",
          JSON.stringify({
            token: cartToken,
            product_id: e.product_id,
            quantity: 1,
            price: e.price,
          })
        );
        console.log("addtocart is: ", addtocart);
      };
      func();
      alert("added to cart with carttoken");
    } else {
      const func = async () => {
        // get userid
        console.log("userrered id is: ", user);

        const user_id = jwtDecode(token).user_id;
        console.log("user_id is: ", user_id);

        // const addtocart = await axios.post("http://localhost:000/carts", {
        //   user_id: user_id,
        //   product_id: e.product_id,
        //   quantity: 1,
        //   price: e.price,
        // });

        // check if already in cart
        const checkcart = await axios.get(
          import.meta.env.VITE_API_URL +
            "/api/user/" +
            user_id +
            "?include=cart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
          }
        );
        console.log("checkcart is: ", checkcart.data.carts);

        // Find the cart item with the matching product_id
        const cartItem = checkcart.data.carts.find(
          (cart) => cart.product_id === e.product_id
        );

        if (cartItem) {
          console.log("cartItem is: ", cartItem);
          // If the product already exists in the cart, update the quantity
          const updatecart = await axios.put(
            import.meta.env.VITE_API_URL + "/api/cart/" + cartItem.cart_id,
            {
              user_id: cartItem.user_id,
              product_id: cartItem.product_id,
              quantity: cartItem.quantity + 1,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "x-api-key": import.meta.env.VITE_API_KEY,
              },
            }
          );
          console.log("updatecart is: ", updatecart);
          alert("added to cart qty with user");
        } else {
          // If the product is not in the cart, add it with quantity 1
          const addtocart = await axios.post(
            import.meta.env.VITE_API_URL + "/api/cart",
            {
              user_id: user_id,
              product_id: e.product_id,
              quantity: 1,
              price: e.price,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "x-api-key": import.meta.env.VITE_API_KEY,
              },
            }
          );
          console.log("addtocart is: ", addtocart);
          alert("added to cart with user");
        }
      };
      func();
    }
  };

  // add to order cart
  const addToOrderCart = (e) => {
    console.log("addtocart ");
    if (user === null) {
      const func = async () => {
        // const addtocart = await axios.post(
        //   "http://localhost:000/carts/token",
        //   {
        //     token: cartToken,
        //     product_id: e.product_id,
        //     quantity: 1,
        //     price: e.price,
        //   }
        // );
        // add to local storage
        const addtocart = localStorage.setItem(
          "cart",
          JSON.stringify({
            token: cartToken,
            product_id: e.product_id,
            quantity: 1,
            price: e.price,
          })
        );
        console.log("addtocart is: ", addtocart);
      };
      func();
      alert("added to cart with carttoken");
    } else {
      const func = async () => {
        // get userid
        console.log("userrered id is: ", user);

        const user_id = jwtDecode(token).user_id;
        console.log("user_id is: ", user_id);

        // const addtocart = await axios.post("http://localhost:000/carts", {
        //   user_id: user_id,
        //   product_id: e.product_id,
        //   quantity: 1,
        //   price: e.price,
        // });

        // check if already in cart
        const checkcart = await axios.get(
          import.meta.env.VITE_API_URL +
            "/api/user/" +
            user_id +
            "?include=ordercart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
          }
        );
        console.log("checkcart is: ", checkcart.data.ordercarts);

        // Find the cart item with the matching product_id
        const cartItem = checkcart.data.ordercarts.find(
          (cart) => cart.product_id === e.product_id
        );

        if (cartItem) {
          console.log("cartItem is: ", cartItem);
          // If the product already exists in the cart, update the quantity
          const updatecart = await axios.put(
            import.meta.env.VITE_API_URL +
              "/api/ordercart/" +
              cartItem.order_cart_id,
            {
              user_id: cartItem.user_id,
              product_id: cartItem.product_id,
              quantity: cartItem.quantity + 1,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "x-api-key": import.meta.env.VITE_API_KEY,
              },
            }
          );
          console.log("updatecart is: ", updatecart);
          alert("added to cart qty with user");
        } else {
          // If the product is not in the cart, add it with quantity 1
          const addtocart = await axios.post(
            import.meta.env.VITE_API_URL + "/api/ordercart",
            {
              user_id: user_id,
              product_id: e.product_id,
              quantity: 1,
              price: e.price,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "x-api-key": import.meta.env.VITE_API_KEY,
              },
            }
          );
          console.log("addtocart is: ", addtocart);
          alert("added to cart with user");
        }
      };
      func();
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
              <th>Product ID</th>

              <th>Size</th>
              <th>Model</th>
              <th>Product Name</th>

              <th>Subcat</th>
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

              <th>Cost</th>
              <th>Description</th>
              <th>Supplier</th>

              <th>Images</th>
              <th>Add to Sale</th>
              <th>Add to Order</th>
              {/* <th>Shop</th> */}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>

                <td>{product.size} </td>
                <td> {product.model}</td>
                <td>{product.product_name}</td>

                <td>
                  {/* {product.subcat_id} */}
                  {/* filter subcats */}
                  {subcats === null
                    ? " - "
                    : subcats
                        .filter(
                          (subcat) =>
                            subcat.subcategory_id === product.subcategory_id
                        )
                        .map((subcat) => (
                          <div key={subcat.subcategory_id}>
                            {subcat.subcategory_name}
                          </div>
                        ))}
                </td>
                <td>{product.price}K</td>
                <td>{product.cost}K</td>
                <td>{product.description} </td>
                <td>
                  {product.supplier ? product.supplier.supplier_name : " - "}
                </td>

                <td>
                  <div class="d-flex justify-content-center">
                    {/* <h5>{product.images.length + "="}</h5> */}
                    {/* for each path in images array create link */}
                    {product.productimages?.map((image, index) => (
                      // <a href={"http://localhost:000" + path} key={index}>
                      <a
                        href={
                          "https://zahab-space.sfo3.digitaloceanspaces.com/" +
                          image.image
                        }
                        key={index}
                      >
                        {/* thumbnail */}
                        <img
                          // src={"http://localhost:000" + path}
                          src={
                            "https://zahab-space.sfo3.digitaloceanspaces.com/" +
                            image.image
                          }
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
                  <button
                    class="btn btn-success"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </td>
                <td>
                  <button
                    class="btn btn-success"
                    onClick={() => addToOrderCart(product)}
                  >
                    Add to OrderCart
                  </button>
                </td>
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
