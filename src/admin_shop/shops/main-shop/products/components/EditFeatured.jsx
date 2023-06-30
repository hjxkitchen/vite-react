import React, { Fragment, useState } from "react";

const EditProduct = ({ product }) => {
  const [description, setDescription] = useState(product.description);

  //edit description function
  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      // const response = await fetch(
      //   `http://localhost:000/products/${product.id}`,
      //   {
      //     method: "PUT",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(body),
      //   }
      // );
      const response = await axios.put(
        import.meta.env.VITE_API_URL + "product/" + product.id,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      window.location = "/inventory";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      {/* <!-- Button to Open the Modal --> */}
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${product.id}`}
      >
        Edit
      </button>

      {/* <!-- The Modal --> */}
      <div class="modal" id={`id${product.id}`}>
        <div class="modal-dialog">
          <div class="modal-content">
            {/* <!-- Modal Header --> */}
            <div class="modal-header">
              <h4 class="modal-title">Edit Product</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setDescription(product.description)}
              >
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div class="modal-body">
              <div class="row">
                <div class="col">
                  {/* 1st */}
                  <label>
                    Description
                    <input
                      type="text"
                      name="description"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </label>
                </div>
                <div class="col">
                  {/* 2nd */}
                  <label>
                    Inventory
                    <input
                      type="number"
                      name="inventory"
                      min="0"
                      step="1"
                      className="form-control"
                      value={product.inventory}
                      // onchange={handleChange}
                    />
                  </label>
                </div>
                <div class="col">
                  {/* 3rd */}
                  <label>
                    Cost
                    <input
                      type="text"
                      name="cost"
                      className="form-control"
                      value={product.cost}
                      // onchange={handleChange}
                    />
                  </label>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  {/* 4th */}
                  <label>
                    Price
                    <input
                      type="text"
                      name="price"
                      className="form-control"
                      value={product.price}
                      // onchange={handleChange}
                    />
                  </label>
                </div>
                <div class="col">
                  {/* 5th */}
                  <label>
                    Images
                    <input
                      type="text"
                      name="images"
                      className="form-control"
                      value={product.images}
                      // onchange={handleChange}
                    />
                  </label>
                </div>
                <div class="col">
                  {/* 6th */}
                  <label>
                    Shop
                    <input
                      type="text"
                      name="shop"
                      className="form-control"
                      value={product.shop}
                      // onchange={handleChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateDescription(e)}
              >
                Edit
              </button>

              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(product.description)}
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

export default EditProduct;
