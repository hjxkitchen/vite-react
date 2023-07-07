import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// import EditProduct from "../inventory/EditProduct";
// import ViewSaleItems from "../ViewSaleItems";

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  //delete product function defined
  const deleteProduct = async (sale_id) => {
    try {
      // const deleteProduct = await fetch(
      //   `http://localhost:000/sales/${sale_id}`,
      //   {
      //     method: "DELETE",
      //   }
      // );
      const deleteProduct = await axios.delete(
        import.meta.env.VITE_APP_API_URL + "/api/sale/" + sale_id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_APP_API_KEY,
          },
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
      // const response = await fetch("http://localhost:000/saleslist");
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/sale",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      const jsonData = await response.data;
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
    getUsers();
  }, []);

  //    when search filter sales by search
  const [search, setSearch] = useState("");
  const [filteredSales, setFilteredSales] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searchedSales, setSearchedSales] = useState([]);
  const [searchedNames, setSearchedNames] = useState(false);
  const [searchedSalesNames, setSearchedSalesNames] = useState([]);

  const [allUsers, setAllUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      });
      setAllUsers(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

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
      {/* <button class="btn btn-primary">Search</button> */}

      {/* <div class="d-flex justify-content-center"> */}
      {/* search through phone numbers */}

      {/* <h2>Products Table</h2> */}
      {/* <p>The .table class adds basic styling (light padding and horizontal dividers) to a table:</p>             */}
      {/* <div class="table-responsive"> */}
      <table class="table text-center table-striped">
        <thead>
          <tr>
            <th>Sale ID</th>
            <th>
              Sale date
              <button type="button" class="btn btn-sm ml-2" onClick={clickdef}>
                <i class="fas fa-sort-down"></i>
              </button>
            </th>
            <th>Sale total</th>
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
              Customer
              <button
                class="btn btn-primary ml-2"
                data-toggle="collapse"
                data-target="#namesearch"
              >
                <i class="fa fa-search"></i>
              </button>
            </th>
            <th>
              Sale Status
              {/* small button  */}
              <button type="button" class="btn btn-sm ml-2" onClick={click}>
                <i class="fas fa-sort-down"></i>
              </button>
            </th>
            <th>
              Sale Source
              {/* small button  */}
              <button type="button" class="btn btn-sm ml-2" onClick={click}>
                <i class="fas fa-sort-down"></i>
              </button>
            </th>

            {/* <th>Customer Id <button><i class="fas fa-search"></i></button></th> */}
            {/* <th>View</th>
            <th>Edit</th>
            <th>Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.sale_id}>
              <Link to={"/salelogs/" + sale.sale_id}>{sale.sale_id}</Link>
              <td>
                {/* get only date from createdAt */}
                {sale.createdAt.slice(0, 10)}
              </td>
              <td>{sale.total_amount}</td>
              <td>
                {/* get user name form id from allusers */}
                {allUsers.map((user) => {
                  if (user.user_id === sale.user_id) {
                    return user.username;
                  }
                })}
              </td>
              <td>
                <Link to={"/salelogs/" + sale.sale_id}>{sale.status}</Link>
              </td>
              <td>{sale.source}</td>
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
