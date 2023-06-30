import React, { Fragment, useEffect, useState, useContext } from "react";

import EditFeatured from "./EditFeatured";
import {
  UserContext,
  CartContext,
  LoggedContext,
  ProdContext,
} from "../../../../../App";
import axios from "axios";
import Cookies from "js-cookie";

const FeaturedList = () => {
  const loggedin = useContext(LoggedContext);
  const products = useContext(ProdContext);
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  const [featured, setFeatured] = useState([]);

  //delete featured function defined
  const deleteFeatured = async (featured_id) => {
    try {
      // const deleteFeatured = await fetch(
      //   `http://localhost:000/featured/${featured_id}`,
      //   {
      //     method: "DELETE",
      //   }
      // );
      const deleteFeatured = await axios.delete(
        import.meta.env.VITE_API_URL + "/api/featured/" + featured_id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      setFeatured(
        featured.filter((featured) => featured.featured_id !== featured_id)
      );
      const res = await deleteFeatured();
    } catch (error) {
      console.error(error.message);
    }
  };

  //get featured function defeined
  const getFeatured = async () => {
    try {
      // const response = await fetch("http://localhost:000/featured");
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/featured",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      console.log("featured");
      const jsonData = await response.data;
      setFeatured(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFeatured();
  }, []);

  return (
    <Fragment>
      {/* <div class="d-flex justify-content-center"> */}
      {/* <h2>Featured Table</h2> */}
      {/* <p>The .table class adds basic styling (light padding and horizontal dividers) to a table:</p>             */}
      <div class="row justify-content-center">
        <div class="col-md-6 mr-5">
          {/* <div class="table-responsive">  */}
          <table class="table mt-5 text-center">
            <thead>
              <tr>
                {/* <th>Featured ID</th> */}
                <th>Product</th>
                {/* <th>Edit</th> */}
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {featured.map((feature) => (
                <tr>
                  {/* <td>{feature.featured_id}</td> */}
                  <td>
                    {products
                      .filter(
                        (product) => product.product_id === feature.product_id
                      )
                      .map((product) => (
                        <p>{product.product_name}</p>
                      ))}
                  </td>

                  {/* <td> 
                        <input type="checkbox" checked={feature.shop==true&&"true"}></input>
                    </td> */}
                  {/* <td> */}
                  {/* <EditFeatured featured={feature}/> */}
                  {/* <button class="btn btn-warning" >Edit</button> */}
                  {/* </td> */}
                  <td>
                    <button
                      class="btn btn-danger"
                      onClick={() => deleteFeatured(feature.featured_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* </div> */}
        </div>
      </div>

      {/* </div> */}
    </Fragment>
  );
};

export default FeaturedList;
