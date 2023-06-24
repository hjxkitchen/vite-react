import React, { Fragment, useState, useEffect, useContext } from "react";
import { ProdContext } from "../../index";

const ViewSaleItems = ({ sale }) => {
  const [saleItems, setsaleItems] = useState([]);
  const prodcontext = useContext(ProdContext);

  //get products function defeined
  const getSaleItems = async () => {
    console.log("sdfsd", sale);
    let id = sale.sale_id;
    console.log("http://localhost:5000/saleitems/" + id);
    try {
      // axios get
      const response = await fetch("http://localhost:5000/saleitems/" + id);
      console.log(response);
      const jsonData = await response.json();
      setsaleItems(jsonData);
      return jsonData;
      // console.log(products);
    } catch (error) {
      console.log(error.message);
    }
  };
  const subtotal = (saleitem) => {
    let total = saleitem.quantity * saleitem.price;
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

  return (
    <Fragment>
      {/* <!-- Button to Open the Modal --> */}
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#viewsalemodal${sale.sale_id}`}
      >
        View Sale Items
      </button>

      {/* <!-- The Modal --> */}
      <div className="modal" id={`viewsalemodal${sale.sale_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">View Sale Items</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              {/* sale details */}
              {/* <div className="mb-5">
          sale id: {sale.sale_id}
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
                <table className="table">
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
                      <tr>
                        <td>
                          {/* {saleItem.product_id} */}
                          {prodcontext.map((prod) =>
                            prod.product_id === saleItem.product_id
                              ? prod.product_name
                              : null
                          )}
                        </td>
                        <td>{saleItem.quantity}</td>
                        <td>{saleItem.price}K</td>
                        <td>{subtotal(saleItem)}K</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* </div> */}
              </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
              {/* <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
              >
                Edit
              </button> */}

              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
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
