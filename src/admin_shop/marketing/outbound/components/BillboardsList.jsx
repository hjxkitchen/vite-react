import React, { Fragment, useState, useEffect } from "react";

function Component() {
  const [billboards, setBillboards] = useState([]);

  const getBillboards = async () => {
    try {
      // const response = await fetch("http://localhost:000/billboards");
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/billboards",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      const jsonData = await response.json();
      setBillboards(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getBillboards();
  }, []);

  return (
    <Fragment>
      {/* billboards table */}
      <table class="table text-center">
        <thead>
          <tr>
            <th>Billboard ID</th>
            <th>Billboard Manager ID</th>
            <th>Billboard Name</th>
            <th>Billboard Location</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Billboard Status</th>
            <th>Billboard Total</th>
          </tr>
        </thead>
        <tbody>
          {billboards.map((billboard) => (
            <tr key={billboard.billboard_id}>
              <td>{billboard.billboard_id}</td>
              <td>{billboard.manager_id}</td>
              <td>{billboard.billboard_name}</td>
              <td>{billboard.billboard_location}</td>
              <td>{billboard.start_date}</td>
              <td>{billboard.end_date}</td>
              <td>{billboard.billboard_status}</td>
              <td>{billboard.billboard_total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default Component;
