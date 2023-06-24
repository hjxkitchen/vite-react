import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import PublicNavbar from "../PublicNavbar";
// import { UserContext } from "../index";

function Component() {
  // const user = useContext(UserContext);
  const user = "asd";

  const [inactive, setInactive] = useState(false);

  const showInactive = () => {
    if (inactive) {
      setInactive(false);
    } else {
      setInactive(true);
    }
  };

  return (
    <Fragment>
      {user && <Navbar />}
      {!user && <PublicNavbar />}

      <div className="container">
        <h1 className="text-center mt-5">Location Branch Admin HQ</h1>

        <div className="row justify-content-center">
          <button className="btn btn-primary mt-5" onClick={showInactive}>
            Show Inactive
          </button>
        </div>

        {/* TABLE */}
        <div className="row justify-content-center mt-5 mb-5">
          <div className="col-md-9 ">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Location</th>
                    <th scope="col">Branch Senior Manager</th>
                    <th scope="col">Finance</th>
                    <th scope="col">Metrics</th>
                    <th scope="col">Employees</th>
                    <th scope="col">Edit</th>
                    {/* <th scope="col">Delete</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Arusha Swahili St</td>
                    <td>John Doe</td>
                    <td>+200</td>
                    <td>90%</td>
                    <td>40</td>

                    {/* <td>
                  <button type="button" className="btn btn-primary">
                    Tools
                  </button>
                </td> */}
                    <td>
                      <button type="button" className="btn btn-warning">
                        Edit
                      </button>
                    </td>
                    {/* <td>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </td> */}
                  </tr>
                  {inactive && (
                    <tr>
                      <th scope="row">1</th>
                      <td>DSM Rex Road</td>
                      <td>
                        <Link to="/admin">Location Admin</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>40</td>

                      {/* <td>
                  <button type="button" className="btn btn-primary">
                    Tools
                  </button>
                </td> */}
                      <td>
                        <button type="button" className="btn btn-warning">
                          Edit
                        </button>
                      </td>
                      {/* <td>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </td> */}
                    </tr>
                  )}
                  {inactive && (
                    <tr>
                      <th scope="row">1</th>
                      <td>Manyara Region</td>
                      <td>
                        <Link to="/admin">Location Admin</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>40</td>

                      {/* <td>
                  <button type="button" className="btn btn-primary">
                    Tools
                  </button>
                </td> */}
                      <td>
                        <button type="button" className="btn btn-warning">
                          Edit
                        </button>
                      </td>
                      {/* <td>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </td> */}
                    </tr>
                  )}
                  {inactive && (
                    <tr>
                      <th scope="row">1</th>
                      <td>Babati Region</td>
                      <td>
                        <Link to="/admin">Location Admin</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>40</td>

                      {/* <td>
                  <button type="button" className="btn btn-primary">
                    Tools
                  </button>
                </td> */}
                      <td>
                        <button type="button" className="btn btn-warning">
                          Edit
                        </button>
                      </td>
                      {/* <td>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </td> */}
                    </tr>
                  )}
                  {inactive && (
                    <tr>
                      <th scope="row">1</th>
                      <td>Singida Region</td>
                      <td>
                        <Link to="/admin">Location Admin</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>40</td>

                      {/* <td>
                  <button type="button" className="btn btn-primary">
                    Tools
                  </button>
                </td> */}
                      <td>
                        <button type="button" className="btn btn-warning">
                          Edit
                        </button>
                      </td>
                      {/* <td>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </td> */}
                    </tr>
                  )}
                  {inactive && (
                    <tr>
                      <th scope="row">1</th>
                      <td>Longido Region</td>
                      <td>
                        <Link to="/admin">Location Admin</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>40</td>

                      {/* <td>
                  <button type="button" className="btn btn-primary">
                    Tools
                  </button>
                </td> */}
                      <td>
                        <button type="button" className="btn btn-warning">
                          Edit
                        </button>
                      </td>
                      {/* <td>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </td> */}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ADMIN OVERVIEW */}
        <div className="row justify-content-center mt-5">
          <div className="card col-md-6 text-center">
            <div className="card-header">
              <h3>Location Branch HQ Overview </h3>
            </div>
            <div className="card-body">
              {/* table fro each header*/}
              {/* col-md-3 */}
              <div className="row justify-content-center ">
                <div className="card col-md-3 text-center">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Finance (+2200)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <button className="btn btn-primary">Open</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card col-md-3 text-center">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Metrics (90%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <button className="btn btn-primary">Open</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card col-md-3 text-center">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Employees (440)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <button className="btn btn-primary">Open</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* logs top right corner of screen */}
          <div className="col-md-3 ">
            <div className="card mt-5 col">
              <div className="card-header">
                Logs{" "}
                <button className="btn btn-warning ml-5">
                  <i className="fas fa-plus" />
                </button>
              </div>
              <div className="card-body">
                Loggedin: 22/03/21 2:35am
                <br></br>
                Logged: Zahab Payment Processing
              </div>
            </div>
          </div>
        </div>

        {/* venture mission stmt */}
        {/* strategy board */}
        <div className="row justify-content-center mb-5">
          <div className="card mt-5 col-md-6">
            <div className="card-header">
              Mission Statement: Strategy Board{" "}
              {/* <button className="ml-5">
                <i className="fas fa-heart" />
              </button> */}
            </div>
            <div className="card-body">
              Mission: Civil Development with Energy Solutions.
              <br></br>
              Strategy: Build a Brand + Offer Value at Sales to Build a Proud To
              Pay Model, then Scale Ops.
            </div>
          </div>
        </div>

        {/* <div className="row justify-content-center mt-5">
        <button className="btn btn-success">Add Department</button>
      </div> */}
        {/* table with departments */}
      </div>
    </Fragment>
  );
}

export default Component;
