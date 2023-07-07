import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import EditProduct from "../inventory/EditProduct";
// import ViewSaleItems from "./ViewSaleItem";

const SalesList = () => {
  const [sales, setSales] = useState([]);

  //delete product function defined
  const deleteProduct = async (order_id) => {
    try {
      // const deleteProduct = await fetch(
      //   `http://localhost:000/sales/${order_id}`,
      //   {
      //     method: "DELETE",
      //   }
      // );

      const deleteProduct = await axios.delete(
        import.meta.env.VITE_APP_API_URL + "/api/Sale/" + order_id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_APP_API_KEY,
          },
        }
      );

      setSales(sales.filter((sale) => sale.order_id !== order_id));
    } catch (error) {
      console.error(error.message);
    }
  };

  //get products function defeined
  const getSales = async () => {
    try {
      // const response = await fetch("http://localhost:000/orderslist");
      const response = await axios.get(
        import.meta.env.VITE_APP_API_URL + "/api/Sale",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_APP_API_KEY,
          },
        }
      );

      const jsonData = await response.json();
      // sort sales by date

      // jsonData.sort(function(a, b) {
      //     var dateA = new Date(a.sale_date), dateB = new Date(b.sale_date);
      //     return dateB - dateA;
      // });

      // sort sales by sale id
      jsonData.sort(function (a, b) {
        return b.order_id - a.order_id;
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
            statussort.indexOf(a.order_status) -
            statussort.indexOf(b.order_status)
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
        return b.order_id - a.order_id;
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
      {/* <button class="btn btn-primary">Search</button> */}

      <h1 className="mb-5">Orders List</h1>
      <div class="d-flex justify-content-center">
        {/* search through phone numbers */}

        {/* <p>The .table class adds basic styling (light padding and horizontal dividers) to a table:</p>             */}
        <div class="table-responsive">
          <table
            class="table text-
        center table-striped"
          >
            <thead>
              <tr>
                <th>Order ID</th>
                <th>
                  Order date
                  <button
                    type="button"
                    class="btn btn-sm ml-2"
                    onClick={clickdef}
                  >
                    <i class="fas fa-sort-down"></i>
                  </button>
                </th>
                <th>Order total</th>
                <th>
                  Order Status
                  {/* small button  */}
                  <button type="button" class="btn btn-sm ml-2" onClick={click}>
                    <i class="fas fa-sort-down"></i>
                  </button>
                </th>
                <th>
                  {/* <div class="d-flex"> */}
                  <div class="row justify-content-center">
                    <input
                      type="text"
                      id="namesearch"
                      class="collapse"
                      onChange={searchSalesName}
                      placeholder="Search by name"
                    />
                  </div>
                  {/* </div> */}
                  Supplier Name
                  <button
                    class="btn btn-primary ml-2"
                    data-toggle="collapse"
                    data-target="#namesearch"
                  >
                    <i class="fa fa-search"></i>
                  </button>
                </th>
                <th>
                  <div class="row justify-content-center">
                    <input
                      type="text"
                      id="phsearch"
                      class="collapse"
                      onChange={searchSalesPh}
                      placeholder="Search by phone number"
                    />
                  </div>
                  Supplier Phone
                  {/* button to collapse search bar*/}
                  <button
                    class="btn btn-primary ml-2"
                    data-toggle="collapse"
                    data-target="#phsearch"
                  >
                    <i class="fa fa-search"></i>
                  </button>
                </th>
                {/* <th>Customer Id <button><i class="fas fa-search"></i></button></th> */}
                {/* <th>View</th>
            <th>Edit</th>
            <th>Delete</th> */}
              </tr>
            </thead>
            <tbody>
              {searched &&
                searchedSales.map((sale) => (
                  <tr key={sale.order_id}>
                    <td>{sale.order_id}</td>
                    <td>{sale.order_date}</td>
                    <td>{sale.order_total}</td>
                    <td>
                      <Link to="/orderlogs" state={{ sale: sale }}>
                        {sale.order_status}
                      </Link>
                    </td>
                    <td>{sale.name}</td>
                    <td>{sale.phone}</td>
                  </tr>
                ))}
              {searchedNames &&
                searchedSalesNames.map((sale) => (
                  <tr key={sale.order_id}>
                    <td>{sale.order_id}</td>
                    <td>{sale.order_date}</td>
                    <td>{sale.order_total}</td>
                    <td>
                      <Link to="/orderlogs" state={{ sale: sale }}>
                        {sale.order_status}
                      </Link>
                    </td>
                    <td>{sale.name}</td>
                    <td>{sale.phone}</td>
                  </tr>
                ))}
              {sorted &&
                sortedSales.map((sale) => (
                  <tr key={sale.order_id}>
                    <td>{sale.order_id}</td>
                    <td>{sale.order_date}</td>
                    <td>{sale.order_total}</td>
                    <td>
                      <Link to="/orderlogs" state={{ sale: sale }}>
                        {sale.order_status}
                      </Link>
                    </td>
                    <td>{sale.name}</td>
                    <td>{sale.phone}</td>
                  </tr>
                ))}
              {sorted === false &&
                sales.map((sale) => (
                  <tr key={sale.order_id}>
                    <td>{sale.order_id}</td>
                    <td>{sale.order_date}</td>
                    <td>{sale.order_total}</td>
                    <td>
                      <Link to="/orderlogs" state={{ sale }}>
                        {sale.order_status}
                      </Link>
                    </td>
                    <td>{sale.name}</td>
                    <td>{sale.phone}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default SalesList;