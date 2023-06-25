import React, { Fragment, useState, useEffect } from "react";

function Component() {
  const [technicianJobs, setTechnicianJobs] = useState([]);

  const getTechnicianJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/technicianjobs");
      const jsonData = await response.json();
      setTechnicianJobs(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTechnicianJobs();
  }, []);

  return (
    <Fragment>
      {/* technician jobs table */}
      <table class="table text-center">
        <thead>
          <tr>
            <th>Technician Job ID</th>
            <th>Technician ID</th>
            <th>Sale ID</th>
            <th>Customer ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Job Status</th>
            <th>Job Description</th>
            <th>Job Address</th>

            <th>Job Fee</th>
          </tr>
        </thead>
        <tbody>
          {technicianJobs.map((technicianJob) => (
            <tr key={technicianJob.job_id}>
              <td>{technicianJob.job_id}</td>
              <td>{technicianJob.technician_id}</td>
              <td>{technicianJob.sale_id}</td>
              <td>{technicianJob.customer_id}</td>
              <td>{technicianJob.start_date}</td>
              <td>{technicianJob.end_date}</td>
              <td>{technicianJob.job_status}</td>
              <td>{technicianJob.job_description}</td>
              <td>{technicianJob.job_address}</td>
              <td>{technicianJob.job_fee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default Component;
