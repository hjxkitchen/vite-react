import React, { useState, useEffect } from "react";
import axios from "axios";

const SheetsAdd = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const [sheetNames, setSheetNames] = useState([]);
  // const [selectedSheet, setSelectedSheet] = useState("");

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
  }, []);

  const [products, setProducts] = useState([]);

  //   fetchSheetData function
  const fetchSheetData = async () => {
    try {
      // Replace with your own API key
      const apiKey = "AIzaSyDiOiD6Fslc4tnnSz9aFpGnmHgRA19kfbc";

      // Replace with your Google Sheets document ID
      const spreadsheetId = "174kQ6F5UJ1iSSd3_9sV0Vtlq2Zehq1qtGYC3kC873yc";

      // const selectedSheet = "sheet5";
      const selectedSheet = "ProductsList";

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

          //   set supplierId to integer
          if (headers[i] === "supplier_id") {
            rowData[headers[i]] = parseInt(row[i]);
          }
        }
        return rowData;
      });

      console.log("prod data: ", formattedData);
      //   remove objects where product name is null
      formattedData.forEach((prod, index) => {
        if (
          prod.subcategory_id === "" ||
          prod.subcategory_id === null ||
          prod.subcategory_id === undefined
        ) {
          formattedData.splice(index, 1);
        }
      });

      // turn price to integer after removing commas, divide by 1000 and round to nearest whole number
      formattedData.forEach((prod, index) => {
        if (
          prod.price === "" ||
          prod.price === null ||
          prod.price === undefined
        ) {
          formattedData.splice(index, 1);
        } else {
          prod.price = Math.round(
            parseInt(prod.price.replace(/,/g, "")) / 1000
          );
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

      const body = { items: productsres, uniqueField: "product_name" };
      console.log("body to submit", body);
      //   console.log("body to submit", products);
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/csv/product",
        body
      );

      console.log("resdata: ", response.data);
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => setShowModal(!showModal)}
      >
        Add Products from Sheets
      </button>

      {showModal && (
        <div>
          <div>
            <div>
              <div>
                {/* <h3>Choose Sheet</h3> */}
                <h3>Confirm</h3>
              </div>
              <div>
                {/* Add select options for sheet selection here */}
                {/* <select
                  value={selectedSheet}
                  onChange={(e) => setSelectedSheet(e.target.value)}
                >
                  <option value="">Select a sheet</option>
                  {sheetNames.map((sheetName, index) => (
                    <option key={index} value={sheetName}>
                      {sheetName}
                    </option>
                  ))}
                </select> */}
              </div>
              <div>
                <button type="button" onClick={handleClose}>
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
