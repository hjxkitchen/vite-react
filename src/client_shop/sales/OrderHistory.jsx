import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import PublicNavbar from "../PublicNavbar";
import { UserContext, CartContext, LoggedContext } from "../../App";
import axios from "axios";

// import EditProduct from "../inventory/EditProduct";
// import ViewSaleItems from "./ViewSaleItems";

const SalesList = () => {
  const [sales, setSales] = useState([]);

  const user = useContext(UserContext);
  const cartToken = useContext(CartContext);
  const loggedin = useContext(LoggedContext);

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
          const user_id = user.user_id;
          const response = await fetch(
            "http://localhost:5000/sales/" + user_id
          );
          const jsonData = await response.json();
          // sort sales by sale_id
          jsonData.sort(function (a, b) {
            return b.sale_id - a.sale_id;
          });

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

  return (
    <Fragment>
      {user ? <Navbar /> : <PublicNavbar />}

      <h1 class="text-center mt-5">Order History</h1>

      {/* <ViewSaleItems /> */}
      {/* <div class="d-flex justify-content-center" > */}
      {/* <h2>Products Table</h2> */}
      {/* <p>The .table class adds basic styling (light padding and horizontal dividers) to a table:</p>             */}
      {/* <div class="row justify-content-center"> */}

      {/* <div class="container justify-content-center"> */}

      {sales.length > 0 ? (
        // <div class="col-md-0">
        // <div class="container center">
        // center the table
        <div class="container col-md-6">
          <table class="table mt-5 text-center ">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Order status</th>
                <th>Order total</th>
                {/* <th>Sale total</th>
            <th>Customer Id</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th> */}
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr>
                  <td>{sale.sale_id}</td>
                  <td>{sale.sale_date}</td>
                  <td>
                    <Link to="/sale_logs" state={{ sale: sale }}>
                      {sale.sale_status}
                    </Link>
                  </td>
                  <td>{sale.sale_total}</td>
                  {/*<td>{sale.user_id}</td> */}
                  {/* <td>{product.images}</td> */}
                  {/* <td> 
                        <input type="checkbox" checked={product.shop==true&&"true"}></input>
                    </td> */}
                  {/* <td>
                        <EditProduct product={product}/>
                    </td> */}
                  {/* <td> */}
                  {/* <button class="btn btn-primary" 
                        type="button" onClick={viewSale(sale)}>Open</button> */}
                  {/* <ViewSaleItems sale={sale}/> */}
                  {/* </td> */}
                  {/* <td>
                        <button class="btn btn-warning" 
                        onClick={() => deleteProduct(sale.sale_id)}>Edit</button>
                    </td> */}
                  {/* <td>
                        <button class="btn btn-danger"
                        onClick={() => deleteProduct(sale.sale_id)}>X</button>
                    </td> */}
                </tr>
              ))}
            </tbody>

            {/* footer */}
            <tfoot>
              <tr>
                <td>
                  {/* <div class="row justify-content-center">
                        <Link to="/checkout"><button class="btn btn-primary">Checkout</button></Link>
                    </div> */}
                  {/* <div class="row justify-content-center">
                        <button class="btn btn-primary" onClick={checkout}>Checkout</button>
                    </div> */}
                </td>
                <td></td>
                <td>
                  <div class="row justify-content-center">
                    <div class="ml-1 mr-1">Total: 5136</div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        // </div>
        // </div>
        <h2 class="text-center mt-5">No Orders</h2>
      )}

      {/* </div> */}

      {/* </div> */}
    </Fragment>
  );
};

export default SalesList;
