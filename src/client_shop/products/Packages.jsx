import React, { Fragment, useContext, useState, useEffect } from "react";
import Navbar from "../../system/Navbar";
// import PublicNavbar from "../PublicNavbar";
import ShopList from "./components/ShopList";
import { UserContext, ProdContext } from "../../App";
import axios from "axios";
import Cookies from "js-cookie";

function Packages() {
  const user = useContext(UserContext);
  const prods = useContext(ProdContext);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  console.log("prods", prods);

  const [packages, setPackages] = useState([]);
  const [packageitems, setPackageItems] = useState([]);

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

  return (
    <Fragment>
      <Navbar />

      {/* header text rows */}
      <div class="container justify-content-center mt-5">
        <div class="row ml-5 mr-5 justify-content-center">
          <h1 class="text-center mb-3">Shop Packages!</h1>
        </div>
        <div class="row ml-5 mr-5 mb-3 justify-content-center">
          <h2 style={{ "text-align": "center" }}>
            Complete Packages to make life easier.
          </h2>
        </div>
        <div class="row ml-5 mr-5  justify-content-center">
          <p>
            Variety of Choices based on your needs. Check out our Calculator!
          </p>
        </div>
      </div>

      {/* mapp packages */}
      {packages.map((onepackage) => (
        <div class="container mt-4">
          <h1 class="text-center mt-4 mb-4">
            {onepackage.package_name} : {onepackage.package_price}K Tshs
          </h1>

          {/* ANCHOR card with items */}
          <div class="card ">
            <div class="card-header" id={"heading" + onepackage.package_id}>
              <h5 class="mb-0">
                <button
                  class="btn btn-link"
                  data-toggle="collapse"
                  data-target={"#collapse" + onepackage.package_id}
                  aria-expanded="true"
                  aria-controls={"collapse" + onepackage.package_id}
                >
                  <h5>
                    {onepackage.package_name} : {onepackage.package_price}K Tshs
                  </h5>
                </button>
              </h5>
            </div>

            <div
              id={"collapse" + onepackage.package_id}
              class="collapse "
              aria-labelledby={"heading" + onepackage.package_id}
              data-parent="#accordion"
            >
              <div class="card-body">
                {onepackage.package_description}
                {/* map packageitems */}
                {onepackage.products?.map(
                  (oneitem) => (
                    // If packageitem.package_id == onepackage.package_id then show

                    // onepackage.package_id == oneitem.package_id ? (
                    // accordion using package_item_id
                    <div
                      class="card"
                      id={"pkgitm" + oneitem.packageitem.package_item_id}
                    >
                      {/* header */}
                      <div class="card-header" id="headingtwo">
                        <button
                          class="btn btn-link"
                          data-toggle="collapse"
                          data-target={
                            "#collapse pkgitm" +
                            oneitem.packageitem.package_item_id
                          }
                          aria-expanded="true"
                          aria-controls="collapsetwo"
                        >
                          <h5 class="mb-0">
                            <h5 class="mb-0">
                              {oneitem.size} {oneitem.product_name} -{" "}
                              {oneitem.model} : {oneitem.price}K Tshs
                            </h5>
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
                                    style={{ width: "300px", height: "300px" }}
                                  >
                                    <img
                                      class="d-block w-100 h-100"
                                      src={
                                        "https://zahab-space.sfo3.digitaloceanspaces.com/" +
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
    </Fragment>
  );
}

export default Packages;
