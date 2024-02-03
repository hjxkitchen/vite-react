import React, { useState, useEffect } from "react";
import Navbar from "../../system/Navbar";
import Footer from "../../system/Footer";
import axios from "axios";
import Cookies from "js-cookie";

import AddOrder from "./components/AddOrder";
import AddToOrder from "./components/AddToOrder";

const OrderPos = () => {
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [supplier_id, setSupplierId] = useState("");

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  const getSuppliers = async () => {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/supplier",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    const jsonData = await response.data;
    setSuppliers(jsonData);
    console.log("supplierslist:", jsonData);
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  const handleChange = (event) => {
    setSupplierId(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container text-center p-3">
        <h1 className="text-center mt-5">Order POS</h1>
        <div class="row justify-content-center ">
          {/* select with supplier */}
          <div class="col-md-3 my-auto justify-content-center">
            <select
              className="form-control mt-4"
              name="supplier_id"
              onChange={handleChange}
            >
              <option>Select Supplier</option>
              {suppliers.map((supplier) => (
                <option value={supplier.supplier_id}>
                  {supplier.supplier_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div class="row justify-content-center ">
          <div class="col-md-12">
            <AddToOrder orders={orders} setOrders={setOrders} />
          </div>

          <div class="col-md-12">
            <AddOrder
              orders={orders}
              setOrders={setOrders}
              supplier_id={supplier_id}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderPos;
