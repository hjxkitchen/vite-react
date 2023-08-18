import React, { Fragment, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AddProductModal = ({ product }) => {
  const [inputs, setInputs] = useState({});
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // submit function
  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log("quickadd submit inputs:", products);
    try {
      // const response = await fetch("http://localhost:000/products", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(inputs),
      // });
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/quickadd/products",
        products,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      window.location = "/shoplist";
    } catch (error) {
      console.error(error.message);
    }
  };

  // quickadd

  const [products, setLoadItems] = useState([]);

  const [voltage, setVoltage] = useState(12);
  const [DOD, setDOD] = useState(50);
  const [daysOfStorage, setDaysOfStorage] = useState(1);
  const [totalWH, SetTotalWH] = useState(500);

  const [batteryAmps, setBatteryAmps] = useState(0);
  const [batteryAmpsDOD, setBatteryAmpsDOD] = useState(0);
  const [batterySize, setBatterySize] = useState(0);

  const submitGo = (e) => {
    e.preventDefault();
    // split string at comma
    const item = e.target.item.value.split(",");
    console.log(item);
    // create object from array
    const itemObj = {
      product_name: item[0],
      cost: parseInt(item[1]),
      subcategory_id: parseInt(item[2]),
      price: parseInt(item[1]) * 1.4,
    };
    // add object to array
    setLoadItems([...products, itemObj]);

    // clear input
    e.target.item.value = "";
  };

  const deleteItem = (index) => {
    const newLoadItems = [...products];
    newLoadItems.splice(index, 1);
    setLoadItems(newLoadItems);
  };

  return (
    <Fragment>
      {/* <!-- Button to Open the Modal --> */}
      <button
        type="button"
        class="btn btn-info mt-5 ml-3"
        data-toggle="modal"
        data-target={`#quickAddOrder`}
      >
        Quick Add
      </button>

      {/* <!-- The Modal --> */}
      <div class="modal" id="quickAddOrder">
        <div class="modal-dialog">
          <div class="modal-content">
            {/* <!-- Modal Header --> */}
            <div class="modal-header">
              <h4 class="modal-title">Add Product</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div class="modal-body">
              <div className="row justify-content-center">
                {/* <div input group */}
                <form onSubmit={submitGo}>
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Name, Cost, Subcategory_id"
                      aria-label="Name, Cost, Subcategory_id"
                      aria-describedby="basic-addon2"
                      name="item"
                    />
                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary" type="submit">
                        Add
                      </button>
                    </div>
                  </div>
                </form>

                <div className="container">
                  <table class="table table-hover text-center">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Cost</th>
                        <th scope="col">Subcategory_id</th>
                      </tr>
                    </thead>

                    <tbody>
                      {products.map((item, index) => (
                        <tr key={index}>
                          <td>{item.product_name}</td>
                          <td>{item.cost}</td>
                          <td>{item.subcategory_id}</td>
                          <td>
                            <button
                              class="btn btn-danger"
                              onClick={() => deleteItem(index)}
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    {/* tfooter to calculate total */}
                  </table>
                </div>
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