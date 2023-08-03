import React, { useEffect, useState } from "react";
// import {array} from "./AddProduct";

const AddOrder = ({ orders }) => {
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
  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log(orders);
    try {
      // const response = await fetch("http://localhost:000/orders", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(orders),
      // });
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "orders",
        orders,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      window.location = "/orders";
    } catch (error) {
      console.error(error.message);
    }
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
          </tr>
        </thead>
        <tbody>
          {orders.map((object) => (
            <tr>
              {/* auto increment number */}
              <th scope="row">{orders.indexOf(object) + 1}</th>
              {/* <th scope="row">  </th> */}
              <td>{object.product_name}</td>
              <td>{object.quantity}</td>
              <td>{object.cost}</td>
              <td>{parseInt(object.cost) * parseInt(object.quantity)}</td>
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
