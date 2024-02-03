import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
// import {array} from "./AddProduct";

const AddOrder = ({ orders, setOrders, supplier_id }) => {
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  const user_id = jwt_decode(token).user_id;

  const getTotalCost = (orders) => {
    let total = 0;
    orders.forEach((order) => {
      total = parseInt(order.cost) * parseInt(order.quantity) + total;
    });
    return total;
  };

  const getTotalQuantity = (orders) => {
    let total = 0;
    orders.forEach((order) => {
      total += parseInt(order.quantity);
    });
    return total;
  };

  const getTotalProds = (orders) => {
    let total = 0;
    total = orders.length;
    return total;
  };

  // submit order
  // submit order
  const onSubmitForm = async (e) => {
    e.preventDefault();

    // let gettotal = getTotalCost(orders);

    if (!supplier_id) {
      alert("Please select a supplier");
      return;
    }

    let gettotal = 0;

    gettotal = getTotalCost(orders);

    console.log("gettotal", gettotal);

    if (window.confirm("Receive payment: " + gettotal + "K Tshs?")) {
      if (orders.length === 0) {
        alert("Please add items to order");
      } else {
        // return;
        try {
          // post order
          const res = await axios.post(
            import.meta.env.VITE_API_URL + "/api/order",
            {
              total_amount: getTotalCost(orders),
              user_id: user_id,
              source: "Pos",
              status: "Initialized",
              supplier_id: parseInt(supplier_id),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "x-api-key": import.meta.env.VITE_API_KEY,
              },
            }
          );

          // get order id from res
          const orderid = res.data.order_id;

          console.log("orders to post to orderitems is :", orders);

          // make a copy of orders with order_id
          let orderitems = orders.map((item) => ({
            ...item,
            order_id: orderid,
          }));

          // post orders to orderitems
          const res2 = await axios.post(
            import.meta.env.VITE_API_URL + "/invorderitems",
            {
              orderitems,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "x-api-key": import.meta.env.VITE_API_KEY,
              },
            }
          );
          // refresh page
          window.location.reload();
        } catch (error) {
          console.error(error.message);
        }
      }
    }
  };

  // plus
  const plus = (index) => {
    // Handle case when showDiscount is false and cart is null (use orders)
    let newOrders = [...orders];
    newOrders[index].quantity = parseInt(newOrders[index].quantity) + 1;
    setOrders(newOrders);
  };

  // minus
  const minus = (index) => {
    // Handle case when showDiscount is false and cart is null (use orders)
    let newOrders = [...orders];
    newOrders[index].quantity = parseInt(newOrders[index].quantity) - 1;
    setOrders(newOrders);
  };

  const remove = (index) => {
    let newOrders = orders.splice(index, 1);
    setOrders(newOrders);
  };

  return (
    // <div class="container d-flex justify-content-center">
    <div class="table-responsive">
      <table class="table table-bordered mt-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product</th>
            <th scope="col">Quantity</th>
            <th scope="col">Cost</th>
            <th scope="col">Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((object) => (
            <tr>
              {/* auto increment number */}
              <th scope="row">{orders.indexOf(object) + 1}</th>
              {/* <th scope="row">  </th> */}
              <td>{object.product_id}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger mr-2 btn-sm"
                  onClick={() => {
                    minus(orders.indexOf(object));
                  }}
                >
                  -
                </button>
                {object.quantity}
                {/* plus button adds quantity */}
                <button
                  type="button"
                  class="btn btn-primary ml-2 btn-sm"
                  onClick={() => {
                    plus(orders.indexOf(object));
                  }}
                >
                  +
                </button>
              </td>
              <td>{object.cost}</td>
              <td>{parseInt(object.cost) * parseInt(object.quantity)}</td>
              <td>
                <button
                  class="btn btn-danger"
                  onClick={() => {
                    remove(orders.indexOf(object));
                  }}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot class="bg-secondary text-white">
          <tr>
            <th scope="row">Totals</th>
            <td>{getTotalProds(orders)}</td>
            <td>{getTotalQuantity(orders)}</td>
            <td>{getTotalCost(orders)}</td>
            <td>
              <button class="btn btn-primary" onClick={onSubmitForm}>
                Submit Order
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    // </div>
  );
};

export default AddOrder;
