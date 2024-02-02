import React, { Fragment, useEffect, useState, useContext } from "react";
import Navbar from "../../system/Navbar";
import axios from "axios";
import { ProdContext } from "../../App";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

function Calculators() {
  const [favorites, setFavorites] = useState([]);
  // const user = useContext(UserContext);
  const products = useContext(ProdContext);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  const user_id = jwt_decode(token).user_id;

  useEffect(() => {
    // if (loggedin) {
    //   setUser_id(user.user_id);
    // }

    // get id from url
    // const url = window.location.href;
    // const ide = parseInt(url.substring(url.lastIndexOf('/') + 1));
    // turn id into integer

    // console.log("id is:", ide);
    // setId(ide);

    // get favorites by user id

    const getFavorites = async () => {
      const result = await axios.get(
        import.meta.env.VITE_API_URL + `/api/user/${user_id}?include=favorite`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      console.log("result is: ", result.data.favorites);

      setFavorites(result.data.favorites);
    };

    getFavorites();

    // getFavorites();
  }, []);

  const handleDelete = async (event) => {
    event.preventDefault();
    const id = event.target.id;
    console.log("id is: ", id);
    const result = await axios.delete(
      import.meta.env.VITE_API_URL + `/api/favorite/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );
    // remove from favorites
    const newFavorites = favorites.filter(
      (favorite) => favorite.favorite_id !== parseInt(id)
    );
    console.log("newFavorites", newFavorites);
    setFavorites(newFavorites);
  };

  const addToCart = (e) => {
    if (user_id === null) {
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
        // console.log("userrered id is: ", user);

        // const user_id = jwtDecode(token).user_id;
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
      <div>
        <h1 class="text-center mt-5 mb-5">Favorites</h1>
      </div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-6">
            <div class="card">
              <div class="card-body">
                {/* map */}
                <table class="table table-striped table-bordered text-center">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      {/* <th>Price</th> */}
                      {/* <th>Image</th> */}
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {favorites.map((favorite) => (
                      <tr key={favorite.favorite_id}>
                        <td>
                          {products.map((product) => (
                            <div>
                              <a href={"/shop/products/" + product.product_id}>
                                {product.product_id === favorite.product_id
                                  ? product.product_name
                                  : null}
                              </a>
                            </div>
                          ))}
                        </td>
                        <td>
                          <button
                            class="btn btn-primary"
                            onClick={() => addToCart(favorite)}
                          >
                            {" "}
                            <i class="fas fa-shopping-cart fa-lg mr-1">
                              {" "}
                            </i>{" "}
                            {/* Cart */}
                          </button>
                        </td>
                        {/* <td>{favorite.price}</td> */}
                        {/* <td><img src={favorite.image} alt="product image" width="100px" height="100px"/></td> */}
                        <td>
                          <div class="row justify-content-center">
                            <button
                              class="btn btn-danger"
                              id={favorite.favorite_id}
                              onClick={handleDelete}
                            >
                              X
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Calculators;
