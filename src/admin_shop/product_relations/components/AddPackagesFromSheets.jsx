import React, { useState, useEffect } from "react";
import axios from "axios";

import Cookies from "js-cookie";

const SheetsAdd = () => {
  const [showModal, setShowModal] = useState(false);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

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

      const selectedSheet = "packages";

      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${selectedSheet}?key=${apiKey}`
      );

      const data = await response.json();

      // Assuming your Google Sheets data is organized in rows with headers as the first row
      const headers = data.values[0];

      const formattedData = data.values.slice(1).map((row) => {
        const rowData = {};
        for (let i = 0; i < headers.length; i++) {
          rowData[headers[i]] = row[i];
        }
        return rowData;
      });

      // Remove rows where package_name is null
      const filteredData = formattedData.filter((row) => row.package_name);

      console.log("package data: ", filteredData);
      setProducts(filteredData);
      return filteredData;
    } catch (error) {
      console.error("Error fetching sheet data:", error);
    }
  };

  const onSubmitCsvForm = async (e) => {
    e.preventDefault();

    try {
      const packages = await fetchSheetData();

      let currentPackageId = null;

      // Iterate through each row in the sheet
      for (const rowData of packages) {
        const { package_name, package_price, package_description } = rowData;

        // If it's a package row
        if (package_name !== "u") {
          // Add package to the packages table
          const packageResponse = await axios.post(
            import.meta.env.VITE_API_URL + "/api/package",
            {
              package_name,
              package_price,
              package_description,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "x-api-key": import.meta.env.VITE_API_KEY,
              },
            }
          );

          // Update currentPackageId for subsequent package items
          currentPackageId = packageResponse.data.package_id;

          console.log("crr", currentPackageId);
        } else if (currentPackageId) {
          console.log("crr2", currentPackageId);
          // If it's a package item row and there's a current package
          const productId = rowData.package_price; // Assuming this is product_id
          const quantity = rowData.package_description; // Assuming this is quantity

          // Skip empty cells
          if (productId && quantity) {
            // Add to the packageitems table
            await axios.post(
              import.meta.env.VITE_API_URL + "/api/packageitem",
              {
                package_id: currentPackageId,
                product_id: productId,
                quantity,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "x-api-key": import.meta.env.VITE_API_KEY,
                },
              }
            );
          }
        }
      }

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
