import React, { useState } from "react";
import { useTable } from "react-table";
import axios from "axios";

const columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "customer_name",
  },
  {
    Header: "Phone",
    accessor: "customer_phone",
  },
  {
    Header: "Location",
    accessor: "customer_address",
  },
  {
    Header: "Score",
    accessor: "score",
  },
  {
    Header: "removed",
    accessor: "removed",
    Cell: ({ value }) => (value ? "True" : ""),
  },
];

// const data = [];

const App = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  console.log("data: ", props.data);

  const data = props.data;

  const filteredData = data.filter((contact) => {
    return contact.customer_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: filteredData,
    });

  const handleDelete = (id) => {
    console.log("id: ", id);

    // are you sure?
    const confirm = window.confirm("Are you sure?");

    if (!confirm) {
      return;
    }

    // delete with axios
    axios.delete(import.meta.env.VITE_API_URL + `/api/contact/${id}`);

    // filter from products
    const newItems = props.data.filter((contact) => contact.id !== id);

    console.log(newItems);

    //set products
    props.setContacts(newItems);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <br />
      <br />

      <table {...getTableProps()} style={{ borderCollapse: "collapse" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{ border: "1px solid black", padding: "8px" }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{ border: "1px solid black", padding: "8px" }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
                <button
                  onClick={() => {
                    handleDelete(row.original.id);
                  }}
                >
                  Delete
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
