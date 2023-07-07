import React, { Fragment, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../../../system/Navbar";
// import PublicNavbar from "../PublicNavbar";
import { UserContext, ProdContext } from "./../../../../App";
import axios from "axios";
import Cookies from "js-cookie";

function Contact() {
  const user = useContext(UserContext);
  const products = useContext(ProdContext);
  //   const cartToken = useContext(CartContext);
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  const location = useLocation();
  const { feature } = location.state;
  //   console.log("featured", feature);

  const [inputs, setInputs] = useState({});
  const [prods, setProds] = useState([]);

  const getProds = async () => {
    try {
      // const url = "http://localhost:000/packageitems/" + feature.package_id;
      // console.log("url", url);
      // const response = await fetch(url);
      // const jsonData = await response.json();
      const jsonData = await axios.get(
        import.meta.env.VITE_API_URL +
          "/api/package/" +
          feature.package_id +
          "?include=product",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      // if not an array then make it an array
      if (!Array.isArray(jsonData.data.products)) {
        jsonData.data.products = [jsonData.data.products];
      }

      console.log("jsondata:", jsonData.data.products);
      setProds(jsonData.data.products);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProds();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // submit function
  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      // const url = "http://localhost:000/packageitems/" + feature.package_id;
      // const response = await fetch(url, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(inputs),
      // });
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/packageitem",
        // inputs with packageid
        { ...inputs, package_id: feature.package_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      console.log("rspons:", response);
      // window.location = "/packages";
      // window.reload();
      // window.location.reload();
      getProds();
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteitem = async (prod) => {
    try {
      const res = window.confirm("Are you sure you want to delete this item?");
      if (res) {
        // const url =
        //   "http://localhost:000/packageitems/" + prod.package_item_id;
        // const response = await fetch(url, {
        //   method: "DELETE",
        //   headers: { "Content-Type": "application/json" },
        // });
        const response = await axios.delete(
          import.meta.env.VITE_API_URL +
            "/packageitems/" +
            prod.package_item_id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
          }
        );

        console.log("rspons:", response);
        // window.location = "/packages";
        // window.reload();
        window.location.reload();
        // getProds();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    // <UserContext.Consumer >
    <Fragment>
      <Navbar />

      <h1 class="text-center mt-5">Package: {feature.package_name} </h1>

      <div class="row justify-content-center ">
        <button
          class="btn btn-primary mt-4"
          data-toggle="modal"
          data-target={`#addOrder`}
        >
          {" "}
          Add Product
        </button>
      </div>

      {/* 
            <button type="button" class="btn btn-success mt-5" data-toggle="modal" data-target={`#addOrder`} >
            Add
            </button> */}

      {/* <!-- The Modal --> */}
      <div class="modal" id="addOrder">
        <div class="modal-dialog">
          <div class="modal-content">
            {/* <!-- Modal Header --> */}
            <div class="modal-header">
              <h4 class="modal-title">Add Product</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div class="modal-body">
              <div className="d-flex justify-content-center">
                <div className="d-flex w-50 justify-content-center">
                  <form className="" onSubmit={onSubmitForm}>
                    <div class="row">
                      <div class="col">
                        {/* 1st input */}
                        <label>
                          Product
                          {/* <input 
                            type="text" 
                            name="product_name"
                            className="form-control" 
                            value={inputs.description} 
                            onChange={handleChange} 
                        /> */}
                          {/* select input value product_id name product_name */}
                          <select
                            name="product_id"
                            className="form-control"
                            // value={inputs.product_id}
                            onChange={handleChange}
                          >
                            <option value="0">Select Product</option>
                            {products.map((product) => (
                              <option
                                key={product.product_id}
                                value={product.product_id}
                              >
                                {product.product_name}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        {/* 4th */}
                        <label>
                          Quantity
                          <input
                            type="number"
                            name="quantity"
                            className="form-control"
                            value={inputs.quantity}
                            onChange={handleChange}
                          />
                        </label>
                      </div>

                      <div class="col mt-4">
                        {/* 6th */}
                        {/* <label>Shop
                        <input 
                            type="text" 
                            name="shop"
                            className="form-control" 
                            value={inputs.shop} 
                            onChange={handleChange} 
                        />
                        </label> */}
                        {/* submit button */}
                        <button
                          className="btn btn-success"
                          onClick={onSubmitForm}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
              >
                Edit
              </button>

              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center ">
        {/* <InputFeatured /> */}
        <div class="col-md-12 ml-5">
          <div class="row justify-content-center">
            <div class="col-md-6 mr-5">
              {/* <div class="table-responsive">  */}
              <table class="table mt-5 text-center">
                <thead>
                  <tr>
                    {/* <th>Featured ID</th> */}
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {prods.map((prod) => (
                    <tr>
                      <td>
                        {/* find product name from products array */}
                        {products
                          .filter(
                            (product) => product.product_id === prod.product_id
                          )
                          .map((product) => (
                            <p>{product.product_name}</p>
                          ))}
                      </td>
                      <td>{prod.packageitem.quantity}</td>
                      {/* <td>1</td> */}

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
                          onClick={() => deleteitem(prod)}
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
        </div>
      </div>
    </Fragment>
    //  </UserContext.Consumer>
  );
}

export default Contact;