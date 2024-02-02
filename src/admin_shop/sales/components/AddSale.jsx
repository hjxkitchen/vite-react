import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext, ProdContext } from "../../../App";
// import {array} from "./AddProduct";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const AddSale = ({
  setSales,
  sales,
  setOrderTotal,
  customerid,
  customerphone,
  name,
  isNewContact,
}) => {
  const usercontext = useContext(UserContext);
  const prodcontext = useContext(ProdContext);

  const [loading, setLoading] = useState(false);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  const user_id = jwt_decode(token).user_id;
  const username = jwt_decode(token).username;

  console.log("addsale sales array", sales);

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

    console.log("name", name, "customerphone", customerphone);

    if (!customerphone) {
      alert("Please enter a phone number");
      return;
    }

    if (isNewContact) {
      if (name === null || customerphone === null) {
        alert("Please enter name and phone number");
        return;
      }
    }

    // receive payment prompt

    // let gettotal = getTotalCost(sales);

    let gettotal = 0;

    if (showDiscount) {
      gettotal = getTotalCost(discountCart);
    } else if (cart.length !== 0) {
      gettotal = getTotalCost(cart);
    } else {
      gettotal = getTotalCost(sales);
    }

    console.log("gettotal", gettotal);

    if (window.confirm("Receive payment: " + gettotal + "K Tshs?")) {
      if (showDiscount) {
        if (discountCart.length === 0) {
          alert("Please add items to sale");
          // return;
        } else {
          try {
            const res = await axios.post(
              import.meta.env.VITE_API_URL + "/api/sale",
              {
                total_amount: getTotalCost(discountCart),
                // user_id: customerid !== null ? customerid : 3,
                user_id: user_id,
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

            // add saleitems
            // get sale id from res
            const saleid = res.data.sale_id;

            console.log("sales to post to saleitems is :", discountCart);

            // make a copy of sales with sale_id
            let saleitems = discountCart.map((item) => ({
              ...item,
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

            // post to salelogs "sale initialized by {username}"
            const res6 = await axios.post(
              import.meta.env.VITE_API_URL + "/api/salelog",
              {
                sale_id: saleid,
                log_data: `Sale initialized by ${username}`,
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
      } else if (cart.length !== 0) {
        try {
          const res = await axios.post(
            import.meta.env.VITE_API_URL + "/api/sale",
            {
              total_amount: getTotalCost(cart),
              user_id: user_id,
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

          // add saleitems
          // get sale id from res
          const saleid = res.data.sale_id;

          console.log("sales to post to saleitems is :", cart);

          // make a copy of sales with sale_id
          let saleitems = cart.map((item) => ({
            ...item,
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

          // post to salelogs "sale initialized by {username}"
          const res6 = await axios.post(
            import.meta.env.VITE_API_URL + "/api/salelog",
            {
              sale_id: saleid,
              log_data: `Sale initialized by ${username}`,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "x-api-key": import.meta.env.VITE_API_KEY,
              },
            }
          );

          console.log("res6", res6.data);

          // refresh page
          // window.location.reload();
        } catch (error) {
          console.error(error.message);
        }
      } else {
        if (sales.length === 0) {
          alert("Please add items to sale");
          // return;
        } else {
          try {
            // post sale
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

            // get sale id from res
            const saleid = res.data.sale_id;

            console.log("sales to post to saleitems is :", sales);

            // make a copy of sales with sale_id
            let saleitems = sales.map((item) => ({
              ...item,
              sale_id: saleid,
            }));

            // post sales to saleitems
            const res2 = await axios.post(
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

            // post to salelogs "sale initialized by {username}"
            const res6 = await axios.post(
              import.meta.env.VITE_API_URL + "/api/salelog",
              {
                sale_id: saleid,
                log_data: `Sale initialized by ${username}`,
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
    }
  };

  // plus
  const plus = (index) => {
    if (showDiscount) {
      // Handle case when showDiscount is true (use discountCart)
      let newDiscountCart = [...discountCart];
      newDiscountCart[index].quantity =
        parseInt(newDiscountCart[index].quantity) + 1;
      setDiscountCart(newDiscountCart);
    } else if (cart.length === 0) {
      // Handle case when showDiscount is false and cart is null (use sales)
      let newSales = [...sales];
      newSales[index].quantity = parseInt(newSales[index].quantity) + 1;
      setSales(newSales);
    } else {
      // Handle case when showDiscount is false and cart is not null (use cart)
      let newCart = [...cart];
      newCart[index].quantity = parseInt(newCart[index].quantity) + 1;
      setCart(newCart);
    }
  };

  // minus
  const minus = (index) => {
    console.log("index", index, "cart", cart);
    if (showDiscount) {
      // Handle case when showDiscount is true (use discountCart)
      let newDiscountCart = [...discountCart];
      if (newDiscountCart[index].quantity > 1) {
        newDiscountCart[index].quantity =
          parseInt(newDiscountCart[index].quantity) - 1;
        setDiscountCart(newDiscountCart);
      }
    } else if (cart.length === 0) {
      // Handle case when showDiscount is false and cart is null (use sales)
      let newSales = [...sales];
      if (newSales[index].quantity > 1) {
        newSales[index].quantity = parseInt(newSales[index].quantity) - 1;
        setSales(newSales);
      }
    } else {
      // Handle case when showDiscount is false and cart is not null (use cart)
      let newCart = [...cart];
      if (newCart[index].quantity > 1) {
        newCart[index].quantity = parseInt(newCart[index].quantity) - 1;
        setCart(newCart);
      }
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

  // fill from cart
  const [cart, setCart] = useState([]);

  const fillfromcart = async () => {
    try {
      const res = await axios.get(
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
      console.log("cart", res.data);
      const cart = res.data;
      setCart(
        cart.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.product.price,
        }))
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const [showDiscount, setShowDiscount] = useState(false);

  const showDiscounts = () => {
    setShowDiscount(!showDiscount);
    if (cart.length !== 0) {
      setDiscountCart(cart);
    } else {
      setDiscountCart(sales);
    }
  };

  const [discountCart, setDiscountCart] = useState([]);

  const setDiscount = (product_id) => (e) => {
    console.log("product_id", product_id, "discount", e.target.value);
    console.log("cart", cart);
    // change price for that product
    if (cart.length !== 0) {
      console.log("cart");
      // make a deep copy of cart
      let newCart = JSON.parse(JSON.stringify(cart));

      let productIndex = newCart.findIndex(
        (item) => item.product_id === product_id
      );

      if (productIndex !== -1) {
        // Convert the price back to a number before applying the discount
        let newPrice =
          parseInt(newCart[productIndex].price) - parseInt(e.target.value);
        newCart[productIndex] = {
          ...newCart[productIndex],
          price: newPrice.toString(), // Convert back to string if needed for display
        };
        // make a copy of discount cart
        let newDiscountCart = [...discountCart];
        // change the price of the product
        newDiscountCart[productIndex] = {
          ...newDiscountCart[productIndex],
          price: newPrice.toString(),
        };
        // setDiscountCart(newCart);
        setDiscountCart(newDiscountCart);
      } else {
        console.log("Product not found in cart.");
      }
    } else {
      let newSales = [...sales];
      let productIndex = newSales.findIndex(
        (item) => item.product_id === product_id
      );

      if (productIndex !== -1) {
        // Convert the price back to a number before applying the discount
        let newPrice =
          parseInt(newSales[productIndex].price) - parseInt(e.target.value);
        newSales[productIndex] = {
          ...newSales[productIndex],
          price: newPrice.toString(), // Convert back to string if needed for display
        };
        // make a copy of discount cart
        let newDiscountCart = [...discountCart];
        // change the price of the product
        newDiscountCart[productIndex] = {
          ...newDiscountCart[productIndex],
          price: newPrice.toString(),
        };
        setDiscountCart(newDiscountCart);
      }
    }
  };

  useEffect(() => {
    console.log("sales updated", sales);
  }, [sales]);

  // cart to pos
  const carttopos = () => {
    console.log("cart", cart);

    let newSales = JSON.parse(JSON.stringify(cart)); // Make a deep copy of cart

    console.log("sales", newSales);
    setCart([]);
    setSales(newSales);

    // demo array
    // let demo = [
    //   {
    //     product_id: 1,
    //     quantity: 1,
    //     price: 100,
    //   },
    // ];

    // setSales(demo);
  };

  const sendQuote = () => {
    // // get all sale details and put in one variable
    // let sale = {
    //   total,
    //   products,
    // };

    // // get total and products and put it all in one string
    // let saleString = JSON.stringify(sale);

    console.log(sales, "sales");
    console.log(cart, "cart");
    console.log(discountCart, "discountCart");

    const salesArray = showDiscount
      ? discountCart
      : cart.length !== 0
      ? cart
      : sales;

    const total = getTotalCost(salesArray);

    console.log("custphone", customerphone);

    // if any of the inputs are empty, return alert
    if (!customerphone) return alert("Please fill all customer inputs");

    // confirm modal
    if (!window.confirm("Are you sure you want to send quote via whatsapp?"))
      return;

    setLoading(true);

    // add name propert to sales
    let salesWithName = salesArray.map((sale) => {
      let product_name = prodcontext.find(
        (prod) => prod.product_id === sale.product_id
      ).product_name;
      return { ...sale, product_name };
    });

    // all products to a nicely formatted string
    let saleString = salesWithName
      .map((product) => {
        return `${product.product_name.split(" ").slice(0, 3).join(" ")} - ${
          product.quantity
        }pcs - ${(product.price * 1000).toLocaleString()}Tshs`;
      })
      .join("\n")
      // add total to string
      .concat(`\nTotal: ${(total * 1000).toLocaleString()}Tshs`);

    console.log(saleString, "sale");

    // if NewContact, alert save first
    // if (NewContact) return alert("Please save customer first");

    // // get customer phone
    // const customer_phone = byName
    //   ? document.querySelector("input[name=customerrPhone]").value.trim()
    //   : createdNewContact
    //   ? document.querySelector("input[name=phonecode]").value.trim() +
    //     document
    //       .querySelector("input[name=customerPhone]")
    //       .value.replace(/\s+/g, "")
    //   : document.querySelector("input[name=customerPhone]").value.trim();

    console.log(customerphone, "customer_phone");

    // console.log(products);

    // if any of the inputs are empty, return alert
    // if (sales.length === 0) return alert("Please add products");

    // add to pendingsend
    axios.post(
      import.meta.env.VITE_API_URL + "/api/pendingsend",
      {
        customer_phone: customerphone,
        content: saleString,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    setLoading(false);

    // alert success
    alert("Quote will be sent shortly");
  };

  const sendQuoteSms = () => {
    // // get all sale details and put in one variable
    // let sale = {
    //   total,
    //   products,
    // };
    console.log(sales, "sales");
    console.log(cart, "cart");
    console.log(discountCart, "discountCart");

    const salesArray = showDiscount
      ? discountCart
      : cart.length !== 0
      ? cart
      : sales;

    // total is gettotalcost
    const total = getTotalCost(sales);

    console.log("custphone", customerphone);

    // // get total and products and put it all in one string
    // let saleString = JSON.stringify(sale);

    // if any of the inputs are empty, return alert
    if (!customerphone) return alert("Please fill all customer inputs");

    // confirm modal
    if (!window.confirm("Are you sure you want to send SMS?")) return;

    setLoading(true);

    // add name propert to sales
    let salesWithName = sales.map((sale) => {
      let product_name = prodcontext.find(
        (prod) => prod.product_id === sale.product_id
      ).product_name;
      return { ...sale, product_name };
    });

    // all products to a nicely formatted string
    let saleString = salesWithName
      .map((product) => {
        return `${product.product_name.split(" ").slice(0, 3).join(" ")} - ${
          product.quantity
        }pcs - ${(product.price * 1000).toLocaleString()}Tshs`;
      })
      .join("\n")
      // add total to string
      .concat(`\nTotal: ${(total * 1000).toLocaleString()}Tshs`);

    console.log(saleString, "sale");

    // if NewContact, alert save first
    // if (NewContact) return alert("Please save customer first");

    // get customer phone
    // const customer_phone = byName
    //   ? document.querySelector("input[name=customerrPhone]").value.trim()
    //   : createdNewContact
    //   ? document.querySelector("input[name=phonecode]").value.trim() +
    //     document
    //       .querySelector("input[name=customerPhone]")
    //       .value.replace(/\s+/g, "")
    //   : document.querySelector("input[name=customerPhone]").value.trim();

    console.log(customerphone, "customer_phone");

    // console.log(products);

    // if any of the inputs are empty, return alert
    // if (sales.length === 0) return alert("Please add products");

    // add to pendingsend
    axios.post(
      import.meta.env.VITE_API_URL + "/api/pendingsend",
      {
        customer_phone: customerphone,
        content: saleString,
        sms: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    setLoading(false);

    // alert success
    alert("Quote will be sent shortly");
  };

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      {cart.length === 0 && (
        <button class="btn btn-primary ml-5" onClick={fillfromcart}>
          Fill from cart
        </button>
      )}
      {cart.length !== 0 && (
        <button class="btn btn-primary ml-5" onClick={carttopos}>
          Cart to POS
        </button>
      )}
      <button
        // conditional className
        class={
          showDiscount
            ? "btn btn-outline-dark active ml-5"
            : "btn btn-outline active ml-5"
        }
        onClick={showDiscounts}
      >
        Discounts
      </button>
      <div class="container d-flex justify-content-center">
        <div class="table-responsive">
          <table class="table table-bsaleed mt-5 text-center">
            <thead>
              <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col">PID</th>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">@Price</th>
                {showDiscount && <th scope="col">Discount</th>}
                <th scope="col">Subtotal</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {showDiscount ? (
                discountCart.map((object) => (
                  <tr>
                    {/* auto increment number */}
                    {/* <th scope="row">{sales.indexOf(object) + 1}</th> */}
                    {/* <th scope="row">  </th> */}
                    <td>{object.product_id}</td>
                    <td>
                      {/* {object.product_id} */}
                      {/* get product name from prodcontext by id */}
                      {prodcontext.map((prod) => (
                        <a href={"/shop/products/" + prod.product_id}>
                          {prod.product_id === object.product_id
                            ? //  prod.size +
                              //   " - " +
                              //   prod.model +
                              //   " - " +
                              prod.product_name
                            : null}
                        </a>
                      ))}
                    </td>
                    <td>
                      <div class="d-flex">
                        <button
                          type="button"
                          class="btn btn-primary mr-1 btn-sm"
                          onClick={() => {
                            minus(discountCart.indexOf(object));
                          }}
                        >
                          -
                        </button>
                        {object.quantity}
                        <button
                          type="button"
                          class="btn btn-primary ml-1 btn-sm"
                          onClick={() => {
                            plus(discountCart.indexOf(object));
                          }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{object.price}K</td>
                    {showDiscount && (
                      <td>
                        <input
                          className="text-center"
                          type="number"
                          onChange={setDiscount(object.product_id)}
                          style={{ width: "50%" }}
                        />
                      </td>
                    )}
                    <td>
                      {parseInt(object.price) * parseInt(object.quantity)}K
                    </td>

                    {/* <td><button class="btn btn-danger" onClick={} >X</button></td> */}
                    {/* delete onclick filter  */}
                    <td>
                      {" "}
                      <button
                        class="btn btn-danger"
                        onClick={() => {
                          const updatedDiscountCart = discountCart.filter(
                            (item) => item !== object
                          );
                          setDiscountCart(updatedDiscountCart);
                        }}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  {cart.length === 0
                    ? sales.map((object) => (
                        <tr>
                          {/* auto increment number */}
                          {/* <th scope="row">{sales.indexOf(object) + 1}</th> */}
                          {/* <th scope="row">  </th> */}
                          <td>{object.product_id}</td>

                          <td>
                            {/* {object.product_id} */}
                            {/* get product name from prodcontext by id */}
                            {prodcontext.map((prod) => (
                              <a href={"/shop/products/" + prod.product_id}>
                                {prod.product_id === object.product_id //
                                  ? prod.product_name
                                  : null}
                              </a>
                            ))}
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
                          <td>
                            {parseInt(object.price) * parseInt(object.quantity)}
                            K
                          </td>
                          {/* <td><button class="btn btn-danger" onClick={} >X</button></td> */}
                          {/* delete onclick filter  */}
                          <td>
                            <button
                              class="btn btn-danger"
                              onClick={() => {
                                const updatedSales = sales.filter(
                                  (item) => item !== object
                                );
                                setSales(updatedSales);
                              }}
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      ))
                    : cart.map((object) => (
                        <tr>
                          {/* auto increment number */}
                          {/* <th scope="row">{sales.indexOf(object) + 1}</th> */}
                          {/* <th scope="row">  </th> */}
                          <td>{object.product_id}</td>

                          <td>
                            {/* {object.product_id} */}
                            {/* get product name from prodcontext by id */}
                            {prodcontext.map((prod) => (
                              <a href={"/shop/products/" + prod.product_id}>
                                {prod.product_id === object.product_id
                                  ? // prod.size +
                                    //   " - " +
                                    //   prod.model +
                                    //   " - " +
                                    prod.product_name
                                  : null}
                              </a>
                            ))}
                          </td>
                          <td>
                            <div class="d-flex">
                              <button
                                type="button"
                                class="btn btn-primary mr-1 btn-sm"
                                onClick={() => {
                                  minus(cart.indexOf(object));
                                }}
                              >
                                -
                              </button>
                              {object.quantity}
                              <button
                                type="button"
                                class="btn btn-primary ml-1 btn-sm"
                                onClick={() => {
                                  plus(cart.indexOf(object));
                                }}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td>{object.price}K</td>
                          <td>
                            {parseInt(object.price) * parseInt(object.quantity)}
                            K
                          </td>
                          {/* <td><button class="btn btn-danger" onClick={} >X</button></td> */}
                          {/* delete onclick filter  */}
                          <td>
                            <button
                              class="btn btn-danger"
                              onClick={() => {
                                const updatedCart = cart.filter(
                                  (item) => item !== object
                                );
                                setCart(updatedCart);
                              }}
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      ))}
                </>
              )}
            </tbody>
            <tfoot class="bg-secondary text-white">
              <tr>
                {/* <th scope="row">Totals</th> */}
                <td></td>
                <td>
                  {cart.length === 0
                    ? `${getTotalProds(sales)} products`
                    : `${getTotalProds(cart)} products`}
                </td>
                <td>
                  {cart.length === 0
                    ? `${getTotalQuantity(sales)} items`
                    : `${getTotalQuantity(cart)} items`}
                </td>
                <td></td>
                {showDiscount && <td></td>}
                <td>
                  {showDiscount ? (
                    <>{getTotalCost(discountCart)}K</>
                  ) : (
                    <>
                      {cart.length === 0
                        ? `${getTotalCost(sales)}K`
                        : `${getTotalCost(cart)}K`}
                    </>
                  )}
                </td>
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

      {/* send button */}
      <button
        className="btn btn-outline-dark"
        onClick={() => {
          sendQuote();
        }}
      >
        Send Quote Whatsapp
      </button>

      {/* send button */}
      <button
        className="btn btn-outline-dark"
        onClick={() => {
          sendQuoteSms();
        }}
      >
        Send Quote SMS
      </button>
    </>
  );
};

export default AddSale;
