import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import PublicNavbar from "../../PublicNavbar";
import {
  UserContext,
  CartContext,
  LoggedContext,
  ProdContext,
} from "./../../../index";
import axios from "axios";

// import EditProduct from "../inventory/EditProduct";
// import ViewSaleItems from "./ViewSaleItems";

const SalesList = () => {
  const [sales, setSales] = useState([]);

  const user = useContext(UserContext);
  const cartToken = useContext(CartContext);
  const loggedin = useContext(LoggedContext);
  const prodcontext = useContext(ProdContext);

  //delete product function defined
  const deleteProduct = async (sale_id) => {
    try {
      const deleteProduct = await fetch(
        `http://localhost:5000/sales/${sale_id}`,
        {
          method: "DELETE",
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
      if (user !== null) {
        try {
          const user_idres = await axios.post(
            "http://localhost:5000/userbyemail",
            { user }
          );
          const user_id = user_idres.data[0].user_id;
          const response = await fetch(
            "http://localhost:5000/cartss/" + user_id
          );
          const jsonData = await response.json();
          setSales(jsonData);
          // console.log(products);
        } catch (error) {
          console.log(error.message);
        }
      } else {
        try {
          console.log("carttoken:", cartToken);
          const response = await fetch(
            "http://localhost:5000/cartsst/" + cartToken
          );
          const jsonData = await response.json();
          setSales(jsonData);
          // console.log(products);
        } catch (error) {
          console.log(error.message);
        }
      }
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

    const res = await axios.post("http://localhost:5000/cart/checkout", {
      loccart: sales,
      total: 5136,
    });

    // localStorage.removeItem("cart");
    // const res = window.confirm("Are you sure you want to checkout?");

    window.location.reload();
  };

  // plus
  const plus = async (sale) => {
    try {
      console.log("rspnse:", sale);

      const body = { cart_id: sale.cart_id };

      const response = await fetch(`http://localhost:5000/cart/plus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
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
      const body = { cart_id: sale.cart_id };

      if (sale.quantity > 1) {
        const response = await fetch(`http://localhost:5000/cart/minus`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        // confirm delete
        const res = window.confirm(
          "Are you sure you want to delete this item?"
        );
        if (res) {
          const response = await fetch(`http://localhost:5000/cart/remove`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
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
        const response = await fetch(`http://localhost:5000/cart/remove`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
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
      {user ? <Navbar /> : <PublicNavbar />}

      <h1 className="text-center mt-5">Cart</h1>

      {/* <ViewSaleItems /> */}
      {/* <div className="d-flex justify-content-center" > */}
      {/* <h2>Products Table</h2> */}
      {/* <p>The .table class adds basic styling (light padding and horizontal dividers) to a table:</p>             */}

      {sales.length > 0 ? (
        <div className="container mb-5">
          <div className="row justify-content-center">
            {/* <div className="col-sm-3 col-md-6 "> */}
            {/* <div className="table-responsive">  */}
            <table className="table mt-5  col-md-8 text-center">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  {/* <th>Subtotal</th> */}
                  {/* <th>Sale total</th>
            <th>Customer Id</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th> */}
                </tr>
              </thead>
              <tbody>
                {sortedSales.map((sale) => (
                  <tr>
                    <td>
                      {/* {sale.product_id} */}
                      {prodcontext.map((prod) =>
                        prod.product_id === sale.product_id
                          ? prod.product_name
                          : null
                      )}
                    </td>
                    <td>
                      {!manuallyEditCart && (
                        <div className="row justify-content-center ">
                          {/* // <div className="d-flex"> */}
                          {/* align d-flex center */}

                          <div className="d-flex justify-content-center">
                            <button
                              className="btn btn-secondary"
                              onClick={() => {
                                minus(sale);
                              }}
                            >
                              <i className="fas fa-minus"></i>
                            </button>

                            <div className=" col col-xs-2">
                              <input
                                type="text"
                                className="form-control text-center"
                                value={sale.quantity}
                                style={{ width: "60px", lineWidth: "60px" }}
                              />
                              {/* {sale.quantity} */}
                            </div>

                            <button
                              className="btn btn-secondary"
                              onClick={() => {
                                plus(sale);
                              }}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>

                          {/* </div> */}
                        </div>
                      )}
                      {manuallyEditCart && (
                        <div className="row justify-content-center ">
                          <div className="d-flex justify-content-center">
                            <button className="btn btn-secondary disabled">
                              <i className="fas fa-minus"></i>
                            </button>

                            <div className=" col col-xs-2 ">
                              <input
                                type="integer"
                                className="form-control text-center"
                                defeaultValue={sale.quantity}
                                style={{ width: "60px", lineWidth: "60px" }}
                              />
                              {/* {sale.quantity} */}
                            </div>

                            <button className="btn btn-secondary disabled">
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                    <td>100</td>
                    {/* <td>200</td> */}
                    {/*<td>{sale.user_id}</td> */}
                    {/* <td>{product.images}</td> */}
                    {/* <td> 
                        <input type="checkbox" checked={product.shop==true&&"true"}></input>
                    </td> */}
                    {/* <td>
                        <EditProduct product={product}/>
                    </td> */}
                    {/* <td> */}
                    {/* <button className="btn btn-primary" 
                        type="button" onClick={viewSale(sale)}>Open</button> */}
                    {/* <ViewSaleItems sale={sale}/> */}
                    {/* </td> */}
                    {/* <td>
                        <button className="btn btn-warning" 
                        onClick={() => deleteProduct(sale.sale_id)}>Edit</button>
                    </td> */}
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

              {/* footer */}
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
                    {!manuallyEditCart && (
                      <div className="row justify-content-center">
                        <button
                          className="btn btn-warning"
                          onClick={handleManuallyEditCart}
                        >
                          Edit Quantity
                        </button>
                      </div>
                    )}
                    {manuallyEditCart && (
                      <div className="row justify-content-center">
                        <button
                          className="btn btn-info"
                          onClick={handleManuallyEditCart}
                        >
                          Submit Quantity
                        </button>
                      </div>
                    )}
                  </td>
                  {/* <td></td> */}
                  <td>
                    <div className="row mt-2 ">
                      <div className=" mr-2">Total: 5136</div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>

            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      ) : (
        <h2 className="text-center mt-5">cart empty</h2>
      )}
    </Fragment>
  );
};

export default SalesList;
