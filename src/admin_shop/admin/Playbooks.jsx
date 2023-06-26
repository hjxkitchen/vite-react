import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../../system/Footer";

const Suppliers = () => {
  return (
    <>
      <Navbar />
      <h1 className="text-center">Playbooks</h1>

      {/* table responisve that scrolls to the end of the last button with some space at the end right */}
      <div className="table-responsive ">
        <div className="container mx-5">
          <div className="d-flex justify-content-center mt-4">
            <div
              class="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio1"
                autocomplete="off"
                defaultChecked
              />
              <label class="btn btn-outline-dark" htmlFor="btnradio1">
                Sales / Orders Fulfillment
              </label>

              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio2"
                autocomplete="off"
              />
              <label class="btn btn-outline-dark" htmlFor="btnradio2">
                Products / Packages
              </label>

              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio3"
                autocomplete="off"
              />
              <label class="btn btn-outline-dark" htmlFor="btnradio3">
                Sales Process
              </label>

              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio4"
                autocomplete="off"
              />
              <label class="btn btn-outline-dark" htmlFor="btnradio4">
                Team Recruiting / Onboarding
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="container mt-5">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Transaction Type</th>
              <th>Playbook</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>In-Shop Sale</td>
              <td>
                <Link to="/playbook">Link</Link>
              </td>
            </tr>
            <tr>
              <td>Online Sale</td>
              <td>
                <Link to="/playbook">Link</Link>
              </td>
            </tr>
            <tr>
              <td>Technician Job</td>
              <td>
                <Link to="/playbook">Link</Link>
              </td>
            </tr>
            <tr>
              <td>Delivery Job</td>
              <td>
                <Link to="/playbook">Link</Link>
              </td>
            </tr>
            <tr>
              <td>Delivery Order</td>
              <td>
                <Link to="/playbook">Link</Link>
              </td>
            </tr>
            <tr>
              <td>Import Order</td>
              <td>
                <Link to="/playbook">Link</Link>
              </td>
            </tr>
            <tr>
              <td>In-Town Order</td>
              <td>
                <Link to="/playbook">Link</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
};

export default Suppliers;
