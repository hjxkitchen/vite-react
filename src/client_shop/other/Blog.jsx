import React, { Fragment, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../system/Navbar";
// import PublicNavbar from "../PublicNavbar";
import { UserContext } from "../../App";
import axios from "axios";

function Calculators() {
  const user = useContext(UserContext);

  const [blogs, setBlogs] = useState([]);

  // get blogs from database
  const getBlogs = async () => {
    try {
      // const response = await fetch("http://localhost:000/featured");
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/blog",
        {
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      console.log("blog datea:", response.data);
      const jsonData = await response.data;

      setBlogs(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div>
        <h1 class="text-center mt-5 mb-5">Blog / Resources</h1>
      </div>

      {/* map blogs as cards */}
      <div className="container">
        <div className="row">
          {blogs.map((blog) => (
            <div className="col-sm-4">
              <div className="card">
                {/* <img
                  className="card-img-top"
                  src={blog.image}
                  alt="Card image cap"
                /> */}
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">{blog.content}</p>
                  {/* <Link
                    to={"/blog/" + blog.id}
                    className="btn btn-primary"
                  >
                    Read More
                  </Link> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default Calculators;
