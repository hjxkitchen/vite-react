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

  return (
    <Fragment>
      <Navbar />
      <div>
        <h1 class="text-center mt-5">Favorites</h1>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12">
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
                    </tr>
                  </thead>
                  <tbody>
                    {favorites.map((favorite) => (
                      <tr key={favorite.favorite_id}>
                        <td>
                          {products.map((product) => (
                            <div>
                              {product.product_id === favorite.product_id
                                ? product.product_name
                                : null}
                            </div>
                          ))}
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
