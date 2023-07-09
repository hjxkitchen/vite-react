import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../system/Navbar";

// import PublicNavbar from "../PublicNavbar";
import { UserContext, CartContext, LoggedContext } from "../../App";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

// import EditProduct from "../inventory/EditProduct";
// import ViewSaleItems from "./ViewSaleItems";

const SalesList = () => {
  const [sales, setSales] = useState([]);

  const user = useContext(UserContext);
  const cartToken = useContext(CartContext);
  const loggedin = useContext(LoggedContext);
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  const user_id = jwt_decode(token).user_id;

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
        import.meta.env.VITE_APP_API_URL + "/api/sale/" + sale_id,
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
    try {
      // const user_id = user.user_id;
      // const response = await fetch(
      //   "http://localhost:000/sales/" + user_id
      // );
      console.log("user_id", user_id);
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/user/" + user_id + "?include=sale",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      const jsonData = await response.data.sales;
      // sort sales by sale_id
      jsonData.sort(function (a, b) {
        return b.sale_id - a.sale_id;
      });

      setSales(jsonData);
      // console.log(products);
    } catch (error) {
      console.log(error.message);
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
      import.meta.env.VITE_APP_API_URL + "/api/sale",
      {
        loccart: sales,
        total: 5136,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_APP_API_KEY,
        },
      }
    );

    // localStorage.removeItem("cart");
    // const res = window.confirm("Are you sure you want to checkout?");

    window.location.reload();
  };

  return (
    <Fragment>
      <Navbar />

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
        <div class="row justify-content-center">
          <div class="container col-6">
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
                    <td>{sale.createdAt.slice(0, 10)}</td>
                    <td>
                      <Link to={"/sale_logs/" + sale.sale_id}>
                        {sale.status}
                      </Link>
                    </td>
                    <td>{sale.total_amount}</td>
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
            </table>
          </div>
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
