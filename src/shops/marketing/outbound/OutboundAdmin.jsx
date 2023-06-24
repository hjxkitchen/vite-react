import React, { Fragment, useContext } from "react";
import Navbar from "../../admin_shop/Navbar";
import { Link } from "react-router-dom";
// import { UserContext } from "../../../../index";
// import OrdersList from "../../../../components/admin/fulfillment/procurement/OrdersList";

function Contact() {
  //   const user = useContext(UserContext);

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <div>
          <h1 class="text-center mt-5">Outbound Admin Dash</h1>
        </div>

        <div className="row justify-content-center ">
          <button className="btn btn-success">Add</button>
        </div>
        {/* table with departments */}
        <div className="table-responsive">
          <div className="row justify-content-center mt-5 mb-5">
            <div className="col-md-9 ">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Sub Department</th>
                    <th scope="col">Category</th>
                    <th scope="col">Managers</th>
                    {/* <th scope="col">Tools</th> */}
                    <th scope="col">Edit</th>
                    {/* <th scope="col">Delete</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Marketing Support </td>
                    <td>
                      <Link to="/outboundbroadcast">Social Media/Digital</Link>
                    </td>
                    <td>John Doe</td>

                    <td>
                      <button type="button" class="btn btn-warning">
                        Edit
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Marketing Support </td>
                    <td>
                      <Link to="/sokoos">Stalls/Sokoo</Link>
                    </td>
                    <td>John Doe</td>

                    <td>
                      <button type="button" class="btn btn-warning">
                        Edit
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>3</td>
                    <td>Marketing Support </td>
                    <td>
                      <Link to="/philantropy">Philantropy</Link>
                    </td>
                    <td>John Doe</td>

                    <td>
                      <button type="button" class="btn btn-warning">
                        Edit
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Marketing Support </td>
                    <td>
                      <Link to="/billboards">Billboards/Physical</Link>
                    </td>
                    <td>John Doe</td>

                    <td>
                      <button type="button" class="btn btn-warning">
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* /DEPT ADMIN */}
    </Fragment>
  );
}

export default Contact;
