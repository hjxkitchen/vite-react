import React, { Fragment, useContext } from "react";
import Navbar from "../../system/Navbar";

import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext, ProdContext } from "../../App";
// import RSA encryption with nodejs js encrypt
// import buffer
// import { Buffer } from "buffer";

// import { JSEncrypt } from "nodejs-jsencrypt";
import { Buffer } from "buffer";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

// @ts-ignore
window.Buffer = Buffer;

function Checkout() {
  const user = useContext(UserContext);
  const prodcontext = useContext(ProdContext);
  const location = useLocation();
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  const { sales } = location.state;
  console.log("sales", sales);
  const [prices, setPrices] = React.useState([]);

  const priceres = async () => {
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
  };

  React.useEffect(() => {
    priceres();
  }, []);

  const checkout = async (event) => {
    event.preventDefault();

    // user by email
    const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
    const user_id = jwt_decode(token).user_id;

    console.log("sales to checkout", sales);

    // const res = await axios.post("http://localhost:000/cart/checkout", {
    //   loccart: sales,
    //   total: 5136,
    //   user_id: user_id,
    // });

    const res = await axios.post(
      import.meta.env.VITE_API_URL + "/api/order",
      {
        total_amount: grandtotal(),
        user_id: user_id,
        source: "Online",
        status: "Initialized",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    const saleid = res.data.sale_id;
    // add sale items
    // make a copy of sales with sale_id
    let saleitems = sales.map((item) => ({
      ...item,
      price: item.product.price,
      sale_id: saleid,
    }));

    // post sales to saleitems
    const res5 = await axios.post(
      import.meta.env.VITE_API_URL + "/saleitems",
      {
        saleitems,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    // remove cart items
    const res2 = await axios.delete(
      import.meta.env.VITE_API_URL + "/api/cart/user/" + user_id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    window.location.href = "/";
  };

  const mpesacheckout = async (event) => {
    event.preventDefault();
    // mpesa open api
    // const res = await axios.post("https://openapi.m-pesa.com/sandbox/ipg/v2/vodafoneGHA/c2bPayment/singleStage/");
    // const res = await axios.get("http://localhost:000/checkout/mpesaapi");
    const res = await axios.get(
      import.meta.env.VITE_APP_API_URL + "/checkout/mpesaapi",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_APP_API_KEY,
        },
      }
    );

    console.log("sessionKey", res);
  };

  const grandtotal = () => {
    return sales.reduce((total, sale) => {
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
    }, 0);
  };

  return (
    <Fragment>
      <Navbar />
      <div>
        <h1 class="text-center mt-5">Order Checkout</h1>
      </div>

      <div class="row justify-content-center">
        {/* <button onClick={mpesacheckout}>New checkout payment mpesa api</button> */}

        <div class="col-md-6">
          {/* <div class="table-responsive">  */}
          <table class="table mt-5 text-center">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Quantity</th>
                <th>@Price</th>
                <th>Subtotal</th>
                <th>Supplier ID</th>
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
                  <td>
                    {sale.product.size +
                      " - " +
                      sale.product.model +
                      " - " +
                      sale.product.product_name}
                  </td>
                  <td>
                    <div class="row justify-content-center">
                      <div class="ml-1 mr-1">{sale.quantity}</div>
                    </div>
                  </td>
                  <td>{sale.product.price}</td>
                  <td>{sale.product.price * sale.quantity}</td>
                  <td>{sale.product.supplier_id}</td>
                </tr>
              ))}
            </tbody>

            {/* footer */}
            <tfoot>
              <tr>
                <td>
                  <div class="row justify-content-center">
                    <button class="btn btn-primary" onClick={checkout}>
                      Checkout
                    </button>
                  </div>
                  {/* <div class="row justify-content-center">
                    <button class="btn btn-primary" onClick={checkout}>Checkout</button>
                </div> */}
                </td>
                <td></td>
                <td></td>
                <td>
                  <div class="row justify-content-center">
                    <div class="ml-1 mr-1">
                      Total:
                      {grandtotal()}
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>

          {/* </div> */}
        </div>
      </div>
    </Fragment>
  );
}

export default Checkout;
