import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
// prodcontext
import { ProdContext } from "../../../App";

const AddModal = ({ order, setOrder }) => {
  const [inputs, setInputs] = useState({});
  const [warehouses, setWarehouses] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const prods = useContext(ProdContext);

  console.log("prods", prods);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  const username = jwt_decode(token).username;

  // console.log("order", order);

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
    const product = order.orderitems.find((p) => p.product_id === productId);

    if (product) {
      if (isChecked) {
        setSelectedProducts((prevSelectedProducts) => [
          ...prevSelectedProducts,
          {
            product_id: product.product_id,
            quantity: product.quantity,
            selectedQuantity: product.quantity,
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

      console.log("selectedProducts", selectedProducts);

      // warehouse_section_id: warehousesectionid,
      // warehouse_id: selectedWarehouse,

      // modify slecetedProducts to include warehouse_section_id and warehouse_id and make selectedQuantity becom quantity
      let newSelectedProducts = selectedProducts.map((item) => ({
        ...item,
        warehouse_id: selectedWarehouse,
        quantity: item.selectedQuantity,
      }));

      console.log("newSelectedProducts", newSelectedProducts);

      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/warehouseitems",
        {
          warehouseitems: newSelectedProducts,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      // set quantity as inventoried in orderitems where product_id = product_id and order_id = order_id
      const response2 = await axios.put(
        import.meta.env.VITE_API_URL + "/invorderitems/" + order.order_id,
        {
          orderitems: newSelectedProducts,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      const response3 = await axios.put(
        import.meta.env.VITE_API_URL + "/api/order/" + order.order_id,
        {
          status: "receiving",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      // post to orderlog; status updated to receiving by user
      const response4 = await axios.post(
        import.meta.env.VITE_API_URL + "/api/orderlog",
        {
          order_id: order.order_id,
          log_data: `Status Updated to receiving by ${username}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      console.log("Receive Order response:", response2.data);
      window.location.reload();
    } catch (error) {
      console.error("Error receiving order:", error.message);
    }
  };

  const [warehousesectionid, setWarehousesectionid] = useState(0);

  const handlewarehousesectionChange = (e, product_id) => {
    const warehouseSectionId = parseInt(e.target.value);

    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.map((p) => {
        if (p.product_id === product_id) {
          return {
            ...p,
            warehouse_section_id: warehouseSectionId,
          };
        }
        return p;
      })
    );

    // setWarehousesectionid(warehouseSectionId);
    // console.log("warehouseSectionId", event.target.value);
  };

  const handleQuantityChange = (productId, quantity) => {
    console.log("handlingcxhange", productId, quantity);
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.map((p) => {
        if (p.product_id === productId) {
          return {
            ...p,
            selectedQuantity: Math.max(
              1,
              Math.min(quantity, parseInt(p.quantity))
            ),
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
                <div className="form-group">
                  <label htmlFor="products" className="col-form-label">
                    Products:
                  </label>
                  {order.orderitems?.map((product) => (
                    <div key={product.product_id} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`product_${product.product_id}`}
                        name={`product_${product.product_id}`}
                        value={product.product_id}
                        onChange={handleProductSelection}
                        // if quantity is 0, disable checkbox
                        disabled={product.quantity === 0}
                        // checked={product.quantity === 0}
                      />

                      <label
                        className="form-check-label"
                        htmlFor={`product_${product.product_id}`}
                      >
                        <p // strike through text if quantity is 0
                          style={
                            product.quantity === 0
                              ? { textDecoration: "line-through", color: "red" }
                              : {}
                          }
                        >
                          {/* {product.quantity + " x " + product.product_id} */}
                          {product.quantity + " x "}
                          {/* prod id to name using prods */}
                          {
                            prods.find(
                              (p) => p.product_id === product.product_id
                            )?.product_name
                          }{" "}
                        </p>
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
                            onChange={(e) =>
                              handlewarehousesectionChange(
                                e,
                                product.product_id
                              )
                            }
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
