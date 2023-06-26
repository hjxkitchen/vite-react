import React, { useState } from "react";

import Navbar from "../Navbar";
import Footer from "../../system/Footer";

const PlaybookPage = () => {
  // Sample playbook data
  const playbookSteps = [
    { id: 1, name: "Step 1", status: "unassigned", inputs: ["assigned_to"] },
    { id: 2, name: "Step 2", status: "not started", inputs: ["start_date"] },
    { id: 3, name: "Step 3", status: "pending", inputs: ["confirm_prepped"] },
    {
      id: 4,
      name: "Step 4",
      status: "in progress",
      inputs: ["route_travelled"],
    },
    {
      id: 5,
      name: "Step 5",
      status: "delivered / complete",
      inputs: ["delivery_confirmation"],
    },
  ];

  return (
    <>
      <Navbar />
      <h1 className="text-center mb-4">Demo Playbook: Delivery Job</h1>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Step</th>
              <th>Status</th>
              <th>Inputs Required</th>
            </tr>
          </thead>
          <tbody>
            {playbookSteps.map((step) => (
              <tr key={step.id}>
                <td>{step.name}</td>
                <td>{step.status}</td>
                <td>{step.inputs.length > 0 ? step.inputs.join(", ") : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default PlaybookPage;
