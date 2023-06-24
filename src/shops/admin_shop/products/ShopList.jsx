import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

//components
// import InputProduct from "../../../components/InputProduct";
import ListProducts from "./components/ProductsList";
import Navbar from "../Navbar";
import AddProductModal from "./components/AddProductModal";
// import EditProduct from "../../../../components/admin/products/EditProduct";

function ProductsList() {
  const [products, setProducts] = useState([]);

  // ANCHOR ONSUMBITCSV
  const onSubmitCsvForm = async (e) => {
    e.preventDefault();

    try {
      const body = { products: products };
      const response = await fetch("http://localhost:5000/productsarray", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
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
        <div className="d-flex justify-content-center ml-3">
          {/* <div className="col-md-3 my-auto justify-content-center"> */}

          <Link to="/featured">
            <button className="btn btn-danger mt-5 mr-3"> Featured</button>
          </Link>
          <Link to="/packages">
            <button className="btn btn-warning mt-5 mr-3"> Packages</button>
          </Link>
          <Link to="/categories">
            <button className="btn btn-info mt-5 mr-3"> Categories</button>
          </Link>

          {/* </div> */}
        </div>

        <div className="row justify-content-center ">
          <div className="col-md-12">
            <h1 className="text-center mt-5">Shop List</h1>
          </div>
        </div>

        <div className="d-flex justify-content-center ">
          {/* <div className="col-md-3 my-auto justify-content-center"> */}

          <button
            className="btn btn-primary mt-5 mr-3"
            data-toggle="modal"
            data-target={"#addCsv"}
          >
            {" "}
            Add From csv
          </button>
          {/* <!-- Add Csv Modal --> */}
          <div className="modal" id="addCsv">
            <div className="modal-dialog">
              <div className="modal-content">
                {/* <!-- Modal Header --> */}
                <div className="modal-header">
                  <h4 className="modal-title">Add From Csv</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                {/* <!-- Modal body --> */}
                <div className="modal-body">
                  <div className="d-flex justify-content-center">
                    {/* <div className="d-flex w-50 justify-content-center"> */}

                    {/* <div class ="row">
                <div class = "col ">
                   <form action="http://localhost:5000/uploadcsv" method="post" enctype="multipart/form-data"> 
                      <input className="form-control" type="file" name="csv" />
                      <input className="form-control" type="submit" value="Upload" />
                  </form>
                </div>
                </div> */}

                    {/* read csv input */}
                    <form className="" onSubmit={onSubmitCsvForm}>
                      <div className="row">
                        <div className="col">
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
                <div className="modal-footer">
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

          <AddProductModal />
          {/* </div> */}
        </div>

        <div className="row justify-content- mt-5 ">
          {/* <InputProduct /> */}
          {/* <div className="col-md-12 ml-5"> */}
          <ListProducts />
          {/* </div> */}
        </div>
      </div>
    </Fragment>
  );
}

export default ProductsList;
