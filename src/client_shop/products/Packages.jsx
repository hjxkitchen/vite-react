import React, { Fragment, useContext, useState, useEffect } from "react";
import Navbar from "../Navbar";
import PublicNavbar from "../PublicNavbar";
import ShopList from "./components/ShopList";
import { UserContext, ProdContext } from "../../App";

function Packages() {
  const user = useContext(UserContext);
  const prods = useContext(ProdContext);

  console.log("prods", prods);

  const [packages, setPackages] = useState([]);
  const [packageitems, setPackageItems] = useState([]);

  const getPackages = async () => {
    try {
      const response = await fetch("http://localhost:5000/packages");
      const jsonData = await response.json();
      setPackages(jsonData);
      console.log("pckgs", jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPackageItems = async () => {
    try {
      console.log("pkgitme");
      const response = await fetch("http://localhost:5000/packageitems");
      const jsonData = await response.json();
      setPackageItems(jsonData);
      console.log("pckgitmes:", jsonData[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPackageItems();
    getPackages();
  }, []);

  return (
    <Fragment>
      {user && <Navbar />}
      {!user && <PublicNavbar />}

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

      {packages.length > 1 && (
        <div class="container mt-4">
          <h1 class="text-center mt-4 mb-4">Backup</h1>
          <div class="card">
            <div class="card-header" id={"heading" + packages[1].package_id}>
              <h5 class="mb-0">
                <button
                  class="btn btn-link"
                  data-toggle="collapse"
                  data-target={"#collapse" + packages[1].package_id}
                  aria-expanded="true"
                  aria-controls={"collapse" + packages[1].package_id}
                >
                  <h5>
                    {packages[1].package_name} : {packages[1].package_price}K
                    Tshs
                  </h5>
                </button>
              </h5>
            </div>

            <div
              id={"collapse" + packages[1].package_id}
              class="collapse "
              aria-labelledby={"heading" + packages[1].package_id}
              data-parent="#accordion"
            >
              <div class="card-body">{packages[1].package_description}</div>
            </div>
          </div>
          {/* ANCHOR card with items */}
          <div class="card ">
            <div class="card-header" id={"heading" + packages[0].package_id}>
              <h5 class="mb-0">
                <button
                  class="btn btn-link"
                  data-toggle="collapse"
                  data-target={"#collapse" + packages[0].package_id}
                  aria-expanded="true"
                  aria-controls={"collapse" + packages[0].package_id}
                >
                  <h5>
                    {packages[0].package_name} : {packages[0].package_price}K
                    Tshs
                  </h5>
                </button>
              </h5>
            </div>

            <div
              id={"collapse" + packages[0].package_id}
              class="collapse "
              aria-labelledby={"heading" + packages[0].package_id}
              data-parent="#accordion"
            >
              <div class="card-body">
                {packages[0].package_description}
                {/* map packageitems */}

                {/* get packageitems for this package */}

                {packageitems.map((oneitem) =>
                  // If packageitem.package_id == packages[0].package_id then show

                  packages[0].package_id == oneitem.package_id ? (
                    // accordion using package_item_id
                    <div class="card" id={oneitem.package_item_id}>
                      <div class="card-header" id="headingtwo">
                        <button
                          class="btn btn-link"
                          data-toggle="collapse"
                          data-target={"#collapse" + oneitem.package_item_id}
                          aria-expanded="true"
                          aria-controls="collapsetwo"
                        >
                          <h5 class="mb-0">
                            {/* {oneitem.product_id}: price K Tshs */}
                            {/* find product id in prods and get name */}
                            {prods.map((oneprod) =>
                              oneitem.product_id == oneprod.product_id ? (
                                <h5 class="mb-0">
                                  {oneprod.product_name}: {oneprod.price}K Tshs
                                </h5>
                              ) : (
                                <div></div>
                              )
                            )}
                          </h5>
                        </button>
                      </div>
                      <div
                        id={"collapse" + oneitem.package_item_id}
                        class="collapse "
                        aria-labelledby="headingtwo"
                        data-parent={"#" + oneitem.package_item_id}
                      >
                        <div class="card-body">
                          {oneitem.package_item_description}
                          {prods.map((oneprod) =>
                            oneitem.product_id == oneprod.product_id ? (
                              <h5 class="mb-0">
                                {/* img here */}
                                <img
                                  src={
                                    "http://localhost:5000" + oneprod.images[0]
                                  }
                                  alt="product image"
                                  width="200"
                                  height="200"
                                />
                                {/* <button> <a href={"http://192.268.1.10:5000/"+oneprod.images[0]}>tryyy</a></button> */}
                              </h5>
                            ) : (
                              <div></div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )
                )}

                {/* <ShopList/> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Packages;
