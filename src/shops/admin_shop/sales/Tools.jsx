import React, { Fragment, useContext, useState, useEffect } from "react";
import Navbar from "../Navbar";
import PublicNavbar from "../PublicNavbar";
// import { UserContext } from "../../../../index";
import Calculator from "./components/Calculator";
import GuidedSales from "./components/GuidedSales";

function Component() {
  // const user = useContext(UserContext);
  const user = "dasfsf";

  const [activeTools, setActiveTools] = useState(false);
  const [activeRefChart1, setActiveRefChart1] = useState(false);
  const [activeRefChart2, setActiveRefChart2] = useState(false);

  const showTools = () => {
    setActiveTools(!activeTools);
  };

  const showRefChart1 = () => {
    setActiveRefChart1(!activeRefChart1);
  };

  const showRefChart2 = () => {
    setActiveRefChart2(!activeRefChart2);
  };

  return (
    <Fragment>
      {user && <Navbar />}
      {!user && <PublicNavbar />}
      <div className="container">
        <div>
          <h1 class="text-center mt-5">Tools</h1>
        </div>

        <div className="row justify-content-center mt-5 mb-5">
          {/* buttons for tools and ref charts */}
          <div className="col-0">
            <button className="btn btn-outline-dark mr-3" onClick={showTools}>
              Tools
            </button>
            <button
              className="btn btn-outline-dark mr-3"
              onClick={showRefChart1}
            >
              Reference Chart 1
            </button>
            <button className="btn btn-outline-dark" onClick={showRefChart2}>
              Reference Chart 2
            </button>
          </div>
        </div>

        <GuidedSales />

        {/* calc */}
        {activeTools && <Calculator />}

        {/* power gen req ref chart */}
        {activeRefChart1 && (
          <div class="row mt-5 justify-content-center">
            <div class="card">
              <div class="card-header">
                <h3>Appliance/Power Reference Chart</h3>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    {/* table */}
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Power Usage</th>
                          <th scope="col">Watts</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1-5 Lights + phone charging</th>
                          <td>100-200</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            3-4 Lights. Small TV, phone charging
                          </th>
                          <td>300-400</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            5-6 Lights, Medium TV, Fan, phone charging
                          </th>
                          <td>500-600</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            7-8 Lights, Large TV, Iron, Fan, Blender, Subwoofer
                          </th>
                          <td>700-800</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            Solar Fridge, More Usage, or Bigger Backup.
                          </th>
                          <td>1000-2000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* reference chart 2 */}
        {activeRefChart2 && (
          <div class="row mt-5 justify-content-center">
            <div class="card">
              <div class="card-header">
                <h3>Technician Service Pricelist</h3>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    {/* table */}
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Fundi Service</th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1-5 Lights + phone charging</th>
                          <td>100-200</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            3-4 Lights. Small TV, phone charging
                          </th>
                          <td>300-400</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            5-6 Lights, Medium TV, Fan, phone charging
                          </th>
                          <td>500-600</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            7-8 Lights, Large TV, Iron, Fan, Blender, Subwoofer
                          </th>
                          <td>700-800</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            Solar Fridge, More Usage, or Bigger Backup.
                          </th>
                          <td>1000-2000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SPACER */}
        <div class="row mt-5 mb-5"></div>
      </div>
    </Fragment>
  );
}

export default Component;
