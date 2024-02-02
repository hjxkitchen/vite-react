import React, { Fragment, useContext, useState, useEffect } from "react";
import Navbar from "../../system/Navbar";
// import PublicNavbar from "../PublicNavbar";
import ShopList from "./components/ShopList";
import { UserContext, ProdContext } from "../../App";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

function Packages() {
  const prods = useContext(ProdContext);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  const user = Cookies.get(import.meta.env.VITE_COOKIE_NAME)
    ? jwtDecode(token).user_id
    : null;
  console.log("prods", prods);

  const [packages, setPackages] = useState([]);
  const [packageitems, setPackageItems] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPackages, setFilteredPackages] = useState([]);

  const searchPackages = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter products based on the search query
    const filtered = packages.filter((pkg) =>
      pkg.package_name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredPackages(filtered);
  };

  const getPackages = async () => {
    try {
      // const response = await fetch("http://localhost:000/packages");
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/packages",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      const jsonData = await response.data;
      setPackages(jsonData);
      setFilteredPackages(jsonData);
      console.log("pckgs", jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPackageItems = async () => {
    try {
      console.log("pkgitme");
      // const response = await fetch("http://localhost:000/packageitems");
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/package?include=product",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      console.log("pkgitme2", response.data);
      setPackages(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // getPackageItems();
    getPackages();
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
      console.log("products array is: ", e.products);
      console.log(
        "quantity for first product is: ",
        e.products[0].packageitem.quantity
      );
      console.log("userrered id is: ", user);
      console.log("price for first product is: ", e.products[0].price);

      const func = async () => {
        // get userid
        console.log("userrered id is: ", user);

        const user_id = jwtDecode(token).user_id;
        console.log("user_id is: ", user_id);

        // Fetch user's cart
        const userCart = await axios.get(
          import.meta.env.VITE_API_URL + `/api/user/${user_id}?include=cart`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
          }
        );

        const { carts } = userCart.data;

        console.log("userCart is: ", userCart.data);

        // Loop through each product in the array
        for (const product of e.products) {
          const { product_id, packageitem } = product;
          const { quantity, price } = packageitem;

          // Rest of the code remains the same
          // ...
          // Find the cart item with the matching product_id
          const cartItem = carts.find((cart) => cart.product_id === product_id);

          if (cartItem) {
            // If the product already exists in the cart, update the quantity
            await axios.put(
              import.meta.env.VITE_API_URL + `/api/cart/${cartItem.cart_id}`,
              {
                user_id: cartItem.user_id,
                product_id: cartItem.product_id,
                quantity: cartItem.quantity + quantity,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "x-api-key": import.meta.env.VITE_API_KEY,
                },
              }
            );
            console.log(`Product with ID ${product_id} updated in Cart!`);
          } else {
            // If the product is not in the cart, add it with the specified quantity
            await axios.post(
              import.meta.env.VITE_API_URL + "/api/cart",
              {
                user_id: user_id,
                product_id: product_id,
                quantity: quantity,
                price: price,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "x-api-key": import.meta.env.VITE_API_KEY,
                },
              }
            );
            console.log(`Product with ID ${product_id} added to Cart!`);
          }
        }

        // console.log("addtocart is: ", addtocart);
        alert("Added to Cart!");
      };
      func();
    }
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container mb-5">
        {/* header text rows */}
        <div className="container justify-content-center mt-5">
          <div className="row ml-2 mr-2 justify-content-center">
            <h1 className="text-center mb-3">Shop Packages!</h1>
          </div>
          <div className="row ml-2 mr-2 mb-3 justify-content-center">
            <h2 style={{ textAlign: "center" }}>
              Complete Packages to make life easier.
            </h2>
          </div>
          <div className="row ml-2 mr-2 justify-content-center">
            <p>
              Variety of Choices based on your needs. Check out our Calculator!
            </p>
          </div>
        </div>

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
              onChange={searchPackages}
              placeholder="Search Packages"
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

        {/* map packages */}
        {filteredPackages.map((onepackage) => (
          <div
            className="mt-4"
            key={onepackage.package_id}
            style={{ overflow: "hidden" }}
          >
            <h1
              className="text-center mt-4 mb-4 "
              // style={{
              //   overflow: "hidden",
              //   whiteSpace: "nowrap",
              //   textOverflow: "ellipsis",
              // }}
            >
              {onepackage.package_name} : {onepackage.package_price}K Tshs
            </h1>

            {/* ANCHOR card with items */}
            <div className="card">
              <div
                className="card-header"
                id={"heading" + onepackage.package_id}
              >
                <div className="mb-0">
                  <button
                    className="btn btn-link"
                    data-toggle="collapse"
                    data-target={"#collapse" + onepackage.package_id}
                    aria-expanded="true"
                    aria-controls={"collapse" + onepackage.package_id}
                  >
                    <h5
                      className="mb-0"
                      style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {onepackage.package_name} : {onepackage.package_price}K
                      Tshs
                    </h5>
                  </button>

                  <button
                    class="btn btn-primary mr-5"
                    onClick={() => addToCart(onepackage)}
                  >
                    {" "}
                    <i class="fas fa-shopping-cart fa-lg mr-1"> </i> Add To Cart
                  </button>
                </div>
              </div>

              <div
                id={"collapse" + onepackage.package_id}
                className="collapse"
                aria-labelledby={"heading" + onepackage.package_id}
                data-parent="#accordion"
              >
                <div className="card-body">
                  {onepackage.package_description}
                  {/* map package items */}
                  {onepackage.products?.map(
                    (oneitem) => (
                      <div
                        className="card"
                        id={"pkgitm" + oneitem.packageitem.package_item_id}
                        key={oneitem.packageitem.package_item_id}
                      >
                        {/* header */}
                        <div className="card-header" id="headingtwo">
                          <button
                            className="btn btn-link"
                            data-toggle="collapse"
                            data-target={
                              "#collapse pkgitm" +
                              oneitem.packageitem.package_item_id
                            }
                            aria-expanded="true"
                            aria-controls="collapsetwo"
                          >
                            <h5
                              className="mb-0"
                              // style={{
                              //   overflow: "hidden",
                              //   whiteSpace: "nowrap",
                              //   textOverflow: "ellipsis",
                              // }}
                            >
                              {oneitem.product_name} : {oneitem.price}K Tshs
                            </h5>
                          </button>
                        </div>

                        {/* body */}
                        <div
                          id={
                            "collapse pkgitm" +
                            oneitem.packageitem.package_item_id
                          }
                          class="collapse "
                          aria-labelledby="headingtwo"
                          data-parent={
                            "#pkgitm" + oneitem.packageitem.package_item_id
                          }
                        >
                          <div class="card-body">
                            <p className="mb-2">
                              <a href={"/shop/products/" + oneitem.product_id}>
                                {oneitem.product_name}
                              </a>
                            </p>
                            <p className="mb-2">{oneitem.description}</p>

                            {/* image */}
                            {oneitem.productimages[0] && (
                              <div
                                id={
                                  "carouselExampleControls" + oneitem.product_id
                                }
                                class="carousel slide"
                                data-ride="false"
                                data-interval="false"
                                style={{ width: "300px", height: "300px" }}
                              >
                                {/* carousel inner with 100px square width height */}
                                <div
                                  class="carousel-inner"
                                  style={{ width: "100%", height: "100%" }}
                                >
                                  {oneitem.productimages.map((image, index) => (
                                    // if index is 0, add active class
                                    <div
                                      class={
                                        index === 0
                                          ? "carousel-item active"
                                          : "carousel-item"
                                      }
                                      style={{
                                        width: "300px",
                                        height: "300px",
                                      }}
                                    >
                                      <img
                                        class="d-block w-70 h-100"
                                        src={
                                          "https://zahab-bucket.sfo3.digitaloceanspaces.com/" +
                                          image.image
                                        }
                                        alt="Slide"
                                        style={{ objectFit: "cover" }}
                                      />
                                    </div>
                                  ))}
                                </div>
                                <a
                                  class="carousel-control-prev"
                                  href={
                                    "#carouselExampleControls" +
                                    oneitem.product_id
                                  }
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
                                  href={
                                    "#carouselExampleControls" +
                                    oneitem.product_id
                                  }
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
                        </div>
                      </div>
                    )
                    // ) : (
                    //   <div></div>
                    // )
                  )}

                  {/* <ShopList/> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default Packages;
