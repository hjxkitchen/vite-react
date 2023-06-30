import React, { Fragment, useState, useEffect } from "react";

function Component() {
  const [deliveries, setDeliveries] = useState([]);

  const getDeliveries = async () => {
    try {
      // const response = await fetch("http://localhost:000/deliveries");
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "deliveries",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      const jsonData = await response.json();
      setDeliveries(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getDeliveries();
  }, []);

  return (
    <Fragment>
      {/* deliveries table */}
      <table class="table text-center">
        <thead>
          <tr>
            <th>Delivery ID</th>
            <th>Driver ID</th>
            <th>Sale ID</th>
            <th>Customer ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Delivery Status</th>
            <th>Delivery Address</th>
            <th>Delivery Fee</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.delivery_id}>
              <td>{delivery.delivery_id}</td>
              <td>{delivery.driver_id}</td>
              <td>{delivery.sale_id}</td>
              <td>{delivery.customer_id}</td>
              <td>{delivery.start_date}</td>
              <td>{delivery.end_date}</td>
              <td>{delivery.delivery_status}</td>

              <td>{delivery.delivery_address}</td>
              <td>{delivery.delivery_fee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default Component;
