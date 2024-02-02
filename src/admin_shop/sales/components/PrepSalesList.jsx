import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios, { all } from "axios";
import Cookies from "js-cookie";

// import EditProduct from "../inventory/EditProduct";
// import ViewSaleItems from "../ViewSaleItems";

const SalesList = () => {
  const [saless, setSales] = useState([]);
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  //delete product function defined
  const deleteProduct = async (sale_id) => {
    try {
      // const deleteProduct = await fetch(
      //   `http://localhost:000/saless/${sale_id}`,
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

      setSales(saless.filter((sale) => sale.sale_id !== sale_id));
    } catch (error) {
      console.error(error.message);
    }
  };

  //get products function defeined
  const getSales = async () => {
    try {
      // const response = await fetch("http://localhost:000/salesslist");
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/sale?include=user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      const jsonData = await response.data;
      // sort saless by date

      // jsonData.sort(function(a, b) {
      //     var dateA = new Date(a.sale_date), dateB = new Date(b.sale_date);
      //     return dateB - dateA;
      // });

      // sort saless by sale id
      jsonData.sort(function (a, b) {
        return b.sale_id - a.sale_id;
      });

      // set sales where status is paid
      const paidSales = jsonData.filter((sale) => sale.status === "paid");
      setSales(paidSales);
      // setSales(jsonData);
      // console.log(products);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSales();
    getUsers();
  }, []);

  //    when search filter saless by search
  const [search, setSearch] = useState("");
  const [filteredSales, setFilteredSales] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searchedSales, setSearchedSales] = useState([]);
  const [searchedNames, setSearchedNames] = useState(false);
  const [searchedSalesNames, setSearchedSalesNames] = useState([]);

  const [allUsers, setAllUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/api/user?include=phone",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      console.log("allusers", res.data);
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
        saless.filter((sale) => sale.phone.includes(e.target.value))
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
      console.log("e.target.value", e.target.value);
      console.log("saless", saless);
      setSearchedSalesNames(
        saless.filter((sale) =>
          // sale.name.toLowerCase().includes(e.target.value.toLowerCase())
          // sale.user_id === parseInt(e.target.value)
          sale.user.username
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        )
      );
      console.log("searchedSalesNames", searchedSalesNames);
      // if no results say empty
    } else {
      console.log("no search");
      setSearchedNames(false);
    }
  };
  const searchSalesPhone = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    // setSearch(e.target.value);
    if (e.target.value.length !== 0) {
      setSearchedNames(true);
      console.log("e.target.value", e.target.value);
      console.log("saless", saless);
      // filter users who have this phone number. check entire user.phones array for number includes
      const filteredUsers = allUsers.filter((user) =>
        user.phones?.some((phone) => phone.number.includes(e.target.value))
      );

      console.log("filteredUsers", filteredUsers);

      // get saless of filtered users
      const filteredSales = saless.filter((sale) =>
        filteredUsers.some((user) => user.user_id === sale.user_id)
      );

      console.log("searchedSalesNames", filteredSales);
      setSearchedSalesNames(filteredSales);
      // if no results say empty
    } else {
      console.log("no search");
      setSearchedNames(false);
    }
  };

  const [sorted, setSorted] = useState(false);

  // filter saless by status
  const statussort = [
    "Initialized",
    "paid",
    "prepped",
    "shipped",
    "delivered",
    "completed",
    "cancelled",
  ];
  const [sortedSales, setSortedSales] = useState(saless);

  console.log("sa;les", saless);

  const click = () => {
    console.log("before:", saless);

    if (sorted === false) {
      const salesso = saless;

      const sortSales = (salesso) => {
        const sortedSalesres = salesso.sort((a, b) => {
          return statussort.indexOf(a.status) - statussort.indexOf(b.status);
        });
        return sortedSalesres;
      };
      const sortedSales = sortSales(salesso);
      console.log("newsaless;", sortedSales);
      setSortedSales(sortedSales);
      setSorted(true);
    } else {
      console.log("setting false");
      setSorted(false);
      // SORT BY SALEID
      const salesso = saless;
      const sortedSales = salesso.sort((a, b) => {
        return b.sale_id - a.sale_id;
      });
      setSortedSales(sortedSales);
    }
  };

  const clickdef = () => {
    console.log("before:", saless);

    if (sorted === false) {
      const salesso = saless;

      const sortSales = (salesso) => {
        const sortedSalesres = salesso.sort((a, b) => {
          return a.sale_id - b.sale_id;
        });
        return sortedSalesres;
      };
      const sortedSales = sortSales(salesso);
      console.log("newsaless;", sortedSales);
      setSortedSales(sortedSales);
      setSorted(true);
    } else {
      console.log("setting false");
      setSorted(false);
      // SORT BY SALEID
      const salesso = saless;
      const sortedSales = salesso.sort((a, b) => {
        return b.sale_id - a.sale_id;
      });
      setSortedSales(sortedSales);
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
            <th>Sale xtotal</th>

            {/* <th>
              <div class="row justify-content-center">
                <input
                  type="text"
                  id="phonesearch"
                  class="collapse"
                  onChange={searchSalesPhone}
                  placeholder="Search by phone"
                />
              </div>
              Customer Phone
              <button
                class="btn btn-primary ml-2"
                data-toggle="collapse"
                data-target="#phonesearch"
              >
                <i class="fa fa-search"></i>
              </button>
            </th> */}
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
            {/* <th>Customer Id <button><i class="fas fa-search"></i></button></th> */}
            {/* <th>View</th>
            <th>Edit</th>
            <th>Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {searchedNames ? (
            <>
              {searchedSalesNames.map((sale) => (
                <tr key={sale.sale_id}>
                  <Link to={"/salelogs/" + sale.sale_id}>{sale.sale_id}</Link>
                  <td>
                    {/* get only date from createdAt */}
                    {sale.createdAt.slice(0, 10)}
                  </td>
                  <td>{sale.total_amount}</td>

                  {/* <td>
                    {allUsers.map((user) => {
                      if (user.user_id === sale.user_id) {
                        return user.phones?.number;
                      }
                    })}
                  </td> */}
                  <td>
                    <Link to={"/salelogs/" + sale.sale_id}>{sale.status}</Link>
                  </td>
                  <td>{sale.source}</td>
                  <td>
                    {/* get user name form id from allusers */}
                    {allUsers.map((user) => {
                      if (user.user_id === sale.user_id) {
                        return user.username;
                      }
                    })}
                  </td>
                </tr>
              ))}
            </>
          ) : sorted ? (
            <>
              {sortedSales.map((sale) => (
                <tr key={sale.sale_id}>
                  <Link to={"/salelogs/" + sale.sale_id}>{sale.sale_id}</Link>
                  <td>
                    {/* get only date from createdAt */}
                    {sale.createdAt.slice(0, 10)}
                  </td>
                  <td>{sale.total_amount}</td>

                  {/* <td>
                    {allUsers.map((user) => {
                      if (user.user_id === sale.user_id) {
                        return user.phones[0]?.number;
                      }
                    })}
                  </td> */}
                  <td>
                    <Link to={"/salelogs/" + sale.sale_id}>{sale.status}</Link>
                  </td>
                  <td>{sale.source}</td>
                  <td>
                    {/* get user name form id from allusers */}
                    {allUsers.map((user) => {
                      if (user.user_id === sale.user_id) {
                        return user.username;
                      }
                    })}
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <>
              {saless.map((sale) => (
                <tr key={sale.sale_id}>
                  <Link to={"/salelogs/" + sale.sale_id}>{sale.sale_id}</Link>
                  <td>
                    {/* get only date from createdAt */}
                    {sale.createdAt.slice(0, 10)}
                  </td>
                  <td>{sale.total_amount}</td>

                  {/* <td>
                    {allUsers.map((user) => {
                      if (user.user_id === sale.user_id) {
                        return user.phones[0]?.number;
                      }
                    })}
                  </td> */}
                  <td>
                    <Link to={"/salelogs/" + sale.sale_id}>{sale.status}</Link>
                  </td>
                  <td>{sale.source}</td>
                  <td>
                    {/* get user name form id from allusers */}
                    {allUsers.map((user) => {
                      if (user.user_id === sale.user_id) {
                        return user.username;
                      }
                    })}
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      {/* </div> */}
      {/* </div> */}
    </Fragment>
  );
};

export default SalesList;
