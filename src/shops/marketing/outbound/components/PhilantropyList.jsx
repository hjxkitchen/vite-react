import React, { Fragment, useState, useEffect } from "react";

function Component() {
  const [philantropies, setPhilantropies] = useState([]);

  const getPhilantropies = async () => {
    try {
      const response = await fetch("http://localhost:5000/philantropy");
      const jsonData = await response.json();
      setPhilantropies(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getPhilantropies();
  }, []);

  return (
    <Fragment>
      {/* philantropy table */}
      <table class="table text-center">
        <thead>
          <tr>
            <th>Philantropy ID</th>
            <th>Philantropy Manager ID</th>
            <th>Philantropy Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Philantropy Status</th>
            <th>Philantropy Total</th>
          </tr>
        </thead>
        <tbody>
          {philantropies.map((philantropy) => (
            <tr key={philantropy.philantropy_id}>
              <td>{philantropy.philantropy_id}</td>
              <td>{philantropy.philantropy_manager_id}</td>
              <td>{philantropy.philantropy_name}</td>
              <td>{philantropy.start_date}</td>
              <td>{philantropy.end_date}</td>
              <td>{philantropy.philantropy_status}</td>
              <td>{philantropy.philantropy_total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default Component;
