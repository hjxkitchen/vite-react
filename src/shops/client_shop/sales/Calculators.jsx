import React, { Fragment, useContext } from "react";
import Navbar from "../Navbar";
import PublicNavbar from "../PublicNavbar";

import { UserContext } from "../../index";

function Calculators() {
  const user = useContext(UserContext);
  return (
    <Fragment>
      {user && <Navbar />}
      {!user && <PublicNavbar />}
      <div className="container">
        <div>
          <h1 class="text-center mt-5">Calculators</h1>
        </div>
        {/* <div class="row mt-5 justify-content-center">
          <div><h2>Solar Power Generation Requirement Calculator</h2></div>
        </div> */}
        <div class="row mt-5 justify-content-center">
          <div class="card">
            <div class="card-header">
              <h3>Calculate your Solar Power Generation Requirement</h3>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    {/* select location */}
                    <label for="exampleFormControlSelect1">
                      Select your location
                    </label>
                    <select
                      class="form-control mb-3"
                      id="exampleFormControlSelect1"
                    >
                      <option>Arusha</option>
                      <option>Dar es Salaam</option>
                      <option>Dodoma</option>
                      <option>Iringa</option>
                      <option>Kagera</option>
                      <option>Kaskazini Pemba</option>
                      <option>Kaskazini Unguja</option>
                      <option>Katavi</option>
                      <option>Kigoma</option>
                      <option>Kilimanjaro</option>
                      <option>Lindi</option>
                      <option>Mara</option>
                      <option>Manyara</option>
                      <option>Mbeya</option>
                      <option>Mjini Magharibi</option>
                      <option>Morogoro</option>
                      <option>Mtwara</option>
                      <option>Mwanza</option>
                      <option>Njombe</option>
                    </select>

                    {/* select power usage */}
                    <label for="exampleFormControlSelect1">
                      Select your power usage
                    </label>
                    <select
                      class="form-control mb-3"
                      id="exampleFormControlSelect1"
                    >
                      <option>1-5 Lights + phone charging</option>
                      <option>3-4 Lights. Small TV, phone charging</option>
                      <option>
                        5-6 Lights, Medium TV, Fan, phone charging
                      </option>
                      <option>
                        7-8 Lights, Large TV, Iron, Fan, Blender, Subwoofer
                      </option>
                      <option>
                        Solar Fridge, More Usage, or Bigger Backup.
                      </option>
                      <option>Large Power Backup Systems</option>
                    </select>

                    {/* calculate custom power reqs */}
                    {/* <label for="exampleFormControlSelect1">Calculate your custom power requirements</label> */}
                    <button type="button" class="btn btn-primary mb-3">
                      Custom Calculate
                    </button>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card">
                    <div class="card-header text-center">
                      <h3>Results</h3>
                    </div>
                    <div class="card-body text-center">
                      Solar 2,4,6,8 Bulb Kit
                      <br />
                      Solar Lantern
                      <br />
                      Solar 30w Set
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 class="text-center mt-5">more calculators coming soon...</h1>
        </div>
      </div>
    </Fragment>
  );
}

export default Calculators;
