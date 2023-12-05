import React, { Fragment, useEffect, useState } from "react";
import { useContext } from "react";
import { SubcatsContext } from "../../../App";
import axios from "axios";
import Cookies from "js-cookie";
import UploadMultiple from "../../../system/upload/UploadMultiple";

const EditProduct = ({ product }) => {
  const [description, setDescription] = useState(product.description);
  const [inputs, setInputs] = useState({});
  const [productImages, setProductImages] = useState([]);
  const subcats = useContext(SubcatsContext);
  // console.log("subcats", subcats);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  const getProductImages = async () => {
    try {
      // const response = await fetch(
      //   `http://localhost:000/product_images/${product.product_id}`
      // );
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/productimage/" + product.product_id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      const jsonData = await response.json();
      // console.log(jsonData);
      setProductImages(jsonData);
    } catch (error) {
      console.error(error.message);
    }
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
    getProductImages();
    getSubcategories();
  }, []);

  const [selectedSubcategory, setSelectedSubcategory] = useState(""); // State to store the selected subcategory ID

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  // const [file, setFile] = useState();
  // const [filename, setFilename] = useState("Choose File");

  // const saveFile = (e) => {
  //   setFile(e.target.files[0]);
  //   setFilename(e.target.files[0].name);
  // };

  // const uploadFile = async (e) => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   // formData.append("fileName", filename);
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:000/upload",
  //       formData
  //     );
  //     console.log(res);
  //   } catch (ex) {
  //     console.log(ex);
  //   }
  // };

  // console.log(product.product_id);

  const handleChange = (event) => {
    // console.log(event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  //edit description function
  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      // console.log("inputs", inputs);
      // const body = description;
      // const response = await fetch(`http://localhost:000/products/${product.id}`, {
      //     method: "PUT",
      //     headers: {"Content-Type": "application/json"},
      //     body: JSON.stringify(body)
      // });

      const response = await axios.put(
        import.meta.env.VITE_API_URL + "/api/product/" + product.product_id,
        inputs,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      window.location = "/shoplist";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      {/* <!-- Button to Open the Modal --> */}
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${product.product_id}`}
      >
        Edit
      </button>

      {/* <!-- The Modal --> */}
      <div class="modal" id={`id${product.product_id}`}>
        <div class="modal-dialog">
          <div class="modal-content">
            {/* <!-- Modal Header --> */}
            <div class="modal-header">
              <h4 class="modal-title">Edit Product {product.product_name}</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setDescription(product.product_name)}
              >
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div class="modal-body">
              <div className="d-flex justify-content-center">
                {/* <div className="d-flex w-50 justify-content-center"> */}
                <form className="" onSubmit={updateDescription}>
                  <div class="row">
                    <div class="col">
                      {/* 1st input */}
                      <label>
                        Product Name
                        <input
                          type="text"
                          name="product_name"
                          className="form-control"
                          // value={inputs.description}
                          defaultValue={product.product_name}
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                    <div class="col">
                      {/* 4th */}
                      <label>
                        Price
                        <input
                          type="number"
                          name="price"
                          className="form-control"
                          // value={inputs.price}
                          defaultValue={product.price}
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                  </div>
                  {/* Subcategory selector */}
                  <div className="row">
                    <div className="col">
                      <label>Select Subcategory:</label>
                      <select
                        className="form-control"
                        name="subcategory_id"
                        onChange={handleChange}
                      >
                        <option value={product.subcategory_id}>
                          {subcategories.map((subcategory) => {
                            if (
                              subcategory.subcategory_id ===
                              product.subcategory_id
                            ) {
                              return subcategory.subcategory_name;
                            }
                          })}
                        </option>
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
                  {/* old upload  */}
                  {/* <div class="row">
                    <div class="col mt-4 ">
                      <form
                        // action="http://localhost:000/upload"
                        action={import.meta.env.VITE_API_URL + "/upload"}
                        method="post"
                        enctype="multipart/form-data"
                      >
                        <input
                          className="form-control collapse"
                          type="number"
                          name="product_id"
                        />
                        <input
                          className="form-control"
                          type="file"
                          name="images"
                        />
                        <input
                          className="form-control"
                          type="submit"
                          value="Upload"
                        />
                      </form>
                    </div>
                  </div> */}
                  {/* new upload */}
                  <UploadMultiple product_id={product.product_id} />
                </form>
                {/* </div> */}
              </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateDescription(e)}
              >
                Edit
              </button>

              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(product.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProduct;
