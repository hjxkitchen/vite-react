import React from "react";
import Navbar from "../system/components/Navbar";
import Footer from "../system/components/Footer";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const Account = () => {
  // decode token for username
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  const decodedToken = jwt_decode(token);
  const username = decodedToken.username;
  return (
    <>
      <Navbar />
      <h1 className="text-center mt-3">Account</h1>

      <div className="container">
        <div className="card mt-5 mx-auto" style={{ maxWidth: "700px" }}>
          <div className="card-body">
            {/* account info */}
            <h5 className="card-title custom-text">Account Info</h5>
            <p className="card-text mt-3 custom-text">Username: {username}</p>
            {/* <p className="card-text custom-text">Email:</p>
            <p className="card-text custom-text">Phone:</p> */}

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
