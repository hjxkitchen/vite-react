import React, { Fragment, useContext, useEffect } from "react";
import Navbar from "../../system/Navbar";
import Cookies from "js-cookie";

// import PublicNavbar from "../PublicNavbar";
import axios from "axios";
import { UserContext, ProdContext, CartContext } from "../../App";

function Checkout() {
  const user = useContext(UserContext);
  const products = useContext(ProdContext);
  const cartToken = useContext(CartContext);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME)
    ? Cookies.get(import.meta.env.VITE_COOKIE_NAME)
    : "guest";

  console.log(products);

  const [id, setId] = React.useState(0);
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");
  const [product, setProduct] = React.useState({});

  // get id from url
  const url = window.location.href;
  const ide = parseInt(url.substring(url.lastIndexOf("/") + 1));
  // turn id into integer

  console.log("id is:", ide);
  // setId(ide);

  const getProduct = async () => {
    try {
      // const response = await fetch("http://localhost:000/products");
      console.log("prods", token);
      const response = await axios.get(
        import.meta.env.VITE_API_URL +
          "/api/product/" +
          ide +
          "?include=productimage",
        {
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      console.log("prods2", response.data);
      // const data = response;
      setProduct(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const addToCart = (e) => {
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

        const user_id = user.user_id;
        console.log("user_id is: ", user_id);

        // const addtocart = await axios.post("http://localhost:000/carts", {
        //   user_id: user_id,
        //   product_id: e.product_id,
        //   quantity: 1,
        //   price: e.price,
        // });

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
        {/* <div> */}
        <h1 class="text-center mt-5">{product.product_name}</h1>
        {/* </div> */}
        <div class="container mt-5 mb-5 col-md-6">
          {/* <img
          src={`http://localhost:000${image[0]}`}
          class="img-thumbnail"
          alt={"Card image:" + image}
        ></img> */}
          {/* image not null and */}
          {product.productimages?.length > 0 && (
            <div
              id={"carouselExampleControls" + product.product_id}
              class="carousel slide"
              data-ride="false"
              data-interval="false"
            >
              <div class="carousel-inner">
                {product.productimages?.map((img, index) => (
                  // if index is 0, add active class
                  <div
                    class={
                      index === 0 ? "carousel-item active" : "carousel-item"
                    }
                  >
                    <img
                      class="d-block w-100"
                      // src={`http://localhost:000${img}`}
                      a
                      src={
                        "https://zahab-bucket.sfo3.digitaloceanspaces.com/" +
                        img.image
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
          {product.productimages?.length === 0 && (
            <div
              id={"carouselExampleControls" + product.product_id}
              class="carousel slide"
              data-ride="false"
              data-interval="false"
            >
              <div className="carousel-inner">
                <img
                  className="d-block mx-auto"
                  style={{ width: "30%", height: "50%" }}
                  src="/productimg.jpg"
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

        <h2 class="text-center mt-5">Price: {product.price}K Tshs</h2>

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
