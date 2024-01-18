import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SheetsAdd from "./components/SheetsAdd";
import Table from "./components/Table";
import UploadForm from "./components/UploadMultiple";

import Navbar from "./../../system/Navbar";
import Footer from "./../../system/Footer";

import Cookies from "js-cookie";

const Products = () => {
  // products state
  const [products, setProducts] = useState([]);

  const [searched, setSearched] = useState(false);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  // get products function
  const getProducts = async () => {
    // get with axios
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/product",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    // get data from response
    const data = response.data;
    setProducts(data);
  };

  // useEffect hook
  useEffect(() => {
    getProducts();
  }, []);

  //   add product function
  const addProduct = async () => {
    let product_name = document.querySelector(
      "input[name='product_name']"
    ).value;
    let price = document.querySelector("input[name='price']").value;
    let cost = document.querySelector("input[name='cost']").value;

    // check for empty inputs
    if (!product_name || !price || !cost) {
      alert("Please fill out all fields");
      return;
    }

    // product object
    const newProduct = {
      product_name,
      price,
      cost,
    };

    // check for duplicates all lowercase remove spaces
    const duplicate = products.find(
      (product) =>
        product.product_name.toLowerCase().replace(/\s/g, "") ===
        newProduct.product_name.toLowerCase().replace(/\s/g, "")
    );

    if (duplicate) {
      alert("Product already exists");
      return;
    }

    // post with axios
    await axios.post(import.meta.env.VITE_API_URL + "/api/product", newProduct);

    // get products again
    getProducts();

    // clear inputs
    document.querySelector("input[name='product_name']").value = "";
    document.querySelector("input[name='price']").value = "";
    document.querySelector("input[name='cost']").value = "";
  };

  //   remove fucntion
  const removeProduct = async (id) => {
    // delete with axios
    await axios.delete(import.meta.env.VITE_API_URL + `/api/product/${id}`);

    // filter from products
    const newProducts = products.filter((product) => product.id !== id);

    // set products
    setProducts(newProducts);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Products</h1>

        <UploadForm />

        {/* sheets add component */}
        <SheetsAdd />

        <br />

        {/* 2 inputs */}
        <input type="text" placeholder="Name" name="product_name" />
        <input type="text" placeholder="Price" name="price" />
        <input type="text" placeholder="Cost" name="cost" />
        {/* add button */}
        <button
          className="btn btn-primary"
          onClick={() => {
            addProduct();
          }}
        >
          Add
        </button>

        <br />
        <br />

        {/* searchable react-table module */}
        <Table data={products} setProducts={setProducts} />
      </div>
      <Footer />
    </div>
  );
};

export default Products;
