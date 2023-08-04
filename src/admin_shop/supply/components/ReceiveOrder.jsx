import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AddModal = ({ order }) => {
  const [inputs, setInputs] = useState({});
  const [warehouses, setWarehouses] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const getWarehouses = async () => {
    const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

    const res = await axios.get(
      import.meta.env.VITE_API_URL + "/api/warehouse?include=warehousesection",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    setWarehouses(res.data);
  };

  useEffect(() => {
    getWarehouses();
  }, []);

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const selectWarehouse = (event) => {
    setSelectedWarehouse(parseInt(event.target.value));
  };

  const handleProductSelection = (event) => {
    const productId = parseInt(event.target.value);
    const isChecked = event.target.checked;
    const product = order.products.find((p) => p.product_id === productId);

    if (product) {
      if (isChecked) {
        setSelectedProducts((prevSelectedProducts) => [
          ...prevSelectedProducts,
          {
            product_id: product.product_id,
            quantity: product.orderitem.quantity,
            selectedQuantity: product.orderitem.quantity,
          },
        ]);
      } else {
        setSelectedProducts((prevSelectedProducts) =>
          prevSelectedProducts.filter((p) => p.product_id !== productId)
        );
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

      //   const data = {
      //     products: selectedProducts,
      //   };

      // add warehousesectionid to each product
      const data = selectedProducts.reduce((acc, product) => {
        const remainingQuantity = product.quantity - product.selectedQuantity;
        acc.push({
          product_id: product.product_id,
          quantity: product.selectedQuantity,
          warehouse_section_id: warehousesectionid,
        });
        if (remainingQuantity > 0) {
          acc.push({
            product_id: product.product_id,
            quantity: remainingQuantity,
            warehouse_section_id: null,
          });
        }
        return acc;
      }, []);

      console.log("warehousedata", data);

      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/warehouseitems",
        {
          warehouseitems: data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      // console.log("Receive Order response:", response.data);
      // window.location.reload();
    } catch (error) {
      console.error("Error receiving order:", error.message);
    }
  };

  const [warehousesectionid, setWarehousesectionid] = useState(0);
  const handlewarehousesectionChange = (event) => {
    const warehouseSectionId = parseInt(event.target.value);
    setWarehousesectionid(warehouseSectionId);
    console.log("warehouseSectionId", event.target.value);
  };

  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.map((p) => {
        if (p.product_id === productId) {
          return {
            ...p,
            selectedQuantity: Math.max(1, Math.min(quantity, p.quantity)),
          };
        }
        return p;
      })
    );
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary mt-4 mb-4 mx-auto d-block"
        data-toggle="modal"
        data-target="#exampleModal1"
        onClick={handleShow}
      >
        Receive Order
      </button>

      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Receive Order
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="products" className="col-form-label">
                    Products:
                  </label>
                  {order.products?.map((product) => (
                    <div key={product.product_id} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`product_${product.product_id}`}
                        name={`product_${product.product_id}`}
                        value={product.product_id}
                        onChange={handleProductSelection}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`product_${product.product_id}`}
                      >
                        {product.orderitem.quantity +
                          " x " +
                          product.size +
                          " - " +
                          product.model +
                          " - " +
                          product.product_name}
                      </label>
                      {selectedProducts.find(
                        (p) => p.product_id === product.product_id
                      ) && (
                        <div>
                          <input
                            type="number"
                            min="0"
                            max={
                              selectedProducts.find(
                                (p) => p.product_id === product.product_id
                              ).quantity
                            }
                            value={
                              selectedProducts.find(
                                (p) => p.product_id === product.product_id
                              ).selectedQuantity
                            }
                            onChange={(event) =>
                              handleQuantityChange(
                                product.product_id,
                                parseInt(event.target.value)
                              )
                            }
                          />
                          <select
                            className="form-control"
                            onChange={handlewarehousesectionChange}
                          >
                            <option value="">Select a warehouse section</option>
                            {warehouses
                              ?.filter(
                                (warehouse) =>
                                  warehouse.warehouse_id === selectedWarehouse
                              )[0]
                              ?.warehousesections.map((section) => (
                                <option
                                  key={section.warehouse_section_id}
                                  value={section.warehouse_section_id}
                                >
                                  {section.warehouse_section_name}
                                </option>
                              ))}
                          </select>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="form-group">
                  <label htmlFor="warehouse" className="col-form-label">
                    Warehouse:
                  </label>
                  <select
                    className="form-control"
                    id="warehouse"
                    name="warehouse"
                    onChange={selectWarehouse}
                  >
                    <option value="">Select a warehouse</option>
                    {warehouses?.map((warehouse) => (
                      <option
                        key={warehouse.warehouse_id}
                        value={warehouse.warehouse_id}
                      >
                        {warehouse.warehouse_name}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Receive Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddModal;
