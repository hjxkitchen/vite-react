import React, { Fragment, useEffect, useState, useContext } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { UserContext, LoggedContext, ProdContext } from "../../index";

function Calculators() {
  const [favorites, setFavorites] = React.useState([]);
  const [user_id, setUser_id] = React.useState(0);
  const user = useContext(UserContext);
  const loggedin = useContext(LoggedContext);
  const products = useContext(ProdContext);

  useEffect(() => {
    if (user_id === 0) {
      // get user id by email
      const getUser = async () => {
        console.log(user);
        console.log("getuserfunc");
        const user_idres = await axios.post(
          "http://localhost:5000/userbyemail",
          { user: user }
        );
        console.log("user_id is: ", user_idres.data[0].user_id);
        // const user_idd = user_id.data[0].user_id;
        setUser_id(user_idres.data[0].user_id);
        console.log("user_id2 is: ", user_id);
      };
      getUser();
    }

    // get id from url
    // const url = window.location.href;
    // const ide = parseInt(url.substring(url.lastIndexOf('/') + 1));
    // turn id into integer

    // console.log("id is:", ide);
    // setId(ide);

    // get favorites by user id
    else {
      const getFavorites = async () => {
        const url = "http://localhost:5000/favorites/" + user_id;
        console.log(url);
        const result = await axios.get(url);
        console.log("result is: ", result.data);
        setFavorites(result.data);
      };

      getFavorites();
    }
    // getFavorites();
  }, [loggedin, user_id]);

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
                      <tr>
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
                            <button class="btn btn-danger">X</button>
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
