import React, { Fragment, useState, useEffect, useContext } from "react";
import { ProdContext } from "../../../../../App";
import axios from "axios";
import Cookies from "js-cookie";

const ViewSaleItems = ({ sale_id }) => {
  const [saleItems, setsaleItems] = useState([]);
  const prodcontext = useContext(ProdContext);
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  //get products function defeined
  const getSaleItems = async () => {
    // get id from params
    const id = sale_id;

    console.log("sdfsd", id);
    // console.log("http://localhost:000/saleitems/" + id);
    try {
      // axios get
      // const response = await fetch("http://localhost:000/saleitems/" + id);
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/sale/" + id + "?include=product",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      console.log("saleitemmsnew", response.data.products);
      // if not an array make it an array
      if (!Array.isArray(response.data.products)) {
        response.data.products = [response.data.products];
        setsaleItems(response.data.products);
        console.log("not array", response.data.products);
      }
      // set sale items
      setsaleItems(response.data.products);

      // const jsonData = await response.data;
      // setsaleItems(jsonData);
      // return jsonData;
      // console.log(products);
    } catch (error) {
      console.log(error.message);
    }
  };
  const subtotal = (saleitem) => {
    let total = saleitem.saleitem.quantity * saleitem.price;
    // saleItems.forEach(sale => {
    //   total = parseInt(sale.price) * parseInt(sale.quantity) + total;
    // });
    // setOrderTotal(total);
    return total;
  };

  // on load doc
  useEffect(() => {
    getSaleItems();
  }, []);

  const getPrice = async (id) => {
    const res = await axios.get(
      import.meta.env.VITE_API_URL + "/api/product/" + id + "?attributes=price",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );
    console.log("price", res.data.price);
    return res.data.price;
  };

  return (
    <Fragment>
      {/* <!-- Button to Open the Modal --> */}
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target={`#viewsalemodal${sale_id}`}
      >
        View Sale Items
      </button>
      {/* <!-- The Modal --> */}
      <div class="modal" id={`viewsalemodal${sale_id}`}>
        <div class="modal-dialog">
          <div class="modal-content">
            {/* <!-- Modal Header --> */}
            <div class="modal-header">
              <h4 class="modal-title">View Sale Items</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div class="modal-body">
              {/* sale details */}
              {/* <div class="mb-5">
          sale id: {sale_id}
          <br/>
          sale date: {sale.sale_date}
          <br/>
          sale status: {sale.sale_status}
          <br/>
          sale total: {sale.sale_total}
          <br/>
          customer id: {sale.user_id}
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
                    {/* foreach saleitems */}
                    {saleItems.map((saleItem) => (
                      <tr key={saleItem.product_id}>
                        <td>
                          {/* {saleItem.product_id} */}
                          {prodcontext.map((prod) =>
                            prod.product_id === saleItem.product_id
                              ? prod.product_name
                              : null
                          )}
                        </td>
                        <td>{saleItem.saleitem.quantity}</td>
                        <td>
                          {/* get price function */}
                          {saleItem.price}K
                        </td>
                        <td>{subtotal(saleItem)}K</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* </div> */}
              </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div class="modal-footer">
              {/* <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
              >
                Edit
              </button> */}

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

export default ViewSaleItems;
