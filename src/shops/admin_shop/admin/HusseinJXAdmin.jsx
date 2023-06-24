import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import PublicNavbar from "../PublicNavbar";
// import { UserContext } from "../index";

function Component() {
  const user = useContext(UserContext);

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

      <div class="container">
        {/* <h1 class="text-center mt-5">HusseinJX Admin</h1>

        <div className="row  mt-5">
          <div className="card col text-center">
            <div className="card-header">
              <h3>HusseinJX Overview </h3>
            </div>
            <div className="card-body">
              <div className="row justify-content-center ">
                <div className="card col-md-3 text-center">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Finance(+2200)</th>
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
                        <th scope="col">Employees (44000)</th>
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

          <div class="col-md-3 ">
            <div class="card mt-5 col">
              <div class="card-header">
                Logs{" "}
                <button class="btn btn-warning ml-5">
                  <i class="fas fa-plus" />
                </button>
              </div>
              <div class="card-body">
                Loggedin: 22/03/21 2:35am
                <br></br>
                Logged: Zahab Payment Processing
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="card mt-5 col-md-6">
            <div class="card-header">
              Strategy Board{" "}
              <button class="btn btn-warning ml-5">
                <i class="fas fa-edit" />
              </button>
            </div>
            <div class="card-body">Strategy: Aggressive Growth.</div>
          </div>
        </div> */}

        <h1 class="text-center mt-5">Ventures List</h1>

        <div className="row justify-content-center mt-5">
          <button className="btn btn-primary" onClick={showInactive}>
            Show Inactive
          </button>
          <Link>
            <button className="btn btn-success">Add Venture</button>
          </Link>
        </div>
        {/* table with departments */}

        <div class="table-responsive">
          <div className="row justify-content-center mt-5 mb-5">
            <div className="col-md-9 ">
              <table class="table table-striped text-center">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Venture</th>
                    <th scope="col">Admin</th>
                    <th scope="col">Head Department</th>
                    <th scope="col">CEO</th>
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
                    <td>Zahab</td>
                    <Link to="/admin">
                      <td>Energy and Installation</td>
                    </Link>
                    <td>
                      <Link to="/multinationalhq">multinational HQ</Link>
                    </td>
                    <td>Me</td>
                    <td>+200</td>
                    <td>90%</td>
                    <td>4400</td>

                    <td>
                      <button type="button" class="btn btn-warning">
                        Edit
                      </button>
                    </td>
                  </tr>
                  {/* {inactive && (
                    <tr>
                      <th scope="row">1</th>
                      <td>Zahab</td>
                      <td>Software Dev, Sec, Ops</td>
                      <td>
                        <Link to="/multinationalhq">MultiNational HQ</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>4400</td>

                      <td>
                        <button type="button" class="btn btn-warning">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )}
                  {inactive && (
                    <tr>
                      <th scope="row">1</th>
                      <td>Zahab</td>
                      <td>Tech </td>
                      <td>
                        <Link to="/multinationalhq">MultiNational HQ</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>4400</td>

                      <td>
                        <button type="button" class="btn btn-warning">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )} */}

                  {inactive && (
                    <tr>
                      <th scope="row">2</th>
                      <td>Philanthropy</td>
                      <td>Civil Development</td>
                      <td>
                        <Link to="/multinationalhq">MultiNational HQ</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>4400</td>

                      <td>
                        <button type="button" class="btn btn-warning">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )}
                  {inactive && (
                    <tr>
                      <th scope="row">3</th>
                      <td>Tourism</td>
                      <td>Luxury Tourism Services</td>
                      <td>
                        <Link to="/multinationalhq">MultiNational HQ</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>4400</td>

                      <td>
                        <button type="button" class="btn btn-warning">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )}
                  {inactive && (
                    <tr>
                      <th scope="row">3</th>
                      <td>Tourism</td>
                      <td>MMA</td>
                      <td>
                        <Link to="/multinationalhq">MultiNational HQ</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>4400</td>

                      <td>
                        <button type="button" class="btn btn-warning">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )}
                  {/* {inactive && (
                    <tr>
                      <th scope="row">2</th>
                      <td>Tourism</td>
                      <td>Private Jet Rentals</td>
                      <td>
                        <Link to="/multinationalhq">MultiNational HQ</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>4400</td>

                      <td>
                        <button type="button" class="btn btn-warning">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )} */}
                  {inactive && (
                    <tr>
                      <th scope="row">3</th>
                      <td>Tourism</td>
                      <td>Fintech / Insurtech</td>
                      <td>
                        <Link to="/multinationalhq">MultiNational HQ</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>4400</td>

                      <td>
                        <button type="button" class="btn btn-warning">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )}
                  {inactive && (
                    <tr>
                      <th scope="row">4</th>
                      <td>Art</td>
                      <td>Paint / Collectibles</td>
                      <td>
                        <Link to="/multinationalhq">MultiNational HQ</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>4400</td>

                      <td>
                        <button type="button" class="btn btn-warning">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )}
                  {inactive && (
                    <tr>
                      <th scope="row">4</th>
                      <td>Art</td>
                      <td>Music / Movies</td>
                      <td>
                        <Link to="/multinationalhq">MultiNational HQ</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>4400</td>

                      <td>
                        <button type="button" class="btn btn-warning">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )}
                  {inactive && (
                    <tr>
                      <th scope="row">4</th>
                      <td>Art</td>
                      <td>Fashion</td>
                      <td>
                        <Link to="/multinationalhq">MultiNational HQ</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>4400</td>

                      <td>
                        <button type="button" class="btn btn-warning">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )}
                  {/* {inactive && (
                    <tr>
                      <th scope="row">2</th>
                      <td>Tourism</td>
                      <td>Import / Export</td>
                      <td>
                        <Link to="/multinationalhq">MultiNational HQ</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>4400</td>

                      <td>
                        <button type="button" class="btn btn-warning">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )} */}
                  {inactive && (
                    <tr>
                      <th scope="row">5</th>
                      <td>Real Estate</td>
                      <td>Middle Market Rental Units</td>
                      <td>
                        <Link to="/multinationalhq">MultiNational HQ</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>4400</td>

                      <td>
                        <button type="button" class="btn btn-warning">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )}
                  {inactive && (
                    <tr>
                      <th scope="row">5</th>
                      <td>Real Estate</td>
                      <td>AirBNB / Resorts</td>
                      <td>
                        <Link to="/multinationalhq">MultiNational HQ</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>4400</td>

                      <td>
                        <button type="button" class="btn btn-warning">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )}
                  {inactive && (
                    <tr>
                      <th scope="row">5</th>
                      <td>Real Estate</td>
                      <td>Commercial </td>
                      <td>
                        <Link to="/multinationalhq">MultiNational HQ</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>4400</td>

                      <td>
                        <button type="button" class="btn btn-warning">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )}
                  {inactive && (
                    <tr>
                      <th scope="row">6</th>
                      <td>Stem M&A</td>
                      <td>HealthCare Services / Hospitals</td>
                      <td>
                        <Link to="/multinationalhq">MultiNational HQ</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>6400</td>

                      <td>
                        <button type="button" class="btn btn-warning">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )}
                  {inactive && (
                    <tr>
                      <th scope="row">6</th>
                      <td>Stem M&A</td>
                      <td>HC Manufacturing</td>
                      <td>
                        <Link to="/multinationalhq">MultiNational HQ</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>6400</td>

                      <td>
                        <button type="button" class="btn btn-warning">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )}
                  {inactive && (
                    <tr>
                      <th scope="row">6</th>
                      <td>Stem M&A</td>
                      <td>Pharmaceuticals / Consumables </td>
                      <td>
                        <Link to="/multinationalhq">MultiNational HQ</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>4400</td>

                      <td>
                        <button type="button" class="btn btn-warning">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )}
                  {inactive && (
                    <tr>
                      <th scope="row">6</th>
                      <td>Stem M&A</td>
                      <td>Construction / Architecture</td>
                      <td>
                        <Link to="/multinationalhq">MultiNational HQ</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>4400</td>

                      <td>
                        <button type="button" class="btn btn-warning">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )}
                  {inactive && (
                    <tr>
                      <th scope="row">6</th>
                      <td>Stem M&A</td>
                      <td>Space</td>
                      <td>
                        <Link to="/multinationalhq">MultiNational HQ</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>4400</td>

                      <td>
                        <button type="button" class="btn btn-warning">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )}

                  {/* {inactive && (
                    <tr>
                      <th scope="row">6</th>
                      <td>Philanthropy</td>
                      <td>Edutainment / Rec centers</td>
                      <td>
                        <Link to="/multinationalhq">MultiNational HQ</Link>
                      </td>
                      <td>John Doe</td>
                      <td>+200</td>
                      <td>90%</td>
                      <td>4400</td>

                      <td>
                        <button type="button" class="btn btn-warning">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Component;
