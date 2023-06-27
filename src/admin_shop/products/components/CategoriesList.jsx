import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

// import EditPackage from "./EditPackage";
import { UserContext, CartContext, LoggedContext } from "./../../../App";

const PackageList = () => {
  const loggedin = useContext(LoggedContext);

  const [packagename, setPackage] = useState([]);

  //delete package function defined
  const deletePackage = async (package_id) => {
    try {
      // const deletePackage = await fetch(
      //   `http://localhost:000/package/${package_id}`,
      //   {
      //     method: "DELETE",
      //   }
      // );
      const deletePackage = await axios.delete(
        import.meta.env.VITE_APP_API_URL + "/api/Package/" + package_id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_APP_API_KEY,
          },
        }
      );
      setPackage(
        packagename.filter((packag) => packag.package_id !== package_id)
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  //get package function defeined
  const getPackage = async () => {
    try {
      // const response = await fetch("http://localhost:000/categories");
      const response = await axios.get(
        import.meta.env.VITE_APP_API_URL + "/api/Package",
        {
          headers: {
            Authorization: `Bearer ${cartToken}`,
            "x-api-key": import.meta.env.VITE_APP_API_KEY,
          },
        }
      );
      console.log("package");
      const jsonData = await response.json();
      setPackage(jsonData);
      console.log(packagename);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPackage();
  }, []);

  return (
    <Fragment>
      {/* <div class="d-flex justify-content-center"> */}
      {/* <h2>Package Table</h2> */}
      {/* <p>The .table class adds basic styling (light padding and horizontal dividers) to a table:</p>             */}
      {/* <div class="table-responsive">  */}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            {/* <th>Package ID</th> */}
            <th>Category Name</th>
            <th>Open</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {packagename.map((feature) => (
            <tr>
              {/* <td>{feature.package_id}</td> */}
              <td>{feature.category_name}</td>

              <td>
                {/* link sednig state */}
                <Link to="/category" state={{ feature: feature }}>
                  <button class="btn btn-warning ">Open</button>
                </Link>
              </td>
              <td>
                <button
                  class="btn btn-danger"
                  onClick={() => deletePackage(feature.category_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* </div> */}
      {/* </div> */}
    </Fragment>
  );
};

export default PackageList;
