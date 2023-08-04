import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../system/Navbar";
import { UserContext, CartContext, LoggedContext } from "../../App";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [prices, setPrices] = useState([]);

  const user = useContext(UserContext);
  const cartToken = useContext(CartContext);
  const loggedin = useContext(LoggedContext);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  // get user_id from decoded token
  const decoded = jwt_decode(token);
  const user_id = decoded.user_id;

  // Delete product function defined
  const deleteProduct = async (sale_id) => {
    try {
      const deleteProduct = await axios.delete(
        import.meta.env.VITE_APP_API_URL + "/api/Sale/" + sale_id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_APP_API_KEY,
          },
        }
      );

      setSales(sales.filter((sale) => sale.sale_id !== sale_id));
    } catch (error) {
      console.error(error.message);
    }
  };

  // Get products function defined
  const getSales = async () => {
    if (loggedin) {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL +
            "/api/ordercart/user/" +
            user_id +
            "?include=product",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
          }
        );

        const jsonData = await response.data;
        setSales(jsonData);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    getSales();
  }, [loggedin]);

  const checkout = async (event) => {
    event.preventDefault();

    const res = await axios.post(
      import.meta.env.VITE_API_URL + "cart/checkout",
      {
        loccart: sales,
        total: 5136,
      },
      {
        headers: {
          Authorization: `Bearer ${cartToken}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    window.location.reload();
  };

  const plus = async (sale) => {
    try {
      const body = {
        user_id: sale.user_id,
        product_id: sale.product_id,
        quantity: sale.quantity + 1,
      };

      const response = await axios.put(
        import.meta.env.VITE_API_URL + "/api/ordercart/" + sale.order_cart_id,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      getSales();
    } catch (error) {
      console.log(error.message);
    }
  };

  const minus = async (sale) => {
    try {
      const body = {
        user_id: sale.user_id,
        product_id: sale.product_id,
        quantity: sale.quantity - 1,
      };

      if (sale.quantity > 1) {
        const response = await axios.put(
          import.meta.env.VITE_API_URL + "/api/ordercart/" + sale.order_cart_id,
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
          }
        );
        getSales();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const remove = async (sale) => {
    try {
      const res = window.confirm("Are you sure you want to delete this item?");
      if (res) {
        const body = { cart_id: sale.ordercart_id };
        const response = await axios.delete(
          import.meta.env.VITE_API_URL + "/api/ordercart/" + sale.order_cart_id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
          }
        );

        getSales();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [manuallyEditCart, setManuallyEditCart] = useState(false);

  const navigate = useNavigate();

  const handleManuallyEditCart = () => {
    setManuallyEditCart(!manuallyEditCart);
  };

  // Group sales by supplier ID
  const groupedSales = {};
  sales.forEach((sale) => {
    if (!groupedSales[sale.product.supplier_id]) {
      groupedSales[sale.product.supplier_id] = [];
    }
    groupedSales[sale.product.supplier_id].push(sale);
  });

  const handleSupplierCheckout = async (supplierId) => {
    // Perform submit action for the sales belonging to the supplier with the given ID
    const salesToSubmit = groupedSales[supplierId];

    // Your submit logic goes here...
    // For example, you can send a request to the backend API with the salesToSubmit data.
    // You can use the 'axios' library or any other method you prefer.

    console.log(`Submitting sales for supplier ID: ${supplierId}`);
    console.log(salesToSubmit);

    // Navigate to the "/checkout" page with salesToSubmit data
    navigate("/checkout", { state: { sales: salesToSubmit } });

    // Calculate the total cost for sales of this supplier
    const totalCost = calculateTotal(salesToSubmit);
    console.log(`Total cost for supplier ${supplierId}: ${totalCost}`);
  };

  // Calculate the total cost for sales of a specific supplier
  const calculateTotal = (salesToSubmit) => {
    return salesToSubmit.reduce((total, sale) => {
      return total + sale.product.cost * sale.quantity;
    }, 0);
  };

  return (
    <Fragment>
      <Navbar />

      <h1 className="text-center mt-5">Cart</h1>

      {Object.keys(groupedSales).length > 0 ? (
        <div className="container mb-5">
          {Object.keys(groupedSales).map((supplierId) => (
            <div key={supplierId} className="mb-5">
              <h3>Supplier ID: {supplierId}</h3>
              <table className="table mt-5 col-md-8 text-center">
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Cost</th>
                    <th>Supplier</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedSales[supplierId].map((sale) => (
                    <tr key={sale.product.product_id}>
                      <td>{sale.product.product_id}</td>
                      <td>
                        {sale.product.size +
                          " - " +
                          sale.product.model +
                          " - " +
                          sale.product.product_name}
                      </td>
                      <td>
                        {!manuallyEditCart && (
                          <div className="row justify-content-center">
                            <div className="d-flex justify-content-center">
                              <button
                                className="btn btn-secondary"
                                onClick={() => minus(sale)}
                              >
                                <i className="fas fa-minus"></i>
                              </button>

                              <div className="col col-xs-2">
                                <input
                                  type="text"
                                  className="form-control text-center"
                                  value={sale.quantity}
                                  style={{ width: "60px", lineWidth: "60px" }}
                                />
                              </div>

                              <button
                                className="btn btn-secondary"
                                onClick={() => plus(sale)}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        )}
                        {manuallyEditCart && (
                          <div className="row justify-content-center">
                            <div className="d-flex justify-content-center">
                              <button className="btn btn-secondary disabled">
                                <i className="fas fa-minus"></i>
                              </button>

                              <div className="col col-xs-2 ">
                                <input
                                  type="integer"
                                  className="form-control text-center"
                                  defaultValue={sale.quantity}
                                  style={{ width: "60px", lineWidth: "60px" }}
                                />
                              </div>

                              <button className="btn btn-secondary disabled">
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                      <td>{sale.product.cost}</td>
                      <td>{sale.product.supplier_id}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4">
                      <div className="row justify-content-center">
                        <button
                          className="btn btn-success"
                          onClick={() => handleSupplierCheckout(supplierId)}
                        >
                          Checkout for Supplier {supplierId}
                        </button>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ))}
          <div className="col-md-8 text-center mt-3">
            <h3>Grand Total</h3>
            <div className="ml-1 mr-1">
              Total:{" "}
              {Object.keys(groupedSales).reduce((total, supplierId) => {
                return (
                  total +
                  groupedSales[supplierId].reduce((subtotal, sale) => {
                    return subtotal + sale.product.cost * sale.quantity;
                  }, 0)
                );
              }, 0)}
            </div>
          </div>
        </div>
      ) : (
        <h2 className="text-center mt-5">Cart empty</h2>
      )}
    </Fragment>
  );
};

export default SalesList;
