import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// import EditProduct from "../inventory/EditProduct";
// import ViewSaleItems from "./ViewSaleItem";

const SalesList = () => {
  const [sales, setSales] = useState([]);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

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
        import.meta.env.VITE_API_URL + "/api/order?include=supplier",
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
        return b.order_id - a.order_id;
      });

      console.log("jsonData345", jsonData);
      // set sales where order status is shipped
      const shipped = jsonData.filter(
        (sale) => sale.status === "shipped" || sale.status === "receiving"
      );
      setSales(shipped);

      // setSales(jsonData);
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

      <div class="d-flex justify-content-center">
        {/* search through phone numbers */}

        {/* <p>The .table class adds basic styling (light padding and horizontal dividers) to a table:</p>             */}
        <div class="table-responsive">
          <table class="table text-center table-striped">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order date</th>
                <th>Order total</th>
                <th>Order Status</th>
                <th>User ID</th>
                <th>Supplier Name</th>
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
                    <td>{sale.createdAt}</td>
                    <td>{sale.total_amount}</td>
                    <td>
                      <Link
                        to={"/orderlogs/" + sale.order_id}
                        state={{ sale: sale }}
                      >
                        {sale.status}
                      </Link>
                    </td>
                    {/* <td>{sale.supplier_id}</td> */}
                    <td> {sale.user_id}</td>
                    <td>{sale.supplier.supplier_name}</td>
                  </tr>
                ))}
              {searchedNames &&
                searchedSalesNames.map((sale) => (
                  <tr key={sale.order_id}>
                    <td>{sale.order_id}</td>
                    <td>{sale.order_date}</td>
                    <td>{sale.order_total}</td>
                    <td>
                      <Link
                        to={"/orderlogs/" + sale.order_id}
                        state={{ sale: sale }}
                      >
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
                      <Link
                        to={"/orderlogs/" + sale.order_id}
                        state={{ sale: sale }}
                      >
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
                    <td>
                      {/* createdat sliced */}
                      {sale.createdAt.slice(0, 10)}
                    </td>
                    <td>{sale.total_amount}K</td>
                    <td>
                      <Link
                        to={"/orderlogs/" + sale.order_id}
                        state={{ sale: sale }}
                      >
                        {sale.status}
                      </Link>
                    </td>
                    <td> {sale.user_id}</td>
                    <td>{sale.supplier.supplier_name}</td>
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
