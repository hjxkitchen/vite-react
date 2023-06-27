import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

//components
// import InputProduct from "InputProduct";
import ListProducts from "./components/ProductsList";
import Navbar from "../Navbar";
import AddProductModal from "./components/AddProductModal";
// import EditProduct from "../admin/products/EditProduct";

function ProductsList() {
  const [products, setProducts] = useState([]);

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
        import.meta.env.VITE_API_URL + "/api/product",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
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
      const headers = lines[0].split(",");
      const products = [];
      // remove all \r
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("\r")) {
          lines[i] = lines[i].replace("\r", "");
        }

        //  join first 2 columns if second column is not empty
        if (lines[i].split(",")[1] !== "") {
          lines[i] =
            lines[i].split(",")[0] +
            "-" +
            lines[i].split(",")[1] +
            "," +
            lines[i].split(",")[2];
        }

        // remove all empty 2nd columns
        if (lines[i].split(",")[1] === "") {
          lines[i] = lines[i].split(",")[0] + "," + lines[i].split(",")[2];
        }

        // push lines as products name and price if line is not empty
        if (lines[i].split(",")[0] !== "") {
          products.push({
            name: lines[i].split(",")[0],
            price: lines[i].split(",")[1],
          });
        }
      }

      // log first 5 products
      console.log("products", products.slice(0, 25));
      setProducts(products);
    };
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <div class="row justify-content-center ">
          <div class="col-md-12">
            <h1 className="text-center mt-5">Inventory</h1>
          </div>
        </div>

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

        <div class="row justify-content- mt-5 ">
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
