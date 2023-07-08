import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext, ProdContext } from "../../../../../App";
// import {array} from "./AddProduct";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const AddSale = ({ setSales, sales, setOrderTotal, customerid }) => {
  const usercontext = useContext(UserContext);
  const prodcontext = useContext(ProdContext);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  const user_id = jwt_decode(token).user_id;

  const navigate = useNavigate();
  const getTotalCost = (sales) => {
    let total = 0;
    sales.forEach((sale) => {
      total = parseInt(sale.price) * parseInt(sale.quantity) + total;
    });
    setOrderTotal(total);
    return total;
  };

  const getTotalQuantity = (sales) => {
    let total = 0;
    sales.forEach((sale) => {
      total += parseInt(sale.quantity);
    });
    return total;
  };

  const getTotalProds = (sales) => {
    let total = 0;
    total = sales.length;
    return total;
  };

  // submit sale
  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (sales.length === 0) {
      alert("Please add items to sale");
      return;
    } else {
      try {
        const res = await axios.post(
          import.meta.env.VITE_API_URL + "/api/sale",
          {
            total_amount: getTotalCost(sales),
            user_id: customerid !== null ? customerid : 3,
            source: "Pos",
            status: "Initialized",
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
  };

  // plus
  const plus = (index) => {
    let newSales = [...sales];
    newSales[index].quantity = parseInt(newSales[index].quantity) + 1;
    setSales(newSales);
  };

  // minus
  const minus = (index) => {
    let newSales = [...sales];
    if (newSales[index].quantity > 1) {
      newSales[index].quantity = parseInt(newSales[index].quantity) - 1;
      setSales(newSales);
    }
  };

  // // remove
  // const remove = (index) => {
  //   let newSales = [...sales];
  //   newSales.splice(index, 1);
  //   setSales(newSales);
  // }

  // remove item from list
  const removeitem = (index) => {
    let newSales = [...sales];
    newSales.splice(index, 1);
    setSales(newSales);
    console.log("newSales", newSales, "index", index);
  };

  return (
    <div class="container d-flex justify-content-center">
      <div class="table-responsive">
        <table class="table table-bsaleed mt-5 text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">@Price</th>
              <th scope="col">Subtotal</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((object) => (
              <tr>
                {/* auto increment number */}
                <th scope="row">{sales.indexOf(object) + 1}</th>
                {/* <th scope="row">  </th> */}
                <td>
                  {/* {object.product_id} */}
                  {/* get product name from prodcontext by id */}
                  {prodcontext.map((prod) =>
                    prod.product_id === object.product_id
                      ? prod.product_name
                      : null
                  )}
                </td>
                <td>
                  <div class="d-flex">
                    <button
                      type="button"
                      class="btn btn-primary mr-1 btn-sm"
                      onClick={() => {
                        minus(sales.indexOf(object));
                      }}
                    >
                      -
                    </button>
                    {object.quantity}
                    <button
                      type="button"
                      class="btn btn-primary ml-1 btn-sm"
                      onClick={() => {
                        plus(sales.indexOf(object));
                      }}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{object.price}K</td>
                <td>{parseInt(object.price) * parseInt(object.quantity)}K</td>
                {/* <td><button class="btn btn-danger" onClick={} >X</button></td> */}
                {/* delete onclick filter  */}
                <td>
                  <button
                    class="btn btn-danger"
                    onClick={() => {
                      setSales(sales.splice(sales.indexOf(object), 1));
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
              <td>{getTotalProds(sales)} products</td>
              <td>{getTotalQuantity(sales)} items</td>
              <td></td>
              <td>{getTotalCost(sales)}K</td>
              <td>
                <button class="btn btn-primary" onClick={onSubmitForm}>
                  Submit = Paid
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AddSale;
