import React, { Fragment, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../system/Navbar";

// import PublicNavbar from "../PublicNavbar";
import ShopList from "./components/ShopList";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

import { UserContext, CartContext } from "../../App";

function Packages() {
  // const user = useContext(UserContext);
  // const prods = useContext(ProdContext);

  const [featured, setFeatured] = useState([]);
  const [variations, setVariations] = useState([]);

  const cartToken = useContext(CartContext);
  // get token from cookie
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME)
    ? Cookies.get(import.meta.env.VITE_COOKIE_NAME)
    : "guest";

  const user = Cookies.get(import.meta.env.VITE_COOKIE_NAME)
    ? jwtDecode(token).user_id
    : null;

  const getFeatured = async () => {
    try {
      // const response = await fetch("http://localhost:000/featured");
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/featured",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      console.log("featured datea:", response.data);
      const jsonData = await response.data;

      setFeatured(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getVariations = async () => {
    // const res = await fetch("http://localhost:000/variations/");
    // const jsonData = await res.json();
    // console.log("variations are: ", jsonData);
    // setVariations(jsonData);
    console.log("getVariations");
  };

  useEffect(() => {
    getFeatured();
    getVariations();
  }, []);

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

  return (
    <Fragment>
      <Navbar />

      <div class="container justify-content-center mt-5">
        <div class="row ml-5 mr-5 justify-content-center">
          <h1 class="text-center mb-3">Shop Featured!</h1>
        </div>
        <div class="row ml-5 mr-5 mb-3 justify-content-center">
          <h2 style={{ "text-align": "center" }}>
            Products featured for their quality, price, and demand.
          </h2>
        </div>
        <div class="row ml-5 mr-5 justify-content-center">
          <p>
            Variety of Choices based on your needs. Check out our Calculator!
          </p>
        </div>
      </div>

      <div class="container mt-3">
        {/* <div class="card mr-5 ml-5 mb-5" >
            <div class="card-header">
                <div class="row justify-content-center">
                <div class="col-md-0">
                <h3 class="text-center">CCTV CAMERAS - SPOTLIGHTS - TV - FRIDGE - SUBWOOFER</h3>

                </div>
                </div>
            </div> */}

        {/* <ShopList/> */}

        <div class="container">
          <div class="row">
            {featured.map((oneprod) => (
              // <div >

              <div class=" col-md-4 col-sm-6">
                <div class="card mt-3">
                  <div class="card-body">
                    {/* title */}
                    <a href={"/shop/products/" + oneprod.product_id}>
                      <h1 class="card-title text-center">
                        {oneprod.product.product_name}
                      </h1>
                    </a>
                    {/* send product with link */}
                    <Link
                      to={{
                        pathname: "/shop/products/" + oneprod.product_id,
                        state: { product: oneprod },
                      }}
                    ></Link>
                    {/* image */}
                    {oneprod.product.productimages?.length > 0 ? (
                      // <img
                      //   src={`http://localhost:000${product.productimagess[0]}`}
                      //   class="img-fluid"
                      //   alt="Card image"
                      // ></img>
                      <div
                        id={"carouselExampleControls" + oneprod.product_id}
                        class="carousel slide"
                        data-ride="false"
                        data-interval="false"
                      >
                        <div class="carousel-inner">
                          {oneprod.product.productimages?.map(
                            (image, index) => (
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
                                  src={
                                    "https://zahab-bucket.sfo3.digitaloceanspaces.com/" +
                                    image.image
                                  }
                                  alt="First slide"
                                />
                              </div>
                            )
                          )}
                        </div>

                        <a
                          class="carousel-control-prev"
                          href={"#carouselExampleControls" + oneprod.product_id}
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
                          href={"#carouselExampleControls" + oneprod.product_id}
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
                    ) : (
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
                      {/* strikethrough red text */}
                      <h4 class="text-danger">
                        <s>
                          {Math.round((oneprod.product.price * 120) / 100)}K
                        </s>
                      </h4>
                      {/* spacing */}
                      <h4 class="mx-2">-</h4>
                      <h4>{oneprod.product.price}K Tshs</h4>{" "}
                    </div>
                    {/* <div class="justify-content-center"> */}
                    <div class="row mb-3 justify-content-center">
                      {/* <div class="col-lg-2 ml-5 mr-5 mb-2"> */}
                      <button
                        class="btn btn-danger"
                        onClick={() => favorite(oneprod.product.product_id)}
                      >
                        {" "}
                        <i class="fas fa-heart fa-lg mr-1"> </i> Fav
                      </button>
                      {/* </div> */}
                      {/* <div class="col-lg-2 ml-3"> */}
                      <button
                        class="btn btn-primary"
                        onClick={() => addToCart(oneprod.product)}
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
              // </div>
            ))}
          </div>
        </div>

        {/* <div class="card-footer mt-5">
            <div class="row justify-content-center">
                <div class="col-md-7">
                <h3 class="text-center">SHOWCASE</h3>

                </div>
                </div>
            </div>
            </div> */}
        {/* spacer  */}
        <div class="mt-5 mb-5"></div>
      </div>
    </Fragment>
  );
}

export default Packages;
