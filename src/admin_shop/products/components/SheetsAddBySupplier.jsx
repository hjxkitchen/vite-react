import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const SheetsAdd = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

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

  const [selectedSupplier, setSelectedSupplier] = useState(""); // State to store the selected supplier ID

  const handleSupplierChange = (e) => {
    setSelectedSupplier(e.target.value);
  };

  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState("");

  useEffect(() => {
    // Replace with your own API key
    const apiKey = "AIzaSyDiOiD6Fslc4tnnSz9aFpGnmHgRA19kfbc";

    // Replace with your Google Sheets document ID
    const spreadsheetId = "174kQ6F5UJ1iSSd3_9sV0Vtlq2Zehq1qtGYC3kC873yc";

    // Fetch sheet names using the Google Sheets API
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const sheets = data.sheets.map((sheet) => sheet.properties.title);
        setSheetNames(sheets);
      })
      .catch((error) => console.error("Error fetching data:", error));

    getSuppliers();
  }, []);

  const [products, setProducts] = useState([]);

  //   fetchSheetData function
  const fetchSheetData = async () => {
    try {
      // Replace with your own API key
      const apiKey = "AIzaSyDiOiD6Fslc4tnnSz9aFpGnmHgRA19kfbc";

      // Replace with your Google Sheets document ID
      const spreadsheetId = "174kQ6F5UJ1iSSd3_9sV0Vtlq2Zehq1qtGYC3kC873yc";

      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${selectedSheet}?key=${apiKey}`
      );

      const data = await response.json();

      // Assuming your Google Sheets data is organized in rows with headers as the first row
      const headers = data.values[0];

      const formattedData = data.values.slice(1).map((row) => {
        const rowData = {};
        for (let i = 0; i < headers.length; i++) {
          //   set row data to header
          rowData[headers[i]] = row[i];

          //   set subcategory_id to integer
          if (headers[i] === "subcategory_id") {
            rowData[headers[i]] = parseInt(row[i]);
          }

          //   add supplier_id to each prod,
          // create new header subcat id
          if (headers[i] === "supplier_id") {
            rowData[headers[i]] = parseInt(selectedSupplier);
          }
        }
        return rowData;
      });

      console.log("prod data: ", formattedData);
      //   remove objects where product name is null
      formattedData.forEach((prod, index) => {
        if (prod.product_name === undefined) {
          formattedData.splice(index, 1);
        }
      });

      console.log("prod data2: ", formattedData);
      setProducts(formattedData);
      return formattedData;
    } catch (error) {
      console.error("Error fetching sheet data:", error);
    }
  };

  // You can add more logic here to handle sheet selection and further actions
  const onSubmitCsvForm = async (e) => {
    e.preventDefault();

    try {
      const productsres = await fetchSheetData();

      const body = { products: productsres };
      console.log("body to submit", body);
      //   console.log("body to submit", products);
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
  return (
    <div>
      <button className="btn btn-primary" onClick={handleShow}>
        Add Sheet by Supplier
      </button>

      {showModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Choose Sheet</h5>
                <button type="button" className="close" onClick={handleClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
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

                {/* Add select options for sheet selection here */}
                <select
                  className="form-control"
                  value={selectedSheet}
                  onChange={(e) => setSelectedSheet(e.target.value)}
                >
                  <option value="">Select a sheet</option>
                  {sheetNames.map((sheetName, index) => (
                    <option key={index} value={sheetName}>
                      {sheetName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onSubmitCsvForm}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SheetsAdd;
