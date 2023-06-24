import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const Account = () => {
  // decode token for username
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  const decodedToken = jwt_decode(token);
  const username = decodedToken.username;
  const roleId = decodedToken.roleId;
  const userId = decodedToken.userId;

  // get roles
  const [roles, setRoles] = useState([]);
  const getRoles = async () => {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/Role",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );
    setRoles(response.data);
  };
  useEffect(() => {
    getRoles();
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="text-center mt-3">Account</h1>

      <div className="container">
        <div className="card mt-5 mx-auto" style={{ maxWidth: "700px" }}>
          <div className="card-body">
            {/* account info */}
            <h5 className="card-title custom-text">Account Info</h5>
            <p className="card-text custom-text">User Id: {userId}</p>
            <p className="card-text mt-3 custom-text">Username: {username}</p>
            <p className="card-text custom-text">
              Role:{" "}
              {roles.map((role) => {
                if (role.id == roleId) {
                  return role.name.toUpperCase();
                }
              })}
            </p>

            <hr />

            {/* account history */}
            <h5 className="card-title custom-text">Account History</h5>
            <p className="card-text custom-text">View your account history</p>
            <button className="btn btn-primary custom-text">
              View History
            </button>

            {/* <hr />

            <h5 className="card-title custom-text">Delete Account</h5>
            <p className="card-text custom-text">Delete your account</p>
            <button className="btn btn-danger custom-text">
              Delete Account
            </button> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Account;