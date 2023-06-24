import React, { Fragment, useContext, useEffect, useState } from "react";
import Navbar from "../../Navbar";
import PublicNavbar from "../../PublicNavbar";
// import { UserContext } from "../../../../../index";

function Component() {
  // const user = useContext(UserContext);

  const [loaditems, setLoadItems] = useState([]);

  const [voltage, setVoltage] = useState(12);
  const [DOD, setDOD] = useState(50);
  const [daysOfStorage, setDaysOfStorage] = useState(1);
  const [totalWH, SetTotalWH] = useState(500);

  const [batteryAmps, setBatteryAmps] = useState(0);
  const [batteryAmpsDOD, setBatteryAmpsDOD] = useState(0);
  const [batterySize, setBatterySize] = useState(0);

  const submitGo = (e) => {
    e.preventDefault();
    // split string at comma
    const item = e.target.item.value.split(",");
    console.log(item);
    // create object from array
    const itemObj = {
      name: item[0],
      watts: item[1],
      hours: item[2],
    };
    // add object to array
    setLoadItems([...loaditems, itemObj]);

    // clear input
    e.target.item.value = "";
  };

  useEffect(() => {
    // calculate total watts
    const totalWatts = loaditems.reduce((acc, item) => {
      return acc + item.watts * item.hours;
    }, 0);
    // calculate total WH
    const totalWH = totalWatts;
    // set total WH
    SetTotalWH(totalWH);

    // if total WH is greater than 3000, set voltage to 24
    if (totalWH > 3000) {
      setVoltage(24);
    }
    // if total WH is greater than 5000, set voltage to 48
    if (totalWH > 5000) {
      setVoltage(48);
    }

    // if wh is less than 3000, set voltage to 12
    if (totalWH < 3000) {
      setVoltage(12);
    }
  }, [loaditems, daysOfStorage]);

  //   useffect set battery amps no dod
  useEffect(() => {
    // calculate battery amps
    const batteryAmps = totalWH / voltage;
    // round to nearest
    const roundedBatteryAmps = Math.round(batteryAmps);
    // set battery amps
    setBatteryAmps(roundedBatteryAmps);
  }, [totalWH, voltage]);

  //   useffect set battery amps dod
  useEffect(() => {
    // calculate battery amps dod
    const batteryAmpsDOD = totalWH / voltage / (DOD / 100);
    // round to 2 decimal places
    const rounded = Math.round(batteryAmpsDOD);
    // set battery amps dod
    setBatteryAmpsDOD(rounded);
  }, [totalWH, voltage, DOD]);

  //   useffect set battery size
  useEffect(() => {
    // calculate battery size
    const batterySize = batteryAmpsDOD * daysOfStorage;
    // round to 2 decimal places
    const roundedBatterySize = Math.round(batterySize);

    // set battery size
    setBatterySize(roundedBatterySize);
  }, [batteryAmpsDOD, daysOfStorage]);

  {
    /* oneline delete from loaditems in index */
  }
  const deleteItem = (index) => {
    const newLoadItems = [...loaditems];
    newLoadItems.splice(index, 1);
    setLoadItems(newLoadItems);
  };

  return (
    <Fragment>
      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Tools</h5>

              {/* <div input group */}
              <form onSubmit={submitGo}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Item, Watts, Hours"
                    aria-label="Item, Watts, Hours"
                    aria-describedby="basic-addon2"
                    name="item"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit">
                      Add
                    </button>
                  </div>
                </div>
              </form>

              {/* table for loaditems */}
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Watts</th>
                    <th scope="col">Hours</th>
                  </tr>
                </thead>

                <tbody>
                  {loaditems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.watts}</td>
                      <td>{item.hours}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteItem(index)}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* tfooter to calculate total */}
                <tfoot>
                  <tr>
                    <td>Total</td>
                    {/* watts x hours */}
                    <td>
                      {loaditems.reduce((total, item) => {
                        return total + item.watts * item.hours;
                      }, 0)}{" "}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
              {/* total watt hours */}
              {/* <p>Total Watt Hours:{totalWH}</p> */}
              {/* Voltage Radioes, 12, 24, 48v in one line */}
              <div className="table-responsive">
                <div className="row">
                  <div
                    className="form-check
                    form-check-inline"
                    // no changing
                    disabled
                  >
                    {/* selected */}
                    <input
                      className="form-check-input ml-3"
                      type="radio"
                      name="voltage"
                      id="voltage12"
                      value="12"
                      checked={voltage === 12}
                    />

                    <label
                      className="form-check
                        label"
                      for="12v"
                    >
                      12v
                    </label>
                    <input
                      className="form-check-input ml-5"
                      type="radio"
                      name="voltageradios"
                      id="24v"
                      value="24"
                      checked={voltage === 24}
                    />
                    <label
                      className="form-check
                        label"
                      for="24v"
                    >
                      24v
                    </label>
                    <input
                      className="form-check-input ml-5"
                      type="radio"
                      name="voltageradios"
                      id="48v"
                      value="48"
                      checked={voltage === 48}
                    />
                    <label
                      className="form-check
                        label"
                      for="48v"
                    >
                      48v
                    </label>
                  </div>
                </div>
                {/* batteryamps */}
                {/* <p>Battery Amps: {batteryAmps}</p> */}
                {/* dod radios */}
                <div className="row mt-3">
                  <div
                    className="form-check
                    form-check-inline"
                    onChange={(e) => setDOD(e.target.value)}
                  >
                    <input
                      className="form-check-input ml-3"
                      type="radio"
                      name="dodradios"
                      id="30dod"
                      value="30"
                    />
                    <label
                      className="form-check
                        label"
                      for="30dod"
                    >
                      30% Lead Acid/AGM/GEL
                    </label>
                    <input
                      className="form-check-input ml-5"
                      type="radio"
                      name="dodradios"
                      id="50dod"
                      value="50"
                      // default checked
                      defaultChecked
                    />
                    <label
                      className="form-check
                        label"
                      for="50dod"
                    >
                      50% Lead Acid/AGM/GEL
                    </label>
                    <input
                      className="form-check-input ml-5"
                      type="radio"
                      name="dodradios"
                      id="80dod"
                      value="80"
                    />
                    <label
                      className="form-check
                        label"
                      for="80dod"
                    >
                      80% Lithium
                    </label>
                  </div>
                </div>
                {/* battery amps dod */}
                {/* <p>Battery Amps DOD:{batteryAmpsDOD}</p> */}
                {/* days radios */}
                <div className="row mt-3 mb-3">
                  <div
                    className="form-check
                        form-check-inline"
                    onChange={(e) => setDaysOfStorage(e.target.value)}
                  >
                    <input
                      className="form-check-input ml-3"
                      type="radio"
                      name="daysradios"
                      id="1day"
                      value="1"
                      defaultChecked
                    />
                    <label
                      className="form-check
                            label"
                      for="1day"
                    >
                      1 day
                    </label>
                    <input
                      className="form-check-input ml-5"
                      type="radio"
                      name="daysradios"
                      id="2day"
                      value="2"
                    />
                    <label
                      className="form-check
                            label"
                      for="2day"
                    >
                      2 days
                    </label>
                    <input
                      className="form-check-input ml-5"
                      type="radio"
                      name="daysradios"
                      id="3day"
                      value="3"
                    />
                    <label
                      className="form-check
                            label"
                      for="3day"
                    >
                      3 days
                    </label>
                    <input
                      className="form-check-input ml-5"
                      type="radio"
                      name="daysradios"
                      id="4day"
                      value="4"
                    />
                    <label
                      className="form-check
                            label"
                      for="4day"
                    >
                      4 days
                    </label>
                  </div>
                </div>
              </div>
              {/* total battery size */}
              <p className="mt-3">Total Battery Size:{batterySize}</p>
              {/* DOD radioes, 12, 24, 48v in one line */}
              {/* <div
                className="form-check  
                form-check-inline"
                onChange={(e) => setDOD(e.target.value)}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio1"
                  value="80"
                />
                <label
                  className="form-check
                    label"
                  for="inlineRadio1"
                >
                  80% Lithium
                </label>
                <input
                  className="form-check-input ml-5"
                  type="radio"
                  id="inlineRadio2"
                  value="50"
                />
                <label
                  className="form-check
                    label"
                  for="inlineRadio2"
                >
                  50% Lead Acid/AGM/Gel
                </label>
                <input
                  className="form-check-input ml-5"
                  type="radio"
                  id="inlineRadio3"
                  value="30"
                />
                <label
                  className="form-check
                    label"
                  for="inlineRadio3"
                >
                  30% Lead Acid/AGM/Gel
                </label>
              </div> */}
              {/* DAYS OF STORAGE radioes, 12, 24, 48v in one line */}
              {/* <div
                className="form-check  
                form-check-inline"
                onChange={(e) => setDaysOfStorage(e.target.value)}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio1"
                  value="1"
                />
                <label
                  className="form-check
                    label"
                  for="inlineRadio1"
                >
                  1 day
                </label>
                <input
                  className="form-check-input ml-5"
                  type="radio"
                  id="inlineRadio2"
                  value="2"
                />
                <label
                  className="form-check
                    label"
                  for="inlineRadio2"
                >
                  2 days
                </label>
                <input
                  className="form-check-input ml-5"
                  type="radio"
                  id="inlineRadio3"
                  value="3"
                />
                <label
                  className="form-check
                    label"
                  for="inlineRadio3"
                >
                  3 days
                </label>
                <input
                  className="form-check-input ml-5"
                  type="radio"
                  id="inlineRadio3"
                  value="4"
                />
                <label
                  className="form-check
                    label"
                  for="inlineRadio3"
                >
                  4 days
                </label>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5 justify-content-center">
        <div className="card">
          <div className="card-header">
            <h3>Calculate your Solar Power Generation Requirement</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  {/* select location */}
                  <label for="exampleFormControlSelect1">
                    Select your location
                  </label>
                  <select
                    className="form-control mb-3"
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
                    className="form-control mb-3"
                    id="exampleFormControlSelect1"
                  >
                    <option>1-5 Lights + phone charging</option>
                    <option>3-4 Lights. Small TV, phone charging</option>
                    <option>5-6 Lights, Medium TV, Fan, phone charging</option>
                    <option>
                      7-8 Lights, Large TV, Iron, Fan, Blender, Subwoofer
                    </option>
                    <option>Solar Fridge, More Usage, or Bigger Backup.</option>
                    <option>Large Power Backup Systems</option>
                  </select>

                  {/* calculate custom power reqs */}
                  {/* <label for="exampleFormControlSelect1">Calculate your custom power requirements</label> */}
                  <button type="button" className="btn btn-primary mb-3">
                    Custom Calculate
                  </button>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header text-center">
                    <h3>Results</h3>
                  </div>
                  <div className="card-body text-center">
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
    </Fragment>
  );
}

export default Component;
