import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext, ProdContext } from "../../../../index";
// import {array} from "./AddProduct";

const AddSale = ({ setSales, sales, setOrderTotal, customer }) => {
  const usercontext = useContext(UserContext);
  const prodcontext = useContext(ProdContext);

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
    // console.log(sales);
    // console.log(customer);

    if (customer.customer_name) {
      // console.log("customer name exists", customer.phone);
      if (customer.phone) {
        // get user from phone
        const user = await axios.get(
          `http://localhost:5000/users/ph/${customer.phone}`
        );
        console.log("usr", user.data[0]);

        // if user, then, add sale to database
        if (user.data.length > 0) {
          const res = await axios.post("http://localhost:5000/sales", {
            sales: sales,
            total: getTotalCost(sales),
            user_id: user.data[0].user_id,
          });
          console.log("resis", res.data);
          const res2 = await axios.post("http://localhost:5000/salelogs", {
            sale_id: res.data,
            salelog: ">>> Order initialized by: " + usercontext,
          });
          window.location.reload();
        } else {
          const confirm = window.confirm(
            "User does not exist. Would you like to create a new user?"
          );
          if (confirm) {
            // if no user, make one and give him a phone number
            const user = await axios.post("http://localhost:5000/users/ph", {
              name: customer.customer_name,
              phone: customer.phone,
            });
            console.log("user", user);
            const res = await axios.post("http://localhost:5000/sales", {
              sales: sales,
              total: getTotalCost(sales),
              user_id: user.data.user_id,
            });
            console.log("res", res);
            const res2 = await axios.post("http://localhost:5000/salelogs", {
              sale_id: res.data,
              salelog: ">>> Order initialized by: " + usercontext,
            });
            window.location.reload();
          }

          // then, add sale to database
        }
      } else {
        const confirm = window.confirm(
          "No phone number entered. Would you like to continue without adding one?"
        );
        if (confirm) {
          const res = await axios.post("http://localhost:5000/sales", {
            sales: sales,
            total: getTotalCost(sales),
            user_id: null,
          });
          console.log("resis", res);
          const res2 = await axios.post("http://localhost:5000/salelogs", {
            sale_id: res.data,
            salelog: ">>> Order initialized by: " + usercontext,
          });
          window.location.reload();
        }
      }
    } else {
      alert("Please enter a customer name");
    }

    try {
      // const res = axios.post("http://localhost:5000/sales", {
      //   sales: sales, total: getTotalCost(sales)});
    } catch (error) {
      console.error(error.message);
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
    console.log("newSales", newSales, "index", index);
    setSales(newSales);
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
                      setSales(
                        sales.filter(
                          (sale) =>
                            sales.indexOf(sale) !== sales.indexOf(object)
                        )
                      );
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
