import React, { Fragment, useState, useEffect } from "react";

function Component() {
  const [sokoos, setSokoos] = useState([]);

  const getSokoos = async () => {
    try {
      // const response = await fetch("http://localhost:000/sokoos");
      const response = await axios.get(
        import.meta.env.VITE_APP_API_URL + "/api/Sokoo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_APP_API_KEY,
          },
        }
      );

      const jsonData = await response.json();
      setSokoos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getSokoos();
  }, []);

  return (
    <Fragment>
      {/* sokoos table */}
      <table class="table text-center">
        <thead>
          <tr>
            <th>Sokoo ID</th>
            <th>Sokoo Manager ID</th>
            <th>Sokoo Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Sokoo Status</th>
            <th>Sokoo Total</th>
          </tr>
        </thead>
        <tbody>
          {sokoos.map((sokoo) => (
            <tr key={sokoo.sokoo_id}>
              <td>{sokoo.sokoo_id}</td>
              <td>{sokoo.sokoo_manager_id}</td>
              <td>{sokoo.sokoo_name}</td>
              <td>{sokoo.start_date}</td>
              <td>{sokoo.end_date}</td>
              <td>{sokoo.sokoo_status}</td>
              <td>{sokoo.sokoo_total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default Component;
