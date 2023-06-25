import React, { Fragment, useEffect, useState } from "react";

import EditSupplier from "./EditSupplier";

const ListSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  //delete supplier function defined
  const deleteSupplier = async (supplier_id) => {
    try {
      const deleteSupplier = await fetch(
        `http://localhost:5000/suppliers/${supplier_id}`,
        {
          method: "DELETE",
        }
      );
      setSuppliers(
        suppliers.filter((supplier) => supplier.supplier_id !== supplier_id)
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  //get suppliers function defeined
  const getSuppliers = async () => {
    try {
      const response = await fetch("http://localhost:5000/suppliers");
      const jsonData = await response.json();
      setSuppliers(jsonData);
      console.log(suppliers);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <Fragment>
      <div class="d-flex justify-content-center">
        {/* <h2>Suppliers Table</h2> */}
        {/* <p>The .table class adds basic styling (light padding and horizontal dividers) to a table:</p>             */}
        <div class="table-responsive">
          <table class="table mt-5 w-75 text-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.supplier_id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.phone}</td>
                  <td>
                    <EditSupplier supplier={supplier} />
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      onClick={() => deleteSupplier(supplier.supplier_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default ListSuppliers;
