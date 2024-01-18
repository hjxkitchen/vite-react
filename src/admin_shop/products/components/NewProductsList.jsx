import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";

const NewProductsList = ({ products }) => {
  const [filterText, setFilterText] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [subcategoryFilter, setSubcategoryFilter] = useState("");

  const columns = useMemo(
    () => [
      {
        name: "Product ID",
        selector: "product_id",
        sortable: true,
      },
      {
        name: "Product Name",
        selector: "product_name",
        sortable: true,
      },
      {
        name: "Price",
        selector: "price",
        sortable: true,
      },
      {
        name: "Cost",
        selector: "cost",
        sortable: true,
      },
      {
        name: "Inventory",
        selector: "inventory",
        sortable: true,
      },
      {
        name: "Model",
        selector: "model",
        sortable: true,
      },
      {
        name: "Size",
        selector: "size",
        sortable: true,
      },
      {
        name: "Brand",
        selector: "brand",
        sortable: true,
        // Use select filter for specific values
        // The options array should contain unique values for the "Brand" column
        filter: "text",
        options: products.map((product) => product.brand),
      },
      {
        name: "Description",
        selector: "description",
        sortable: true,
      },
      {
        name: "Subcategory ID",
        selector: "subcategory_id",
        sortable: true,
        // Use select filter for specific values
        // The options array should contain unique values for the "Subcategory ID" column
        filter: "text",
        options: products.map((product) => product.subcategory_id),
      },
    ],
    [products]
  );

  const data = useMemo(() => products, [products]);

  const handleFilterChange = (column, value) => {
    // Handle filter changes for each column
    switch (column.selector) {
      case "brand":
        setBrandFilter(value);
        break;
      case "subcategory_id":
        setSubcategoryFilter(value);
        break;
      default:
        console.log(`Filtering ${column.selector} with value: ${value}`);
        break;
    }
  };

  const filteredData = data.filter(
    (row) =>
      String(row.brand).toLowerCase().includes(brandFilter.toLowerCase()) &&
      String(row.subcategory_id)
        .toLowerCase()
        .includes(subcategoryFilter.toLowerCase()) &&
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(filterText.toLowerCase())
      )
  );

  return (
    <div>
      <h1>New Products</h1>
      <input
        type="text"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Search..."
      />
      <DataTable
        columns={columns.map((column) => ({
          ...column,
          filterable: true,
          filter: (
            <input
              type="text"
              onChange={(e) => handleFilterChange(column, e.target.value)}
              placeholder={`Filter ${column.name}`}
            />
          ),
        }))}
        data={filteredData}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
};

export default NewProductsList;
