import React, { Fragment, useEffect, useState, useContext } from "react";
import { SubcatsContext } from "../../../App";
import EditProduct from "./EditProduct";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

import NewProductsList from "./NewProductsList";
import UploadMultiple from "../../newpages/components/UploadMultiple";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [subcats, setSubcats] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  // console.log("subcatshere", subcats);

  const toggleDetails = (product) => {
    setSelectedProduct(selectedProduct === product ? null : product);
  };

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
        import.meta.env.VITE_API_URL + "/api/product/" + product_id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
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
        import.meta.env.VITE_API_URL + "/api/product?include=productimage",
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
        if (a.size === null) {
          return 1;
        } else if (b.size === null) {
          return -1;
        } else {
          return a.size - b.size;
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

  const searchPID = async (e) => {
    e.preventDefault();

    if (e.target.value === "") {
      getProducts();
    } else {
      // set search term from e
      const searchTerm = e.target.value;
      console.log("searchTerm is: ", searchTerm);

      // filter products by search term
      const filteredProducts = products.filter((product) => {
        // Convert product_id to a string before comparing
        return product.product_id.toString().includes(searchTerm);
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
          import.meta.env.VITE_API_URL + "/api/saleitem",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
          }
        );

        const jsonData = await response.data;

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

  const addProduct = async (e) => {
    const brandInput = document.getElementById("brandInput").value;
    const modelInput = document.getElementById("modelInput").value;
    const sizeInput = document.getElementById("sizeInput").value;
    const product_nameInput =
      document.getElementById("product_nameInput").value;
    const subcategory_idInput = document.getElementById(
      "subcategory_idInput"
    ).value;
    const priceInput = document.getElementById("priceInput").value;
    const costInput = document.getElementById("costInput").value;
    const descriptionInput = document.getElementById("descriptionInput").value;

    console.log("brnadinput is", brandInput);

    const addProduct = await axios.post(
      import.meta.env.VITE_API_URL + "/api/product",
      {
        brand: brandInput,
        model: modelInput,
        size: sizeInput,
        product_name: product_nameInput,
        subcategory_id: subcategory_idInput,
        price: priceInput,
        cost: costInput,
        description: descriptionInput,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );
    console.log("addproduct is: ", addProduct);
    alert("added Product");
    getProducts();
  };

  const setBarcode = async (product_id) => {
    console.log("setbarcode called", product_id);

    // take in text input
    const barcodeInput = prompt("Please enter barcode", "Barcode");

    console.log("barcodeinput is: ", barcodeInput);

    // update barcode property of product where product_id = product_id
    const updateBarcode = await axios.put(
      import.meta.env.VITE_API_URL + "/api/product/" + product_id,
      {
        barcode: barcodeInput,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    // set barcode in products state
    setProducts(
      products.map((product) =>
        product.product_id === product_id
          ? { ...product, barcode: barcodeInput }
          : product
      )
    );
  };

  return (
    <Fragment>
      <div className="input-group sticky-top mb-2 col-6">
        <div className="input-group-prepend mb-3 mr-3">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search Product ID"
            onChange={searchPID}
          />
        </div>

        <input
          type="text"
          className="form-control form-control-sm mb-3 mx-auto"
          placeholder="Search Products"
          onChange={search}
        />
      </div>

      <div className="container mb-5 col-md-9">
        <ul className="list-group">
          {products.map((product) => (
            <Fragment key={product.product_id}>
              <li
                className="list-group-item mt-4"
                style={{ cursor: "pointer" }}
                onClick={() => toggleDetails(product)}
              >
                <h5>
                  {product.product_id}: {product.product_name}
                </h5>
                <p>Price: {product.price}K</p>
                {product.barcode ? (
                  <p>Barcode: {product.barcode}</p>
                ) : (
                  // {/* set barcode button */}
                  <button
                    className="btn  btn-sm"
                    onClick={() => {
                      setBarcode(product.product_id);
                    }}
                  >
                    Set Barcode
                  </button>
                )}
              </li>

              {selectedProduct === product && (
                <li className="list-group-item">
                  <h5>Description: {product.description}</h5>
                  <p>Brand: {product.brand}</p>
                  <p>Model: {product.model}</p>
                  <p>Size: {product.size}</p>
                  <p>Subcategory: {product.subcategory_id}</p>
                  <p>Product ID: {product.product_id}</p>
                  <p>Cost: {product.cost}</p>
                  {/* <p>Barcode: {product.barcode}</p> */}
                  <div>
                    {product.productimages && (
                      <Fragment>
                        {product.productimages.map((image, index) => (
                          <img
                            key={index}
                            src={
                              "https://zahab-bucket.sfo3.digitaloceanspaces.com/" +
                              image.image
                            } // Assuming `image` is the URL
                            alt={image.image + "img"}
                            style={{
                              display: "inline-block",
                              marginRight: "10px", // Add margin as needed
                              maxWidth: "100px",
                              maxHeight: "100px",
                            }}
                          />
                        ))}
                      </Fragment>
                    )}
                  </div>
                  {/* <p>Images: {product.productimages}</p> */}
                  <UploadMultiple product_id={product.product_id} />

                  {/* Add more details as needed */}
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default ListProducts;
