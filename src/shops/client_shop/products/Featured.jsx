import React, { Fragment, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import PublicNavbar from "../PublicNavbar";
import ShopList from "../../components/shop/ShopList";

import { UserContext, ProdContext } from "../../index";

function Packages() {
  const user = useContext(UserContext);
  const prods = useContext(ProdContext);

  const [featured, setFeatured] = useState([]);
  const [variations, setVariations] = useState([]);

  const getFeatured = async () => {
    try {
      const response = await fetch("http://localhost:5000/featured");
      const jsonData = await response.json();

      setFeatured(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getVariations = async () => {
    const res = await fetch("http://localhost:5000/variations/");
    const jsonData = await res.json();
    console.log("variations are: ", jsonData);
    setVariations(jsonData);
  };

  useEffect(() => {
    getFeatured();
    getVariations();
  }, []);

  return (
    <Fragment>
      {user && <Navbar />}
      {!user && <PublicNavbar />}

      <div className="container justify-content-center mt-5">
        <div className="row ml-5 mr-5 justify-content-center">
          <h1 className="text-center mb-3">Shop Featured!</h1>
        </div>
        <div className="row ml-5 mr-5 mb-3 justify-content-center">
          <h2 style={{ "text-align": "center" }}>
            Products featured for their quality, price, and demand.
          </h2>
        </div>
        <div className="row ml-5 mr-5 justify-content-center">
          <p>
            Variety of Choices based on your needs. Check out our Calculator!
          </p>
        </div>
      </div>

      <div className="container mt-3">
        {/* <div className="card mr-5 ml-5 mb-5" >
            <div className="card-header">
                <div className="row justify-content-center">
                <div className="col-md-0">
                <h3 className="text-center">CCTV CAMERAS - SPOTLIGHTS - TV - FRIDGE - SUBWOOFER</h3>

                </div>
                </div>
            </div> */}

        {/* <ShopList/> */}

        <div className="container">
          <div className="row">
            {featured.map((product) => (
              // <div >

              <div className=" col-md-4 col-sm-6">
                {prods.map((oneprod) =>
                  product.product_id == oneprod.product_id ? (
                    <div className="card mt-3">
                      <div className="card-body">
                        {/* title */}
                        <a href={"/shop/products/" + oneprod.product_id}>
                          <h1 className="card-title text-center">
                            {oneprod.product_name}
                          </h1>
                        </a>
                        {/* send product with link */}
                        <Link
                          to={{
                            pathname: "/shop/products/" + oneprod.product_id,
                            state: { product: product },
                          }}
                        ></Link>
                        {/* image */}
                        {oneprod.images !== null && (
                          // <img
                          //   src={`http://localhost:5000${oneprod.images[0]}`}
                          //   className="img-fluid"
                          //   alt="Card image"
                          // ></img>

                          <div
                            id={"carouselExampleControls" + oneprod.product_id}
                            className="carousel slide"
                            data-ride="false"
                            data-interval="false"
                          >
                            <div className="carousel-inner">
                              {oneprod.images.map((image, index) => (
                                // if index is 0, add active class
                                <div
                                  className={
                                    index === 0
                                      ? "carousel-item active"
                                      : "carousel-item"
                                  }
                                >
                                  <img
                                    className="d-block w-100"
                                    src={`http://localhost:5000${image}`}
                                    alt="First slide"
                                  />
                                </div>
                              ))}
                            </div>
                            <a
                              className="carousel-control-prev"
                              href={
                                "#carouselExampleControls" + oneprod.product_id
                              }
                              role="button"
                              data-slide="prev"
                            >
                              <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                              ></span>
                              <span className="sr-only">Previous</span>
                            </a>
                            <a
                              className="carousel-control-next"
                              href={
                                "#carouselExampleControls" + oneprod.product_id
                              }
                              role="button"
                              data-slide="next"
                            >
                              <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                              ></span>
                              <span className="sr-only">Next</span>
                            </a>
                          </div>
                        )}
                        {!oneprod.images[0] && (
                          <div>
                            <img
                              src="http://localhost:3000//productimg.jpg"
                              className="img-fluid"
                              alt="Card image"
                            ></img>
                          </div>
                        )}
                        <p className="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>

                        <div className="d-flex justify-content-center mb-2">
                          {/* strikethrough red text */}
                          <h4 className="text-danger">
                            <s>{Math.round((oneprod.price * 120) / 100)}K</s>
                          </h4>
                          {/* spacing */}
                          <h4 className="mx-2">-</h4>
                          <h4>{oneprod.price}K Tshs</h4>{" "}
                        </div>

                        {/* <div className="justify-content-center"> */}
                        <div className="row mb-3 justify-content-center">
                          {/* <div className="col-lg-2 ml-5 mr-5 mb-2"> */}
                          <button className="btn btn-danger">
                            {" "}
                            <i className="fas fa-heart fa-lg mr-1"> </i> Fav
                          </button>
                          {/* </div> */}
                          {/* <div className="col-lg-2 ml-3"> */}
                          <button className="btn btn-primary">
                            {" "}
                            <i className="fas fa-shopping-cart fa-lg mr-1">
                              {" "}
                            </i>{" "}
                            Cart
                          </button>
                          {/* </div> */}
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )
                )}
              </div>
              // </div>
            ))}
          </div>
        </div>

        {/* <div className="card-footer mt-5">
            <div className="row justify-content-center">
                <div className="col-md-7">
                <h3 className="text-center">SHOWCASE</h3>

                </div>
                </div>
            </div>
            </div> */}
        {/* spacer  */}
        <div className="mt-5 mb-5"></div>
      </div>
    </Fragment>
  );
}

export default Packages;
