import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

//components
// import InputProduct from "InputProduct";
import ListSupplierProducts from "./components/SupplierProductsList";
import Navbar from "../../../../system/Navbar";
import AddProductModal from "./components/AddProductModal";
// import EditProduct from "../admin/products/EditProduct";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  // ANCHOR ONSUMBITCSV
  const onSubmitCsvForm = async (e) => {
    e.preventDefault();

    try {
      const body = { products: products };
      // const response = await fetch("http://localhost:000/productsarray", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(body),
      // });
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/csv/supplierproduct",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  // ANCHOR ONCHANGECSV
  const handleCsvChange = (e) => {
    const csv = e.target.files[0];
    console.log("submit");
    const reader = new FileReader();
    reader.readAsText(csv);
    reader.onload = async (e) => {
      const text = e.target.result;
      const lines = text.split("\n");
      const headers = lines[0].split(",").map((header) => header.trim()); // Extract headers and trim whitespace
      const supplierIdIndex = headers.indexOf("supplier_id"); // Find the index of the "supplier_id" header
      const products = [];

      // remove all \r and split the line by ","
      for (let i = 1; i < lines.length; i++) {
        lines[i] = lines[i].replace("\r", "").split(",");

        // Skip lines with empty first column
        if (lines[i][0].trim() === "") {
          continue;
        }

        // Create product object with name and price based on headers
        const product = {};
        for (let j = 0; j < headers.length; j++) {
          // Skip the "supplier_id" header
          if (j === supplierIdIndex) {
            continue;
          }
          product[headers[j]] = lines[i][j].trim();
        }

        // Parse the supplier_id as an integer
        product.supplier_id = parseInt(lines[i][supplierIdIndex]);

        // Assign the subcategory_id as an integer (assuming selectedSubcategory is already an integer)
        product.subcategory_id = parseInt(selectedSubcategory);

        // Push the product into the products array
        products.push(product);
      }

      // log first 5 products
      console.log("products", products.slice(0, 25));
      setProducts(products);
    };
  };

  const [subcategories, setSubcategories] = useState([]);

  const getSubcategories = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/subcategory",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      setSubcategories(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getSubcategories();
  }, []);

  const [selectedSubcategory, setSelectedSubcategory] = useState(""); // State to store the selected subcategory ID

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container text-center p-3">
        {/* suppliers button */}
        <div class="row justify-content-center ">
          <div class="col-md-12">
            <Link to="/suppliers">
              <div className="btn btn-primary mt-5 mr-3">Suppliers</div>
            </Link>
          </div>
        </div>
        {/* title */}
        <div class="row justify-content-center ">
          <div class="col-md-12">
            <h1 className="text-center mt-5">Product List</h1>
          </div>
        </div>
        {/* add from csv */}
        <div class="d-flex justify-content-center ">
          {/* <div class="col-md-3 my-auto justify-content-center"> */}

          <button
            class="btn btn-primary mt-5 mr-3"
            data-toggle="modal"
            data-target={"#addCsv"}
          >
            {" "}
            Add From csv
          </button>
          {/* <!-- Add Csv Modal --> */}
          <div class="modal" id="addCsv">
            <div class="modal-dialog">
              <div class="modal-content">
                {/* <!-- Modal Header --> */}
                <div class="modal-header">
                  <h4 class="modal-title">Add From Csv</h4>
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                {/* <!-- Modal body --> */}
                <div class="modal-body">
                  <div className="d-flex justify-content-center">
                    {/* <div className="d-flex w-50 justify-content-center"> */}

                    {/* <div class ="row">
                <div class = "col ">
                   <form action="http://localhost:000/uploadcsv" method="post" enctype="multipart/form-data"> 
                      <input className="form-control" type="file" name="csv" />
                      <input className="form-control" type="submit" value="Upload" />
                  </form>
                </div>
                </div> */}

                    {/* Subcategory selector */}
                    <div className="row">
                      <div className="col">
                        <label>Select Subcategory:</label>
                        <select
                          className="form-control"
                          value={selectedSubcategory}
                          onChange={handleSubcategoryChange}
                        >
                          <option value="">Select Subcategory</option>
                          {subcategories.map((subcategory) => (
                            <option
                              key={subcategory.subcategory_id}
                              value={subcategory.subcategory_id}
                            >
                              {subcategory.subcategory_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* read csv input */}
                    <form className="" onSubmit={onSubmitCsvForm}>
                      <div class="row">
                        <div class="col">
                          {/* 1st input */}
                          <label>
                            Upload Csv
                            <input
                              type="file"
                              name="csv"
                              className="form-control"
                              onChange={handleCsvChange}
                            />
                          </label>
                        </div>
                      </div>
                      <button className="btn btn-success mt-3">Submit</button>
                    </form>

                    {/* </div> */}
                  </div>
                </div>

                {/* <!-- Modal footer --> */}
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <AddProductModal />
          {/* </div> */}
        </div>
        {/* prodlist */}
        <div class="row justify-content- mt-5 ">
          {/* <InputProduct /> */}
          {/* <div class="col-md-12 ml-5"> */}
          <ListSupplierProducts />
          {/* </div> */}
        </div>
      </div>
    </Fragment>
  );
}

export default ProductsList;
