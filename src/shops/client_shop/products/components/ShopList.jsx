import axios from "axios";
import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext, CartContext } from "../../index";

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
      const getUserId = await axios.post("http://localhost:5000/userbyemail", {
        user: user,
      });

      // console.log("getUserId is: ", getUserId.data[0].user_id);
      const user_id = getUserId.data[0].user_id;
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
      <div className="container">
        {/* input type text */}
        <div className="row justify-content-center mt-3 mb-5  sticky-top">
          <div className="input-group col-md-6 ">
            <input
              type="text"
              className="form-control"
              onChange={searchprods}
              placeholder="Search Products"
              aria-label="Search"
              aria-describedby="basic-addon1"
            />
            {/* <br/>
        <div className="input-group-append">
    <button className="btn btn-outline-secondary" type="button">Button</button>
  </div> */}
          </div>
        </div>

        <div className="row">
          {products.map((product) => (
            <div className=" col-md-4 col-sm-6">
              <div className="card mt-3">
                <div className="card-body">
                  {/* title */}
                  <a href={"/shop/products/" + product.product_id}>
                    <h1 className="card-title mb-4 text-center">
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
                    //   className="img-fluid"
                    //   alt="Card image"
                    // ></img>
                    <div
                      id={"carouselExampleControls" + product.product_id}
                      className="carousel slide"
                      data-ride="false"
                      data-interval="false"
                    >
                      <div className="carousel-inner">
                        {product.images.map((image, index) => (
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
                        href={"#carouselExampleControls" + product.product_id}
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
                        href={"#carouselExampleControls" + product.product_id}
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
                  {!product.image && (
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
                    <h4>{product.price}K Tshs</h4>
                  </div>

                  {/* <div className="justify-content-center"> */}
                  <div className="row mb-3 justify-content-center">
                    {/* <div className="col-lg-2 ml-5 mr-5 mb-2"> */}
                    <button
                      className="btn btn-danger"
                      onClick={() => favorite(product.product_id)}
                    >
                      {" "}
                      <i className="fas fa-heart fa-lg mr-1"> </i> Fav
                    </button>
                    {/* </div> */}
                    {/* <div className="col-lg-2 ml-3"> */}
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(product)}
                    >
                      {" "}
                      <i className="fas fa-shopping-cart fa-lg mr-1"> </i> Cart
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
