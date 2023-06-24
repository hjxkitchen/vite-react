import React, { Fragment, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import PublicNavbar from "../PublicNavbar";
// import { UserContext, ProdContext } from "./../../../../index";

function Contact() {
  // const user = useContext(UserContext);
  // const products = useContext(ProdContext);
  //   const cartToken = useContext(CartContext);

  const user = "me0";

  const location = useLocation();
  const { feature } = location.state;
  //   console.log("featured", feature);

  const [inputs, setInputs] = useState({});
  const [prods, setProds] = useState([]);

  const getProds = async () => {
    try {
      const url = "http://localhost:5000/subcategories/" + feature.category_id;
      console.log("url", url);
      const response = await fetch(url);
      const jsonData = await response.json();
      setProds(jsonData);
      console.log("jsondata:", jsonData);
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
      const url = "http://localhost:5000/subcategories/" + feature.category_id;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
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
        const url =
          "http://localhost:5000/packageitems/" + prod.package_item_id;
        const response = await fetch(url, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
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
      {/* navbar conditionaly rendered */}
      {user && <Navbar />}
      {!user && <PublicNavbar />}

      <h1 className="text-center mt-5">Category: {feature.category_name} </h1>

      <div className="row justify-content-center ">
        <button
          className="btn btn-primary mt-4"
          data-toggle="modal"
          data-target={`#addOrder`}
        >
          {" "}
          Add Subcat
        </button>
      </div>

      {/* 
            <button type="button" className="btn btn-success mt-5" data-toggle="modal" data-target={`#addOrder`} >
            Add
            </button> */}

      {/* <!-- The Modal --> */}
      <div className="modal" id="addOrder">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Add Subcategory</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <div className="d-flex justify-content-center">
                <div className="d-flex w-50 justify-content-center">
                  <form className="" onSubmit={onSubmitForm}>
                    <div className="row">
                      <div className="col">
                        {/* 1st input */}
                        <label>
                          Subcategory
                          {/* <input 
                            type="text" 
                            name="product_name"
                            className="form-control" 
                            value={inputs.description} 
                            onChange={handleChange} 
                        /> */}
                          {/* select input value product_id name product_name */}
                          {/* <select

                            name="product_name"
                            className="form-control"
                            // value={inputs.product_id}
                            onChange={handleChange}
                        >
                            <option value="0">Select Product</option>
                        </select> */}
                          {/* text input */}
                          <input
                            type="text"
                            name="subcat_name"
                            className="form-control"
                            // value={inputs.description}
                            defaultValue=""
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
              {/* <button type="button" 
            className="btn btn-warning" 
            data-dismiss="modal"
            >Edit</button> */}

              {/* submit button */}
              <button
                type="submit"
                className="btn btn-success"
                onClick={onSubmitForm}
                data-dismiss="modal"
              >
                Add
              </button>

              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center ">
        {/* <InputFeatured /> */}
        <div className="col-md-12 ml-5">
          <div className="row justify-content-center">
            <div className="col-md-6 mr-5">
              {/* <div className="table-responsive">  */}
              <table className="table mt-5 text-center">
                <thead>
                  <tr>
                    {/* <th>Featured ID</th> */}
                    <th>Subcategory</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {prods.map((prod) => (
                    <tr>
                      <td>{prod.subcat_name}</td>
                      <td>
                        <button
                          className="btn btn-danger"
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
