import React, { useState, useEffect } from "react";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import Navbar from "../../system/Navbar";
import Footer from "../../system/Footer";

const App = () => {
  // delivery state
  const [delivery, setDelivery] = useState(false);

  // recepeint customer state
  const [recepientCustomer, setRecepientCustomer] = useState(true);

  // transaction products state
  const [products, setProducts] = useState([]);

  // total state
  const [total, setTotal] = useState(0);

  // sales state
  const [sales, setSales] = useState([]);

  const [productsOptions, setProductsOptions] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [defaultPrice, setDefaultPrice] = useState(0);

  const [discount, setDiscount] = useState(0);

  const [phoneOptions, setPhoneOptions] = useState([]);

  const [nameOptions, setNameOptions] = useState([]);

  const [contacts, setContacts] = useState([]);

  const [NewContact, setNewContact] = useState(false);

  const [createdNewContact, setCreatedNewContact] = useState(false);

  const [byName, setByName] = useState(false);

  const [loading, setLoading] = useState(false);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  console.log("token is : ", token);

  const addNewContact = () => {
    const customer_name = toCamelCase(
      document.querySelector("input[name=customerName]").value
    );

    // Function to convert a string to camelCase
    function toCamelCase(str) {
      return str.replace(/\b\w/g, (match) => match.toUpperCase());
    }

    // get customer phone
    const customer_phone =
      document.querySelector("input[name=phonecode]").value.trim() +
      document
        .querySelector("input[name=customerPhone]")
        .value.replace(/\s+/g, "");

    // if any of the inputs are empty, return alert
    if (!customer_name || !customer_phone)
      return alert("Please fill all customer inputs");

    // create contact object
    let contact = { customer_name, customer_phone };

    // post to server with axios
    axios
      .post(import.meta.env.VITE_API_URL + "/api/contact", contact, {
        headers: {
          Authorization: `Bearer ${token}`,

          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      })
      .then((res) => {
        console.log(res.data, "res.data");
        // SET CUSTOMER ID
        document.querySelector("input[name=customerID]").value = res.data.id;

        // alert success
        alert("Customer added successfully");

        // get id from response
        const id = res.data.id;

        // add to contacts state
        setContacts([
          ...contacts,
          { id, customer_name, customer_phone, score: 0 },
        ]);

        // set newcontact flase
        setNewContact(false);
        setCreatedNewContact(true);
      })
      .catch((err) => {
        alert("Error adding customer");
      });
  };

  const phoneChanged = (e) => {
    // find contact by phone number
    const contact = contacts.find(
      (contact) => contact.customer_phone === e.label
    );
    // if no contact found log number and exit function
    if (!contact) {
      console.log(e.value, "e.value");
      setNewContact(true);
      // set id to null
      document.querySelector("input[name=customerID]").value = null;

      // set name null
      document.querySelector("input[name=customerName]").value = null;

      return;
    }
    document.querySelector("input[name=customerPhone]").value =
      contact.customer_phone;

    // set name
    document.querySelector("input[name=customerName]").value =
      contact.customer_name;

    // set id
    document.querySelector("input[name=customerID]").value = contact.id;

    // set createdNewContact to false
    setCreatedNewContact(false);
  };

  const nameChanged = (e) => {
    // find contact by phone number
    const contact = contacts.find(
      (contact) => contact.customer_name === e.label
    );

    console.log(contact, "contact");

    // set phone
    document.querySelector("input[name=customerrPhone]").value =
      contact.customer_phone;

    // set id
    document.querySelector("input[name=customerID]").value = contact.id;
  };

  const getPhoneOptions = () => {
    // get contacts from server with axios
    axios
      .get(import.meta.env.VITE_API_URL + "/api/contact", {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      })
      .then((res) => {
        // if no contacts, return empty array
        if (!res.data.length) return setPhoneOptions([]);

        console.log(res.data, "res.data");

        setContacts(res.data);

        // set contacts sprt by id
        res.data.sort((a, b) => b.id - a.id);

        // set contacts state
        setPhoneOptions(
          res.data.map((contact) => ({
            value: contact.customer_phone,
            label: contact.customer_phone,
          }))
        );

        setNameOptions(
          res.data.map((contact) => ({
            value: contact.customer_name,
            label: contact.customer_name,
          }))
        );
      });
  };

  // get products function
  const getProductsOptions = () => {
    // get products from server with axios
    axios
      .get(import.meta.env.VITE_API_URL + "/api/product", {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      })
      .then((res) => {
        // if no products, return empty array
        if (!res.data.length) return setProductsOptions([]);

        console.log(res.data, "res.data");

        // set products sprt by id
        res.data.sort((a, b) => b.id - a.id);

        // set products state
        setProductsOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
        // alert("Error getting products");
      });
  };

  // get sales function
  const getSales = () => {
    // get sales from server with axios
    axios
      .get(
        import.meta.env.VITE_API_URL +
          "/api/sale?include=delivery,saleitem,contact",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      )
      .then((res) => {
        // if no sales, return empty array
        if (!res.data.length) return setSales([]);

        console.log(res.data, "res.data");

        // set sales sprt by id
        res.data.sort((a, b) => b.id - a.id);

        // set sales state
        setSales(res.data);
      })
      .catch((err) => {
        alert("Error getting sales");
      });
  };

  // get sales on component mount
  useEffect(() => {
    getSales();
    getProductsOptions();
    getPhoneOptions();
  }, []);

  const options = productsOptions.map((product) => ({
    value: product.id,
    label: product.product_name,
  }));

  // add products function
  const addProducts = () => {
    // get product name
    // const name = document.querySelector("input[name=name]").value;
    const name = selectedProduct.label;

    // get product quantity
    const quantity = document.querySelector("input[name=quantity]").value;

    // get product price
    const price = document.querySelector("input[name=price]").value - discount;

    // if any of the inputs are empty, return alert
    if (!name || !quantity || !price) return alert("Please fill all inputs");

    // if name is already in products state, add quantity and update total
    if (products.find((product) => product.name === name)) {
      // get product index
      const index = products.findIndex((product) => product.name === name);

      // update quantity after parsing to int
      products[index].quantity =
        parseInt(products[index].quantity) + parseInt(quantity);

      // update total
      setTotal(total + price * quantity);

      // update products state
      return setProducts([...products]);
    }

    // add product to products state
    setProducts([...products, { name, quantity, price }]);

    // add price * quantity to total state
    setTotal(total + price * quantity);
  };

  // ANCHOR submit sale function
  const submitSale = async () => {
    // if not newcontact , get customer id
    // let customer_id = null;
    // if (!NewContact) {

    // confirm modal
    if (!window.confirm("Are you sure you want to submit sale?")) return;

    setLoading(true);

    // get customer phone
    const customer_id = document.querySelector("input[name=customerID]").value;

    if (!customer_id) return alert("Please select customer");
    // return;
    // }

    // if newcontact , post customer and get customer id

    // ANCHOR if products state is empty, return alert
    if (!products.length) return alert("Please add products");

    // if any of the inputs are empty, return alert
    // if (!customer_name || !customer_phone)
    //   return alert("Please fill all customer inputs");

    // ANCHOR if delivery is checked and recepient is not customer
    if (delivery && !recepientCustomer) {
      // get recepient address
      const recepient_address = document.querySelector(
        "input[name=recepientAddress]"
      ).value;

      // get recepient name
      const recepient_name = document.querySelector(
        "input[name=recepientName]"
      ).value;

      // get recepient phone
      const recepient_phone = document.querySelector(
        "input[name=recepientPhone]"
      ).value;

      // if any of the inputs are empty, return alert
      if (!recepient_address || !recepient_name || !recepient_phone)
        return alert("Please fill all recepient inputs");
    }

    // if delivery is checked and recepient is customer
    if (delivery && recepientCustomer) {
      // get recepient address
      const recepient_address = document.querySelector(
        "input[name=recepientAddress]"
      ).value;

      // if any of the inputs are empty, return alert
      if (!recepient_address) return alert("Please fill all recepient inputs");
    }

    // ANCHOR post sale with total, customer name, customer phone
    let sale = { total, customer_id, delivery };

    // post to server with axios and get sale id
    await axios
      .post(import.meta.env.VITE_API_URL + "/api/sale", sale, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      })
      .then((res) => {
        let sale_id = res.data.id;

        console.log(sale_id);

        console.log("selectedProduct", selectedProduct);

        // add products to saleitem
        products.forEach((product) => {
          // create saleitem object
          let saleitem = {
            sale_id,
            product_id: selectedProduct.value,
            product_quantity: product.quantity,
            price: product.price,
          };

          // post to server with axios await
          axios
            .post(import.meta.env.VITE_API_URL + "/api/saleitem", saleitem, {
              headers: {
                Authorization: `Bearer ${token}`,
                "x-api-key": import.meta.env.VITE_API_KEY,
              },
            })
            .catch((err) => {
              alert("Error adding products");
            });
        });

        // if delivery is checked and recepient is not customer
        if (delivery && !recepientCustomer) {
          // get recepient address
          const recepient_address = document.querySelector(
            "input[name=recepientAddress]"
          ).value;

          // get recepient name
          const recepient_name = document.querySelector(
            "input[name=recepientName]"
          ).value;

          // get recepient phone
          const recepient_phone = document.querySelector(
            "input[name=recepientPhone]"
          ).value;

          let delivery = {
            sale_id,
            recepient_address,
            recepient_name,
            recepient_phone,
          };

          // post to server with axios
          axios
            .post(import.meta.env.VITE_API_URL + "/api/delivery", delivery, {
              headers: {
                Authorization: `Bearer ${token}`,
                "x-api-key": import.meta.env.VITE_API_KEY,
              },
            })
            .catch((err) => {
              alert("Error adding recepient: error posting");
            });
        }

        // if delivery is checked and recepient is customer
        if (delivery && recepientCustomer) {
          // get recepient address
          const recepient_address = document.querySelector(
            "input[name=recepientAddress]"
          ).value;

          const recepient_name = document.querySelector(
            "input[name=customerName]"
          ).value;

          const recepient_phone = document.querySelector(
            "input[name=customerPhone]"
          ).value;

          // create delivery object
          let delivery = {
            sale_id,
            recepient_address,
            recepient_name,
            recepient_phone,
          };

          // post to server with axios
          axios
            .post(import.meta.env.VITE_API_URL + "/api/delivery", delivery, {
              headers: {
                Authorization: `Bearer ${token}`,
                "x-api-key": import.meta.env.VITE_API_KEY,
              },
            })
            .catch((err) => {
              alert("Error adding recepient");
            });
        }
      })
      .then(async () => {
        // get customer score by filtering
        const customer_score = contacts
          .filter((contact) => contact.id === parseInt(customer_id))[0]
          .score.toFixed(2);

        console.log(customer_score, "customer_score");

        // new score added to customer_score
        const new_score = (parseFloat(total) / 1000).toFixed(2);
        console.log(parseFloat(new_score), "new_score");

        // new score added to customer_score
        const total_score = parseFloat(customer_score) + parseFloat(new_score);

        console.log(total_score, "total_score");

        // put customer score with body
        await axios.put(
          import.meta.env.VITE_API_URL + `/api/contact/${customer_id}`,
          {
            // score: (parseFloat(total) / 1000).toFixed(2),
            score: total_score,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
          }
        );

        // set customer score to new total score in contacts state
        setContacts(
          contacts.map((contact) => {
            if (contact.id === parseInt(customer_id)) {
              contact.score = total_score;
            }
            return contact;
          })
        );

        // reset products state
        setProducts([]);

        // reset total state
        setTotal(0);

        // reset delivery state
        setDelivery(false);

        // reset recepient customer state
        setRecepientCustomer(true);

        // reset customer name input
        setNewContact(false);

        // WAIT 5 SECONDS
        setTimeout(() => {
          // 5 seconds after submit, get sales
          getSales();

          setLoading(false);

          alert("Sale added successfully");
        }, 2000);
      });
  };

  const phonecodeOptions = [
    { label: "+255", value: "+255" },
    { label: "+254", value: "+254" },
    // Add more options as needed
  ];

  const sendQuote = () => {
    // // get all sale details and put in one variable
    // let sale = {
    //   total,
    //   products,
    // };

    // // get total and products and put it all in one string
    // let saleString = JSON.stringify(sale);

    // confirm modal
    if (!window.confirm("Are you sure you want to send quote via whatsapp?"))
      return;

    setLoading(true);

    // all products to a nicely formatted string
    let saleString = products
      .map((product) => {
        return `${product.name.split(" ").slice(0, 3).join(" ")} - ${
          product.quantity
        }pcs - ${(product.price * 1000).toLocaleString()}Tshs`;
      })
      .join("\n")
      // add total to string
      .concat(`\nTotal: ${(total * 1000).toLocaleString()}Tshs`);

    console.log(saleString, "sale");

    // if NewContact, alert save first
    if (NewContact) return alert("Please save customer first");

    // get customer phone
    const customer_phone = byName
      ? document.querySelector("input[name=customerrPhone]").value.trim()
      : createdNewContact
      ? document.querySelector("input[name=phonecode]").value.trim() +
        document
          .querySelector("input[name=customerPhone]")
          .value.replace(/\s+/g, "")
      : document.querySelector("input[name=customerPhone]").value.trim();

    console.log(customer_phone, "customer_phone");

    // if any of the inputs are empty, return alert
    if (!customer_phone) return alert("Please fill all customer inputs");

    console.log(products);

    // if any of the inputs are empty, return alert
    if (products.length === 0) return alert("Please add products");

    // add to pendingsend
    axios.post(
      import.meta.env.VITE_API_URL + "/api/pendingsend",
      {
        customer_phone,
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

    // // get total and products and put it all in one string
    // let saleString = JSON.stringify(sale);

    // confirm modal
    if (!window.confirm("Are you sure you want to send SMS?")) return;

    setLoading(true);

    // all products to a nicely formatted string
    let saleString = products
      .map((product) => {
        return `${product.name.split(" ").slice(0, 3).join(" ")} - ${
          product.quantity
        }pcs - ${(product.price * 1000).toLocaleString()}Tshs`;
      })
      .join("\n")
      // add total to string
      .concat(`\nTotal: ${(total * 1000).toLocaleString()}Tshs`);

    console.log(saleString, "sale");

    // if NewContact, alert save first
    if (NewContact) return alert("Please save customer first");

    // get customer phone
    const customer_phone = byName
      ? document.querySelector("input[name=customerrPhone]").value.trim()
      : createdNewContact
      ? document.querySelector("input[name=phonecode]").value.trim() +
        document
          .querySelector("input[name=customerPhone]")
          .value.replace(/\s+/g, "")
      : document.querySelector("input[name=customerPhone]").value.trim();

    console.log(customer_phone, "customer_phone");

    // if any of the inputs are empty, return alert
    if (!customer_phone) return alert("Please fill all customer inputs");

    console.log(products);

    // if any of the inputs are empty, return alert
    if (products.length === 0) return alert("Please add products");

    // add to pendingsend
    axios.post(
      import.meta.env.VITE_API_URL + "/api/pendingsend",
      {
        customer_phone,
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

  return (
    // if loading, show loading
    loading ? (
      <h1>Loading...</h1>
    ) : (
      <div>
        {/* navbar */}
        <Navbar />

        <div className="container">
          {/* creatable select */}
          <Select
            options={options}
            placeholder="Select Product..."
            onChange={(e) => {
              console.log(e, "e");
              setSelectedProduct(e);
              setDefaultPrice(
                productsOptions.filter((product) => product.id === e.value)[0]
                  .price
              );
            }}
          />
          {/* quantity input dont allow anyhting but numbers */}
          <input
            type="number"
            placeholder="Quantity"
            name="quantity"
            defaultValue={1}
            onKeyPress={(e) => {
              // if key is not a number, prevent default
              if (isNaN(e.key)) e.preventDefault();
            }}
          />
          {/* price input dont allow anyhting but numbers */}
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={defaultPrice}
            onKeyPress={(e) => {
              // if key is not a number, prevent default
              if (isNaN(e.key)) e.preventDefault();
            }}
          />

          {/* discount input dont allow any but numbers */}
          <input
            type="number"
            placeholder="Discount"
            name="discount"
            onKeyPress={(e) => {
              // if key is not a number, prevent default
              if (isNaN(e.key)) e.preventDefault();
            }}
            onChange={(e) => {
              setDiscount(e.target.value);
            }}
          />

          {/* button */}
          <button
            className="btn btn-primary"
            onClick={() => {
              // call add products function
              addProducts();
            }}
          >
            Add
          </button>

          {/* table with 3 columns */}
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {/* map products state */}
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.quantity.toLocaleString()}</td>
                  <td>{product.price}</td>
                  <td>
                    {/* REMOVE PRODUCT FROM ARRAY BUTTON */}
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        // set total state
                        setTotal(total - product.price * product.quantity);

                        // set products state
                        setProducts(
                          products.filter((item) => item.name !== product.name)
                        );
                      }}
                    >
                      Remove
                    </button>
                  </td>
                  {/* minus button */}
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        // if quantity is 1, return
                        if (product.quantity === 1) return;

                        // update quantity after parsing to int
                        product.quantity = parseInt(product.quantity) - 1;

                        // update total
                        setTotal(total - product.price);

                        // update products state
                        setProducts([...products]);
                      }}
                    >
                      -
                    </button>
                  </td>
                  {/* plus button */}
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        // update quantity after parsing to int
                        product.quantity = parseInt(product.quantity) + 1;

                        // update total
                        setTotal(total + product.price);

                        // update products state
                        setProducts([...products]);
                      }}
                    >
                      +
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td></td>
                <td>{total.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>

          <br />
          <br />

          <button
            className="btn btn-primary"
            onClick={() => {
              setByName(!byName);
              setCreatedNewContact(false);
            }}
          >
            By Name
          </button>

          {!byName && (
            <>
              {/* select code */}
              <CreatableSelect
                options={phonecodeOptions}
                placeholder="Code..."
                name="phonecode"
                defaultValue={phonecodeOptions[0]}
              />
              {/* 2 inputs */}
              <CreatableSelect
                options={phoneOptions}
                placeholder="Customer Phone Number..."
                name="customerPhone"
                onChange={(e) => {
                  phoneChanged(e);
                }}
              />
              <input
                type="text"
                placeholder="Customer Name"
                name="customerName"
              />
            </>
          )}

          {byName && (
            <>
              <Select
                options={nameOptions}
                placeholder="Customer Name..."
                name="customerrName"
                onChange={(e) => {
                  nameChanged(e);
                }}
              />
              <input
                type="text"
                placeholder="Customer Phone"
                name="customerrPhone"
              />
            </>
          )}

          {/* hiddein id input */}
          <input type="hidden" placeholder="Customer ID" name="customerID" />

          {/* newcontact and plus button */}
          {NewContact && (
            <button
              className="btn btn-primary"
              onClick={() => {
                addNewContact();
              }}
            >
              New Contact
            </button>
          )}

          {/* new row */}
          <br />

          {/* delivery checkbox */}
          <input
            type="checkbox"
            checked={delivery}
            onChange={() => setDelivery(!delivery)}
          />
          {/* label */}
          <label>Delivery</label>

          {/* new row */}
          <br />

          {/* if delivery, additional 3 inputs */}
          {delivery && (
            <>
              <input
                type="text"
                placeholder="Recepient Address"
                name="recepientAddress"
              />
              <br />
              {/* checkbox */}
              <input
                type="checkbox"
                checked={recepientCustomer}
                onChange={() => setRecepientCustomer(!recepientCustomer)}
              />
              {/* label */}
              <label>Recepient is customer</label>

              <br />

              {/* if recepient customer, 2 inputs */}
              {!recepientCustomer && (
                <>
                  <input
                    type="text"
                    placeholder="Recepient Name"
                    name="recepientName"
                  />
                  <input
                    type="text"
                    placeholder="Recepient Phone"
                    name="recepientPhone"
                  />
                </>
              )}
            </>
          )}

          {/* new row */}
          <br />

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

          {/* button submit */}
          <button
            className="btn btn-primary"
            onClick={() => {
              // call submit sale function
              submitSale();
            }}
          >
            Submit
          </button>

          {/* sales header */}
          <h1>Sales</h1>

          {/* table with 4 columns */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Total</th>
                <th>Customer Name</th>
                <th>Customer Phone</th>

                <th>Recepient Address</th>
                <th>Recepient Name</th>
                <th>Recepient Phone</th>
              </tr>
            </thead>
            <tbody
              // align text center
              style={{ textAlign: "center" }}
            >
              {/* map sales state */}
              {sales.map((sale, index) => (
                <>
                  <br />
                  <tr key={index}>
                    {/* bold */}
                    <td>
                      <b>{sale.id}</b>
                    </td>

                    {/* total * 1000 with commas added */}
                    <td>
                      <b>{(sale.total * 1000).toLocaleString()}</b>
                    </td>
                    <td>
                      <b>
                        {/* {sale.customer_name} */}
                        {sale.contact && sale.contact.customer_name} (
                        {sale.contact && sale.contact.score})
                      </b>
                    </td>
                    <td>
                      <b>
                        {/* {sale.customer_phone} */}
                        <Link
                          to={
                            "/contact/" +
                            (sale.contact && sale.contact.customer_phone)
                          }
                        >
                          {sale.contact && sale.contact.customer_phone}
                        </Link>
                      </b>
                    </td>
                    <td>
                      {/* if delivery, show recepient address */}
                      <b>
                        {sale.deliveries[0] &&
                          sale.deliveries[0].recepient_address}
                      </b>
                    </td>
                    <td>
                      {/* if delivery, show recepient name */}
                      <b>
                        {sale.deliveries[0] &&
                          sale.deliveries[0].recepient_name}
                      </b>
                    </td>
                    <td>
                      {/* if delivery, show recepient phone */}
                      <b>
                        {sale.deliveries[0] &&
                          sale.deliveries[0].recepient_phone}
                      </b>
                    </td>
                  </tr>

                  {/* map saleitems */}
                  {sale.saleitems.map((saleitem, index) => (
                    <>
                      {/* FULL LINE UNDERLINE */}
                      <tr>
                        <td colSpan="7">
                          <hr />
                        </td>
                      </tr>
                      <tr key={index}>
                        <td></td>
                        <td></td>
                        <td>
                          {saleitem.product && saleitem.product.product_name}
                        </td>
                        <td>{saleitem.product_quantity}pcs</td>
                        <td>
                          {"@" +
                            (saleitem.price * 1000).toLocaleString() +
                            "Tshs"}
                        </td>
                      </tr>
                    </>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    )
  );
};

export default App;
