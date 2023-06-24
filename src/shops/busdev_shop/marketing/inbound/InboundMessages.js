import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../../../components/Navbar";

function UsersList() {
  return (
    <Fragment>
      <Navbar />
      <div class="container">
        <div class="row justify-content-center ">
          <div class="col-md-9">
            <h1 className="text-center mt-5">Inbound Marketing</h1>
          </div>
        </div>

        {/* consolidate all inbound messages and include source */}
        <div class="table-responsive">
          <div class="row mb-3 mt-5 justify-content-center">
            {/* table of inbound messages with source */}
            <div class="col-md-9">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Source</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Message</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Link to="/inboundreply">
                      <th scope="row">Whatsapp</th>
                    </Link>
                    <td>Unread</td>
                    <td>1/1/2020</td>
                    <td>12:00pm</td>
                    <td>Hi, I would like to buy a car</td>
                  </tr>
                  <tr>
                    <Link to="/inboundreply">
                      <th scope="row">Facebook</th>
                    </Link>
                    <td>Unread</td>
                    <td>1/1/2020</td>
                    <td>12:00pm</td>
                    <td>Hi, I would like to buy a car</td>
                  </tr>
                  <tr>
                    <Link to="/inboundreply">
                      <th scope="row">Instagram</th>
                    </Link>
                    <td>Unread</td>
                    <td>1/1/2020</td>
                    <td>12:00pm</td>
                    <td>Hi, I would like to buy a car</td>
                  </tr>
                  {/* sms, call, twitter, youtube */}
                  <tr>
                    <Link to="/inboundreply">
                      <th scope="row">SMS</th>
                    </Link>
                    <td>Unread</td>
                    <td>1/1/2020</td>
                    <td>12:00pm</td>
                    <td>Hi, I would like to buy a car</td>
                  </tr>
                  <tr>
                    <Link to="/inboundreply">
                      <th scope="row">Call</th>
                    </Link>
                    <td>Unread</td>
                    <td>1/1/2020</td>
                    <td>12:00pm</td>
                    <td>Hi, I would like to buy a car</td>
                  </tr>
                  <tr>
                    <Link to="/inboundreply">
                      <th scope="row">Twitter</th>
                    </Link>
                    <td>Unread</td>
                    <td>1/1/2020</td>
                    <td>12:00pm</td>
                    <td>Hi, I would like to buy a car</td>
                  </tr>
                  <tr>
                    <Link to="/inboundreply">
                      <th scope="row">Youtube</th>
                    </Link>
                    <td>Unread</td>
                    <td>1/1/2020</td>
                    <td>12:00pm</td>
                    <td>Hi, I would like to buy a car</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UsersList;
