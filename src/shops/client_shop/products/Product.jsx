import React, { Fragment, useContext, useEffect } from "react";
import Navbar from "../Navbar";
import PublicNavbar from "../../PublicNavbar";
import axios from "axios";
import { UserContext, ProdContext, CartContext } from "../../../index";

function Checkout(product) {
  const user = useContext(UserContext);
  const products = useContext(ProdContext);
  const cartToken = useContext(CartContext);

  // console.log(products);

  const [id, setId] = React.useState(0);
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");

  useEffect(() => {
    // get id from url
    const url = window.location.href;
    const ide = parseInt(url.substring(url.lastIndexOf("/") + 1));
    // turn id into integer

    // console.log("id is:", ide);
    setId(ide);

    // console.log("products is: ", products);
    // get product from products
    // const product = products.find(product => product.product_id === ide);
    const product = 0;
    try {
      const productres = products.filter(
        (product) => product.product_id === id
      )[0].product_name;
      if (productres.length > 0) {
        setName(productres);
      }
    } catch (error) {
      // console.log("error");
    }
    // console.log("product is: ", product);

    try {
      if (products) {
        const productimg = products.find(
          (product) => product.product_id === id
        ).images;
        console.log("product is: ", productimg);
        setImage(productimg);
      }
    } catch (error) {}
  }, [products, name, image]);

  const addToCart = (e) => {
    if (user === null) {
      const func = async () => {
        const addtocart = await axios.post(
          "http://localhost:5000/carts/token",
          {
            token: cartToken,
            product_id: id,
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
        const getUserId = await axios.post(
          "http://localhost:5000/userbyemail",
          {
            user: user,
          }
        );

        console.log("getUserId is: ", getUserId.data[0].user_id);
        const user_id = getUserId.data[0].user_id;
        console.log("user_id is: ", user_id);

        const addtocart = await axios.post("http://localhost:5000/carts", {
          user_id: user_id,
          product_id: id,
          quantity: 1,
          price: e.price,
        });
        console.log("addtocart is: ", addtocart);
      };
      func();
      alert("added to cart with user");
    }
  };

  // const productimg = 0;

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <div>
          <h1 class="text-center mt-5">{name}</h1>
        </div>
        <div class="container mt-5 mb-5 col-md-6">
          {/* <img
          src={`http://localhost:5000${image[0]}`}
          class="img-thumbnail"
          alt={"Card image:" + image}
        ></img> */}
          {/* image not null and */}
          {image.length > 0 && (
            <div
              id={"carouselExampleControls" + product.product_id}
              class="carousel slide"
              data-ride="false"
              data-interval="false"
            >
              <div class="carousel-inner">
                {image.map((img, index) => (
                  // if index is 0, add active class
                  <div
                    class={
                      index === 0 ? "carousel-item active" : "carousel-item"
                    }
                  >
                    <img
                      class="d-block w-100"
                      src={`http://localhost:5000${img}`}
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
          {image.length === 0 && (
            <div
              id={"carouselExampleControls" + product.product_id}
              class="carousel slide"
              data-ride="false"
              data-interval="false"
            >
              <div class="carousel-inner">
                <img
                  class="d-block w-100"
                  src="http://localhost:3000//productimg.jpg"
                  alt="First slide"
                />
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
        </div>

        <h2 class="text-center mt-5">
          Price:{" "}
          {products[0] &&
            products.filter((product) => product.product_id === id)[0].price}
          K Tshs
        </h2>

        <div class="row justify-content-center mt-5">
          {/* <div class="col-md-2"> */}
          <button class="btn btn-danger mb-5" onClick={() => alert("add fav")}>
            {" "}
            <i class="fas fa-heart fa-lg mr-1"> </i> Add to Favorites
          </button>
          {/* </div> */}
          {/* <div class="col-md-2"> */}
          <button class="btn btn-primary mb-5" onClick={() => addToCart(id)}>
            {" "}
            <i class="fas fa-shopping-cart fa-lg mr-1"> </i> Add to Cart
          </button>
          {/* </div> */}
        </div>
      </div>
    </Fragment>
  );
}

export default Checkout;
