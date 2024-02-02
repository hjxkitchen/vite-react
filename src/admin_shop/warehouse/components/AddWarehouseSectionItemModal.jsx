import React, { Fragment, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { ProdContext } from "../../../App";

const AddProductModal = ({ product }) => {
  const [inputs, setInputs] = useState({});
  const [warehouseSections, setWarehouseSections] = useState([]);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  // get products from context
  const products = useContext(ProdContext);

  // get warehouse id from url
  const { id } = useParams();

  const handleChange = (event) => {
    console.log("event", event.target.name);
    console.log("event", event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // submit function
  const onSubmitForm = async (e) => {
    e.preventDefault();

    // add warehouse id to inputs
    inputs.warehouse_id = id;

    console.log("INPUTS", inputs);
    console.log(id);
    console.log("px:", products);

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/warehouseitem",
        inputs,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      // reload page
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  // get warehouse details
  const getWarehouseDetails = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/warehouse/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      console.log("warehouse details", response.data);

      if (response.data.warehousesections.length > 0) {
        setWarehouseSections(response.data.warehousesections);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getWarehouseDetails();
  }, []);

  return (
    <Fragment>
      {/* <!-- Button to Open the Modal --> */}
      <button
        type="button"
        class="btn btn-success mt-5"
        data-toggle="modal"
        data-target={`#addOrder`}
      >
        Add
      </button>

      {/* <!-- The Modal --> */}
      <div class="modal" id="addOrder">
        <div class="modal-dialog">
          <div class="modal-content">
            {/* <!-- Modal Header --> */}
            <div class="modal-header">
              <h4 class="modal-title">Add Warehouse Section Item</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div class="modal-body">
              <div className="d-flex justify-content-center">
                {/* <div className="d-flex w-50 justify-content-center"> */}
                <form className="" onSubmit={onSubmitForm}>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">
                      Product ID
                    </label>
                    <div className="col-sm-10">
                      {/* <input
                        type="text"
                        className="form-control"
                        name="product_id"
                        value={inputs.product_id}
                        onChange={handleChange}
                      /> */}
                      {/* select with products names as labels and id as value */}
                      <select
                        className="form-control"
                        name="product_id"
                        value={inputs.product_id}
                        onChange={handleChange}
                      >
                        {products.map((product) => (
                          <option value={product.product_id}>
                            {product.product_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Quantity</label>
                    <div className="col-sm-10">
                      <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={inputs.quantity}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">
                      Warehouse Section ID
                    </label>
                    <div className="col-sm-10">
                      {/* <input
                        type="text"
                        className="form-control"
                        name="warehouse_section_id"
                        value={inputs.warehouse_section_id}
                        onChange={handleChange}
                      /> */}
                      {/* select  */}
                      <select
                        className="form-control"
                        name="warehouse_section_id"
                        value={inputs.warehouse_section_id}
                        onChange={handleChange}
                      >
                        {warehouseSections.map((warehouseSection) => (
                          <option value={warehouseSection.warehouse_section_id}>
                            {warehouseSection.warehouse_section_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </form>
                {/* </div> */}
              </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div class="modal-footer">
              <button className="btn btn-success" onClick={onSubmitForm}>
                Add
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

export default AddProductModal;
