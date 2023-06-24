import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import EditProduct from "../inventory/EditProduct";
// import ViewSaleItems from "../ViewSaleItems";

const SalesList = () => {
  const [sales, setSales] = useState([]);

  //delete product function defined
  const deleteProduct = async (sale_id) => {
    try {
      const deleteProduct = await fetch(
        `http://localhost:5000/sales/${sale_id}`,
        {
          method: "DELETE",
        }
      );
      setSales(sales.filter((sale) => sale.sale_id !== sale_id));
    } catch (error) {
      console.error(error.message);
    }
  };

  //get products function defeined
  const getSales = async () => {
    try {
      const response = await fetch("http://localhost:5000/saleslist");
      const jsonData = await response.json();
      // sort sales by date

      // jsonData.sort(function(a, b) {
      //     var dateA = new Date(a.sale_date), dateB = new Date(b.sale_date);
      //     return dateB - dateA;
      // });

      // sort sales by sale id
      jsonData.sort(function (a, b) {
        return b.sale_id - a.sale_id;
      });

      setSales(jsonData);
      // console.log(products);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSales();
  }, []);

  //    when search filter sales by search
  const [search, setSearch] = useState("");
  const [filteredSales, setFilteredSales] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searchedSales, setSearchedSales] = useState([]);
  const [searchedNames, setSearchedNames] = useState(false);
  const [searchedSalesNames, setSearchedSalesNames] = useState([]);

  const searchSalesPh = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    setSearch(e.target.value);
    if (e.target.value.length !== 0) {
      setSearched(true);
      setSearchedSales(
        sales.filter((sale) => sale.phone.includes(e.target.value))
      );
      // if no results say empty
    } else {
      console.log("no search");
      setSearched(false);
    }
  };

  const searchSalesName = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    // setSearch(e.target.value);
    if (e.target.value.length !== 0) {
      setSearchedNames(true);
      setSearchedSalesNames(
        sales.filter((sale) =>
          sale.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      // if no results say empty
    } else {
      console.log("no search");
      setSearchedNames(false);
    }
  };

  const [sorted, setSorted] = useState(false);

  // filter sales by status
  const statussort = [
    "paid",
    "shipped",
    "initialized",
    "delivered",
    "cancelled",
  ];
  const [sortedSales, setSortedSales] = useState(sales);

  console.log("sa;les", sales);

  const click = () => {
    console.log("before:", sales);

    if (sorted === false) {
      const saleso = sales;

      const sortSales = (saleso) => {
        const sortedSalesres = saleso.sort((a, b) => {
          return (
            statussort.indexOf(a.sale_status) -
            statussort.indexOf(b.sale_status)
          );
        });
        return sortedSalesres;
      };
      const sortedSales = sortSales(saleso);
      console.log("newsales;", sales);
      setSortedSales(sortedSales);
      setSorted(true);
    } else {
      console.log("setting false");
      setSorted(false);
      console.log(sorted);
      setSortedSales(sales);
    }
  };

  const clickdef = () => {
    // sort by order id
    if (sorted === false) {
      const saleso = sales;
      const sortedSales = saleso.sort((a, b) => {
        return b.sale_id - a.sale_id;
      });
      setSortedSales(sortedSales);
      setSorted(true);
    } else {
      console.log("setting false");
      setSorted(false);
      console.log(sorted);
      setSortedSales(sales);
    }
  };

  return (
    <Fragment>
      {/* <ViewSaleItems /> */}
      {/* <button className="btn btn-primary">Search</button> */}

      {/* <div className="d-flex justify-content-center"> */}
      {/* search through phone numbers */}

      {/* <h2>Products Table</h2> */}
      {/* <p>The .table class adds basic styling (light padding and horizontal dividers) to a table:</p>             */}
      {/* <div className="table-responsive"> */}
      <table className="table text-center table-striped">
        <thead>
          <tr>
            <th>Sale ID</th>
            <th>
              Sale date
              <button
                type="button"
                className="btn btn-sm ml-2"
                onClick={clickdef}
              >
                <i className="fas fa-sort-down"></i>
              </button>
            </th>
            <th>Sale total</th>
            <th>
              Sale Status
              {/* small button  */}
              <button type="button" className="btn btn-sm ml-2" onClick={click}>
                <i className="fas fa-sort-down"></i>
              </button>
            </th>
            <th>
              Sale Source
              {/* small button  */}
              <button type="button" className="btn btn-sm ml-2" onClick={click}>
                <i className="fas fa-sort-down"></i>
              </button>
            </th>
            <th>
              {/* <div className="d-flex"> */}
              <div className="row justify-content-center">
                <input
                  type="text"
                  id="namesearch"
                  className="collapse"
                  onChange={searchSalesName}
                  placeholder="Search by name"
                />
              </div>
              {/* </div> */}
              Customer Name
              <button
                className="btn btn-primary ml-2"
                data-toggle="collapse"
                data-target="#namesearch"
              >
                <i className="fa fa-search"></i>
              </button>
            </th>
            <th>
              <div className="row justify-content-center">
                <input
                  type="text"
                  id="phsearch"
                  className="collapse"
                  onChange={searchSalesPh}
                  placeholder="Search by phone number"
                />
              </div>
              Customer Phone
              {/* button to collapse search bar*/}
              <button
                className="btn btn-primary ml-2"
                data-toggle="collapse"
                data-target="#phsearch"
              >
                <i className="fa fa-search"></i>
              </button>
            </th>
            {/* <th>Customer Id <button><i className="fas fa-search"></i></button></th> */}
            {/* <th>View</th>
            <th>Edit</th>
            <th>Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {searched &&
            searchedSales.map((sale) => (
              <tr key={sale.sale_id}>
                <td>{sale.sale_id}</td>
                <td>{sale.sale_date}</td>
                <td>{sale.sale_total}</td>
                <td>
                  <Link to="/salelogs" state={{ sale: sale }}>
                    {sale.sale_status}
                  </Link>
                </td>
                <td>{sale.name}</td>
                <td>{sale.phone}</td>
              </tr>
            ))}
          {searchedNames &&
            searchedSalesNames.map((sale) => (
              <tr key={sale.sale_id}>
                <td>{sale.sale_id}</td>
                <td>{sale.sale_date}</td>
                <td>{sale.sale_total}</td>
                <td>
                  <Link to="/salelogs" state={{ sale: sale }}>
                    {sale.sale_status}
                  </Link>
                </td>
                <td>{sale.name}</td>
                <td>{sale.phone}</td>
              </tr>
            ))}
          {sorted &&
            sortedSales.map((sale) => (
              <tr key={sale.sale_id}>
                <td>{sale.sale_id}</td>
                <td>{sale.sale_date}</td>
                <td>{sale.sale_total}</td>
                <td>
                  <Link to="/salelogs" state={{ sale: sale }}>
                    {sale.sale_status}
                  </Link>
                </td>
                <td>{sale.name}</td>
                <td>{sale.phone}</td>
              </tr>
            ))}
          {sorted === false &&
            sales.map((sale) => (
              <tr key={sale.sale_id}>
                <td>{sale.sale_id}</td>
                <td>{sale.sale_date}</td>
                <td>{sale.sale_total}</td>
                <td>
                  <Link to="/salelogs" state={{ sale }}>
                    {sale.sale_status}
                  </Link>
                </td>

                <td>Online/POS</td>
                <td>{sale.name}</td>
                <td>{sale.phone}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* </div> */}
      {/* </div> */}
    </Fragment>
  );
};

export default SalesList;
