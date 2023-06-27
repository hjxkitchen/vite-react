import axios from "axios";
import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext, CartContext } from "../../../App";

const ShopList = (token) => {
  const [products, setProducts] = useState([]);

  const user = useContext(UserContext);
  const cartToken = useContext(CartContext);

  // const useremail = user.email;
  //get products function defeined
  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products");
      const jsonData = await response.json();
      setProducts(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addToCart = (e) => {
    if (user === null) {
      const func = async () => {
        const addtocart = await axios.post(
          "http://localhost:5000/carts/token",
          {
            token: cartToken,
            product_id: e.product_id,
            quantity: 1,
            price: e.price,
          }
        );
        console.log("addtocart is: ", addtocart);
      };
      func();
      alert("added to cart with carttoken");
    } else {
      const func = async () => {
        // get userid
        console.log("userrered id is: ", user);

        // get user_id from usersessions
        const user_id = user.user_id;
        console.log("user_id is: ", user_id);

        const addtocart = await axios.post("http://localhost:5000/carts", {
          user_id: user_id,
          product_id: e.product_id,
          quantity: 1,
          price: e.price,
        });
        console.log("addtocart is: ", addtocart);
      };
      func();
      alert("added to cart with user");
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
    const addfav = async () => {
      console.log("e is: ", e);
      console.log("user is: ", user);
      // get user_id from usersessions
      const user_id = user.user_id;
      // console.log("user_id is: ", user_id);

      const result = await axios.post("http://localhost:5000/favorites", {
        user: user_id,
        product: e,
      });
      // alert
      console.log("result is: ", result);

      return result;
    };
    const result = await addfav();

    if (result.data === "failed") {
      alert("already in favorites");
    } else {
      alert("added to favorites");
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
          <div class="input-group col-md-6 ">
            <input
              type="text"
              class="form-control"
              onChange={searchprods}
              placeholder="Search Products"
              aria-label="Search"
              aria-describedby="basic-addon1"
            />
            {/* <br/>
        <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button">Button</button>
  </div> */}
          </div>
        </div>

        <div class="row">
          {products.map((product) => (
            <div class=" col-md-4 col-sm-6">
              <div class="card mt-3">
                <div class="card-body">
                  {/* title */}
                  <a href={"/shop/products/" + product.product_id}>
                    <h1 class="card-title mb-4 text-center">
                      {product.product_name}
                    </h1>
                  </a>
                  {/* send product with link */}
                  {/* <Link
                    to={{
                      pathname: "/shop/products/" + product.product_id,
                      state: { product: product },
                    }}
                  ></Link> */}

                  {/* image */}
                  {product.image !== null && (
                    // <img
                    //   src={`http://localhost:5000${product.images[0]}`}
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
                        {product.images.map((image, index) => (
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
                              src={`http://localhost:5000${image}`}
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
                  {!product.image && (
                    <div>
                      <img
                        src="/productimg.jpg"
                        class="img-fluid"
                        alt="Card image"
                      ></img>
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
