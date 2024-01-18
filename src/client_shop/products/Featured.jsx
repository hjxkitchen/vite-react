import React, { Fragment, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../system/Navbar";

// import PublicNavbar from "../PublicNavbar";
import ShopList from "./components/ShopList";
import axios from "axios";
import Cookies from "js-cookie";

import { UserContext, ProdContext } from "../../App";

function Packages() {
  const user = useContext(UserContext);
  // const prods = useContext(ProdContext);

  const [featured, setFeatured] = useState([]);
  const [variations, setVariations] = useState([]);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

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
                                  // src={`http://localhost:000${image}`}
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
                      <button class="btn btn-danger">
                        {" "}
                        <i class="fas fa-heart fa-lg mr-1"> </i> Fav
                      </button>
                      {/* </div> */}
                      {/* <div class="col-lg-2 ml-3"> */}
                      <button class="btn btn-primary">
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
