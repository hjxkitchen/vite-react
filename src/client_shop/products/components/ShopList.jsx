import axios from "axios";
import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext, CartContext } from "../../../App";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const ShopList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const searchProds = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter products based on the search query
    const filtered = products.filter((product) =>
      product.product_name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  // const user = useContext(UserContext);
  const cartToken = useContext(CartContext);
  // get token from cookie
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME)
    ? Cookies.get(import.meta.env.VITE_COOKIE_NAME)
    : "guest";

  const user = Cookies.get(import.meta.env.VITE_COOKIE_NAME)
    ? jwtDecode(token).user_id
    : null;

  // console.log("token ssis: ", token);
  // const useremail = user.email;
  //get products function defeined
  const getProducts = async () => {
    try {
      // const response = await fetch("http://localhost:000/products");
      console.log("prods", token);
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/product?include=productimage",
        {
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      console.log("prods2", response.data);
      // const data = response;

      const sortedProducts = response.data.sort((a, b) => {
        if (a.size === null) {
          return 1;
        } else if (b.size === null) {
          return -1;
        } else {
          return a.size - b.size;
        }
      });

      // setProducts(response.data);
      setProducts(sortedProducts);

      setFilteredProducts(sortedProducts);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProducts();
    setFilteredProducts(products);
  }, []);

  const addToCart = (e) => {
    if (user === null) {
      // const func = async () => {

      //   // add to local storage
      //   const addtocart = localStorage.setItem(
      //     "cart",
      //     JSON.stringify({
      //       token: cartToken,
      //       product_id: e.product_id,
      //       quantity: 1,
      //       price: e.price,
      //     })
      //   );
      //   console.log("addtocart is: ", addtocart);
      // };
      // func();
      alert("Please Log In First!");
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
          alert("Updated in Cart!");
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
          alert("Added to Cart!");
        }
      };
      func();
    }
  };

  // const addtocart = (event) => {
  //     event.preventDefault();

  //     if(loccart === null){
  //       array.push(inputs);
  //       localStorage.setItem("cart", JSON.stringify(array));
  //     }else{
  //       loccart.push(inputs);
  //       localStorage.setItem("cart", JSON.stringify(loccart));
  //     }

  //     window.location.reload();

  //   };

  const favorite = async (e) => {
    console.log("e is: ", e);
    // get user_id from usersessions

    if (token == "guest") {
      alert("Please Log In First!");
    }

    const user_id = jwtDecode(token).user_id;
    console.log("user is: ", user_id);
    // console.log("user_id is: ", user_id);

    // const result = await axios.post("http://localhost:000/favorites", {
    //   user: user_id,
    //   product: e,
    // });

    // old
    // const result = await axios.post(
    //   import.meta.env.VITE_API_URL + "/api/favorite",
    //   {
    //     user: user_id,
    //     product: e,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "x-api-key": import.meta.env.VITE_API_KEY,
    //     },
    //   }
    // );
    // alert

    // new
    try {
      const result = await axios.post(
        import.meta.env.VITE_API_URL + "/api/favorite",
        {
          user_id: user_id,
          product_id: e,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      console.log("result is: ", result);
      alert("Added to Favorites!");
      return result;
    } catch (error) {
      // if error code is 23505 (duplicate key value violates unique constraint)
      // if (error.code === "23505") {
      alert("Already in Favorites!");
      // }
    }
  };

  const searchprods = async (e) => {
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

  return (
    <Fragment>
      <div class="container">
        {/* input type text */}
        <div
          class="row justify-content-center mt-3 mb-5  sticky-top"
          style={{
            zIndex: 900,
            top: "100px",
          }}
        >
          {/* Search input and button */}
          <div className="input-group col-md-6">
            <input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={searchProds}
              placeholder="Search Products"
              aria-label="Search"
              aria-describedby="basic-addon1"
            />
            {/* <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                Search
              </button>
            </div> */}
          </div>
        </div>

        <div class="row">
          {filteredProducts.map((product) => (
            <div class=" col-md-4 col-sm-6">
              <div class="card mt-3">
                <div class="card-body">
                  {/* title */}
                  <a href={"/shop/products/" + product.product_id}>
                    <h1 class="card-title mb-4 text-center">
                      {product.product_name}
                    </h1>
                  </a>

                  {/* image */}
                  {product.productimages !== null && (
                    // <img
                    //   src={`http://localhost:000${product.productimagess[0]}`}
                    //   class="img-fluid"
                    //   alt="Card image"
                    // ></img>
                    <div
                      id={"carouselExampleControls" + product.product_id}
                      class="carousel slide"
                      data-ride="false"
                      data-interval="false"
                    >
                      <div class="carousel-inner">
                        {product.productimages.map((image, index) => (
                          // if index is 0, add active class
                          <div
                            class={
                              index === 0
                                ? "carousel-item active"
                                : "carousel-item"
                            }
                          >
                            <img
                              class="d-block w-100"
                              style={{
                                objectFit: "cover",
                                height: "350px",
                              }}
                              // src={`http://localhost:000${image}`}
                              src={
                                "https://zahab-bucket.sfo3.digitaloceanspaces.com/" +
                                image.image
                              }
                              alt="First slide"
                            />
                          </div>
                        ))}
                      </div>
                      <a
                        class="carousel-control-prev"
                        href={"#carouselExampleControls" + product.product_id}
                        role="button"
                        data-slide="prev"
                      >
                        <span
                          class="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span class="sr-only">Previous</span>
                      </a>
                      <a
                        class="carousel-control-next"
                        href={"#carouselExampleControls" + product.product_id}
                        role="button"
                        data-slide="next"
                      >
                        <span
                          class="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span class="sr-only">Next</span>
                      </a>
                    </div>
                  )}
                  {product.productimages.length < 1 && (
                    <div className="d-flex justify-content-center">
                      <img
                        style={{
                          objectFit: "cover",
                          height: "350px",
                        }}
                        src="/productimg.jpg"
                        className="img-fluid mx-auto"
                        alt="Card image"
                      />
                    </div>
                  )}

                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>

                  <div class="d-flex justify-content-center mb-2">
                    <h4>{product.price}K Tshs</h4>
                  </div>

                  {/* <div class="justify-content-center"> */}
                  <div class="row mb-3 justify-content-center">
                    {/* <div class="col-lg-2 ml-5 mr-5 mb-2"> */}
                    <button
                      class="btn btn-danger"
                      onClick={() => favorite(product.product_id)}
                    >
                      {" "}
                      <i class="fas fa-heart fa-lg mr-1"> </i> Fav
                    </button>
                    {/* </div> */}
                    {/* <div class="col-lg-2 ml-3"> */}
                    <button
                      class="btn btn-primary"
                      onClick={() => addToCart(product)}
                    >
                      {" "}
                      <i class="fas fa-shopping-cart fa-lg mr-1"> </i> Cart
                    </button>
                    {/* </div> */}
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default ShopList;
