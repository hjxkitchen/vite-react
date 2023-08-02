import React, { Fragment } from "react";

//components
// import InputSupplier from "../../components/InputSupplier";
import ListSuppliers from "./components/SuppliersList";
import Navbar from "../../../../system/Navbar";
import AddSupplierModal from "./components/AddSupplierModal";
// import EditSupplier from "admin/suppliers/EditSupplier";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function SuppliersList() {
  const [suppliers, setSuppliers] = useState([]);
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  // ANCHOR ONSUMBITCSV
  const onSubmitCsvForm = async (e) => {
    e.preventDefault();

    try {
      const body = { suppliers: suppliers };
      // const response = await fetch("http://localhost:000/suppliersarray", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(body),
      // });
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/csv/supplier",
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
      const suppliers = [];

      // remove all \r and split the line by ","
      for (let i = 1; i < lines.length; i++) {
        lines[i] = lines[i].replace("\r", "").split(",");

        // Skip lines with empty first column
        if (lines[i][0].trim() === "") {
          continue;
        }

        // Create supplier object with name and price based on headers
        const supplier = {};
        for (let j = 0; j < headers.length; j++) {
          supplier[headers[j]] = lines[i][j].trim();
        }

        // Push the supplier into the suppliers array
        suppliers.push(supplier);
      }

      // log first 5 suppliers
      console.log("suppliers", suppliers.slice(0, 25));
      setSuppliers(suppliers);
    };
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container text-center p-3">
        <div class="row justify-content-center ">
          <div class="col-md-9 mb-3">
            <h1 className="text-center mt-5">Suppliers</h1>
          </div>
          <div class="col-md-3 my-auto justify-content-center">
            {/* ADD FROM CSV BUTTON */}
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
            <AddSupplierModal />
          </div>
        </div>
        <div class="row justify-content-center ">
          {/* <InputSupplier /> */}
          <ListSuppliers />
        </div>
      </div>
    </Fragment>
  );
}

export default SuppliersList;
