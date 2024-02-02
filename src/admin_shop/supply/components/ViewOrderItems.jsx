import React, { Fragment, useState, useEffect, useContext } from "react";
import { ProdContext } from "../../../App";
import axios from "axios";
import Cookies from "js-cookie";

const ViewOrderItems = ({ order }) => {
  const [orderItems, setorderItems] = useState([]);
  // const [order, setOrder] = useState({});
  const prodcontext = useContext(ProdContext);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  // console.log("vieworderitems order:", order);
  // console.log("getOrderItems id:", order.order_id);

  //get products function defeined
  // const getOrderItems = async () => {
  //   let id = order.order_id;
  //   try {
  //     // axios get
  //     // const response = await fetch("http://localhost:000/orderitems/" + id);
  //     const response = await axios.get(
  //       import.meta.env.VITE_API_URL + "/api/order/" + id + "?include=product",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "x-api-key": import.meta.env.VITE_API_KEY,
  //         },
  //       }
  //     );

  //     console.log("viweorderitems res:", response);
  //     const jsonData = await response.json();
  //     setorderItems(jsonData);
  //     return jsonData;
  //     // console.log(products);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  const subtotal = (orderitem) => {
    let total = orderitem.quantity * orderitem.price;
    // orderItems.forEach(order => {
    //   total = parseInt(order.price) * parseInt(order.quantity) + total;
    // });
    // setOrderTotal(total);
    return total;
  };

  // on load doc
  // useEffect(() => {
  //   getOrderItems();
  // }, []);

  return (
    <Fragment>
      {/* <!-- Button to Open the Modal --> */}
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target={`#viewordermodal${order.order_id}`}
      >
        View Order Items
      </button>

      {/* <!-- The Modal --> */}
      <div class="modal" id={`viewordermodal${order.order_id}`}>
        <div class="modal-dialog">
          <div class="modal-content">
            {/* <!-- Modal Header --> */}
            <div class="modal-header">
              <h4 class="modal-title">View Order Items</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div class="modal-body">
              {/* order details */}
              {/* <div class="mb-5">
          order id: {order.order_id}
          <br/>
          order date: {order.order_date}
          <br/>
          order status: {order.order_status}
          <br/>
          order total: {order.order_total}
          <br/>
          customer id: {order.user_id}
          <br/>
          </div> */}

              <div className="d-flex justify-content-center">
                {/* <div className="d-flex w-50 justify-content-center"> */}
                {/* table */}
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Product Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                      <th scope="col">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* foreach orderitems */}
                    {order.orderitems?.map((orderItem) => (
                      <tr>
                        {/* <td>{orderItem.product_id}</td> */}
                        <td>
                          {
                            prodcontext.find(
                              (product) =>
                                product.product_id === orderItem.product_id
                            ).product_name
                          }
                        </td>
                        <td>{orderItem.og_quantity}</td>
                        <td>{orderItem.cost}K</td>
                        <td>{orderItem.quantity * orderItem.cost}K</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* </div> */}
              </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
              >
                Edit
              </button>

              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ViewOrderItems;
