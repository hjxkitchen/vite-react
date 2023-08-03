import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

//components
// import InputProduct from "../../../components/InputProduct";
import ListProducts from "./components/ProductsList";
import Navbar from "../../system/Navbar";
import AddProductModal from "./components/AddProductModal";
import QuickAddProductModal from "./components/QuickAddProductModal";
// import EditProduct from "../../../../components/admin/products/EditProduct";

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

        // if cost is less than 50
        if (product.cost < 50) {
          // add product price by multiplying cost by 1.3 round to the nearest 5
          product.price = Math.round(product.cost * 1.7);
        }
        // if cost is less than 200
        else if (product.cost < 200) {
          // add product price by multiplying cost by 1.25 round to the nearest 5
          product.price = Math.round(product.cost * 1.5);
        }
        // if cost is less than 500
        else if (product.cost < 500) {
          // add product price by multiplying cost by 1.2 round to the nearest 5
          product.price = Math.round(product.cost * 1.4);
        }
        // if cost is less than 1000
        else {
          // add product price by multiplying cost by 1.15 round to the nearest 5
          product.price = Math.round(product.cost * 1.3);
        }

        // Push the product into the products array
        products.push(product);
      }

      // log first 5 products
      console.log("products", products.slice(0, 25));
      setProducts(products);
    };
  };

  // ANCHOR ONSUMBITCSV
  const onSubmitCsvSuppForm = async (e) => {
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
  const handleCsvSuppChange = (e) => {
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
        product.supplier_id = parseInt(selectedSupplier);

        // if cost is less than 50
        if (product.cost < 50) {
          // add product price by multiplying cost by 1.3 round to the nearest 5
          product.price = Math.round(product.cost * 1.7);
        }
        // if cost is less than 200
        else if (product.cost < 200) {
          // add product price by multiplying cost by 1.25 round to the nearest 5
          product.price = Math.round(product.cost * 1.5);
        }
        // if cost is less than 500
        else if (product.cost < 500) {
          // add product price by multiplying cost by 1.2 round to the nearest 5
          product.price = Math.round(product.cost * 1.4);
        }
        // if cost is less than 1000
        else {
          // add product price by multiplying cost by 1.15 round to the nearest 5
          product.price = Math.round(product.cost * 1.3);
        }

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

  const [suppliers, setSuppliers] = useState([]);
  const getSuppliers = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/supplier",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      setSuppliers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getSubcategories();
    getSuppliers();
  }, []);

  const [selectedSubcategory, setSelectedSubcategory] = useState(""); // State to store the selected subcategory ID

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const [selectedSupplier, setSelectedSupplier] = useState(""); // State to store the selected supplier ID

  const handleSupplierChange = (e) => {
    setSelectedSupplier(e.target.value);
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        {/* suppliers button */}
        <div class="d-flex justify-content-center ">
          <Link to="/suppliers">
            <div className="btn btn-primary mt-5 mr-3">Suppliers</div>
          </Link>
        </div>

        {/* buttons */}
        <div class="d-flex justify-content-center ml-3">
          {/* <div class="col-md-3 my-auto justify-content-center"> */}

          <Link to="/featuredadmin">
            <button class="btn btn-danger mt-5 mr-3"> Featured</button>
          </Link>
          <Link to="/packagesadmin">
            <button class="btn btn-warning mt-5 mr-3"> Packages</button>
          </Link>
          <Link to="/categories">
            <button class="btn btn-info mt-5 mr-3"> Categories</button>
          </Link>

          {/* </div> */}
        </div>

        {/* title */}
        <div class="row justify-content-center ">
          <div class="col-md-12">
            <h1 className="text-center mt-5">Products</h1>
          </div>
        </div>

        {/* Add buttons */}
        <div class="d-flex justify-content-center ">
          {/* <div class="col-md-3 my-auto justify-content-center"> */}

          {/* ADD FROM CSV BUTTON */}
          <button
            class="btn btn-primary mt-5 mr-3"
            data-toggle="modal"
            data-target={"#addCsv"}
          >
            {" "}
            Add From csv by Category
          </button>
          {/* <!-- Add Csv Modal --> */}
          <div class="modal" id="addCsv">
            <div class="modal-dialog">
              <div class="modal-content">
                {/* <!-- Modal Header --> */}
                <div class="modal-header">
                  <h4 class="modal-title">Add From Csv by Category</h4>
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

          {/* ADD FROM CSV BUTTON */}
          <button
            class="btn btn-primary mt-5 mr-3"
            data-toggle="modal"
            data-target={"#addCsvsupp"}
          >
            {" "}
            Add From csv by Supplier
          </button>
          {/* <!-- Add Csv Modal --> */}
          <div class="modal" id="addCsvsupp">
            <div class="modal-dialog">
              <div class="modal-content">
                {/* <!-- Modal Header --> */}
                <div class="modal-header">
                  <h4 class="modal-title">Add From Csv by Supplier</h4>
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
                        <label>Select Supplier:</label>
                        <select
                          className="form-control"
                          value={selectedSupplier}
                          onChange={handleSupplierChange}
                        >
                          <option value="">Select Supplier</option>
                          {suppliers.map((supplier) => (
                            <option
                              key={supplier.supplier_id}
                              value={supplier.supplier_id}
                            >
                              {supplier.supplier_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* read csv input */}
                    <form className="" onSubmit={onSubmitCsvSuppForm}>
                      <div class="row">
                        <div class="col">
                          {/* 1st input */}
                          <label>
                            Upload Csv
                            <input
                              type="file"
                              name="csv"
                              className="form-control"
                              onChange={handleCsvSuppChange}
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
          <QuickAddProductModal />
          {/* </div> */}
        </div>

        {/* list table */}
        <div class="row justify-content-center p-5 mt-5 ">
          {/* <InputProduct /> */}
          {/* <div class="col-md-12 ml-5"> */}
          <ListProducts />
          {/* </div> */}
        </div>
      </div>
    </Fragment>
  );
}

export default ProductsList;
