import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../system/Navbar";
import {
  UserContext,
  CartContext,
  LoggedContext,
  ProdContext,
} from "./../../App";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

// import EditProduct from "../inventory/EditProduct";
// import ViewSaleItems from "./ViewSaleItems";

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [prices, setPrices] = useState([]);

  const user = useContext(UserContext);
  const cartToken = useContext(CartContext);
  const loggedin = useContext(LoggedContext);
  const prodcontext = useContext(ProdContext);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  // get user_id from decoded token
  const decoded = jwt_decode(token);
  const user_id = decoded.user_id;

  //delete product function defined
  const deleteProduct = async (sale_id) => {
    try {
      // const deleteProduct = await fetch(
      //   `http://localhost:000/sales/${sale_id}`,
      //   {
      //     method: "DELETE",
      //   }
      // );
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

  //get products function defeined
  const getSales = async () => {
    if (loggedin) {
      // if (user !== null) {
      try {
        console.log("uid:", user_id);
        // const user_id = user.user_id;
        // const response = await fetch(
        //   "http://localhost:000/cartss/" + user_id
        // );
        const response = await axios.get(
          import.meta.env.VITE_API_URL +
            "/api/cart/user/" +
            user_id +
            "?include=product",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
          }
        );

        console.log("data:", response.data);
        const jsonData = await response.data;
        setSales(jsonData);
        // console.log(products);

        const price = await axios.get(
          import.meta.env.VITE_API_URL +
            "/api/attr/product?attributes=product_id,price",
          {
            headers: {
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
          }
        );
        setPrices(price.data);
      } catch (error) {
        console.log(error.message);
      }
      // } else {
      //   try {
      //     console.log("carttoken:", cartToken);
      //     // const response = await fetch(
      //     //   "http://localhost:000/cartsst/" + cartToken
      //     // );
      //     const response = await axios.get(
      //       import.meta.env.VITE_API_URL + "cart/user/" + user_id,
      //       {
      //         headers: {
      //           Authorization: `Bearer ${token}`,
      //           "x-api-key": import.meta.env.VITE_API_KEY,
      //         },
      //       }
      //     );

      //     const jsonData = await response.json();
      //     setSales(jsonData);
      //     // console.log(products);
      //   } catch (error) {
      //     console.log(error.message);
      //   }
      // }
    }
  };

  // viewsale function
  // const viewSale = (sale) => {
  //     return <ViewSaleItems sale={sale}/>
  // }

  useEffect(() => {
    getSales();
  }, [loggedin]);

  const checkout = async (event) => {
    event.preventDefault();

    // const res = await axios.post("http://localhost:000/cart/checkout", {
    //   loccart: sales,
    //   total: 5136,
    // });

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

    // localStorage.removeItem("cart");
    // const res = window.confirm("Are you sure you want to checkout?");

    window.location.reload();
  };

  // plus
  const plus = async (sale) => {
    try {
      console.log("rspnse:", sale);

      const body = {
        user_id: sale.user_id,
        product_id: sale.product_id,
        quantity: sale.quantity + 1,
      };

      // const response = await fetch(`http://localhost:000/cart/plus`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(body),
      // });
      const response = await axios.put(
        import.meta.env.VITE_API_URL + "/api/cart/" + sale.cart_id,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      // console.log(response);
      // window.location.reload();
      getSales();
    } catch (error) {
      console.log(error.message);
    }
  };

  // minus
  const minus = async (sale) => {
    try {
      const body = {
        user_id: sale.user_id,
        product_id: sale.product_id,
        quantity: sale.quantity - 1,
      };

      if (sale.quantity > 1) {
        // const response = await fetch(`http://localhost:000/cart/minus`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(body),
        // });
        const response = await axios.put(
          import.meta.env.VITE_API_URL + "/api/cart/" + sale.cart_id,
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
          }
        );
      } else {
        // confirm delete
        const res = window.confirm(
          "Are you sure you want to delete this item?"
        );
        if (res) {
          // const response = await fetch(`http://localhost:000/cart/remove`, {
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify(body),
          // });
          const response = await axios.delete(
            import.meta.env.VITE_API_URL + "cart/remove" + sale.cart_id,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "x-api-key": import.meta.env.VITE_API_KEY,
              },
            }
          );
        }
      }

      // console.log(response);
      // window.location.reload();
      getSales();
    } catch (error) {
      console.log(error.message);
    }
  };

  const remove = async (sale) => {
    try {
      const res = window.confirm("Are you sure you want to delete this item?");
      if (res) {
        const body = { cart_id: sale.cart_id };
        // const response = await fetch(`http://localhost:000/cart/remove`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(body),
        // });
        const response = await axios.delete(
          import.meta.env.VITE_API_URL + "/api/cart/" + sale.cart_id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
          }
        );

        // console.log(response);
        // window.location.reload();
        getSales();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // sort sales by cart_id
  const sortSales = (sales) => {
    const sortedSales = sales.sort((a, b) => {
      return a.cart_id - b.cart_id;
    });
    return sortedSales;
  };

  const sortedSales = sortSales(sales);

  const [manuallyEditCart, setManuallyEditCart] = useState(false);

  const handleManuallyEditCart = () => {
    if (manuallyEditCart) {
      setManuallyEditCart(false);
    } else {
      setManuallyEditCart(true);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <h1 className="text-center mt-5">Cart</h1>

        {sales.length > 0 ? (
          <div className="d-flex  mb-5">
            <table className="table mt-5  text-center">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Quantity</th>
                  <th>@Price</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.product_id}>
                    <td>
                      <a href={"/shop/products/" + sale.product.product_id}>
                        {sale.product.product_name}
                      </a>
                    </td>
                    <td>
                      {!manuallyEditCart && (
                        <div class="row justify-content-center">
                          <div className="d-flex col-md-6">
                            <button
                              className="btn btn-secondary "
                              onClick={() => minus(sale)}
                            >
                              <i className="fas fa-minus"></i>
                            </button>
                            <div className="ml-2 mr-2">
                              <input
                                type="text"
                                className="form-control text-center"
                                value={sale.quantity}
                                style={{ width: "60px", lineHeight: "60px" }}
                                readOnly={!manuallyEditCart}
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
                        <div className="d-flex justify-content-center">
                          <button className="btn btn-secondary" disabled>
                            <i className="fas fa-minus"></i>
                          </button>
                          <div className="col col-xs-2">
                            <input
                              type="text"
                              className="form-control text-center"
                              defaultValue={sale.quantity}
                              style={{ width: "60px", lineHeight: "60px" }}
                            />
                          </div>
                          <button className="btn btn-secondary" disabled>
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      )}
                    </td>
                    <td>{sale.product.price}</td>
                    <td>{sale.product.price * sale.quantity}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => remove(sale)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <div className="row justify-content-center">
                      <Link to="/checkout" state={{ sales: sales }}>
                        <button className="btn btn-success">Checkout</button>
                      </Link>
                    </div>
                  </td>
                  <td>
                    {/* {!manuallyEditCart ? (
                      <div className="row justify-content-center">
                        <button
                          className="btn btn-warning"
                          onClick={handleManuallyEditCart}
                        >
                          Edit Quantity
                        </button>
                      </div>
                    ) : (
                      <div className="row justify-content-center">
                        <button
                          className="btn btn-info"
                          onClick={handleManuallyEditCart}
                        >
                          Submit Quantity
                        </button>
                      </div>
                    )} */}
                  </td>
                  <td></td>
                  <td>
                    <div className="row mt-2">
                      <div className="col-4"></div>
                      <div className="col-4">
                        <div className="mr-2">
                          Total:
                          {sales.reduce((total, sale) => {
                            return (
                              total +
                              prices.reduce((total, price) => {
                                return (
                                  total +
                                  (price.product_id === sale.product_id
                                    ? price.price * sale.quantity
                                    : 0)
                                );
                              }, 0)
                            );
                          }, 0)}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <h2 className="text-center mt-5">Cart is empty</h2>
        )}
      </div>
    </Fragment>
  );
};

export default SalesList;
