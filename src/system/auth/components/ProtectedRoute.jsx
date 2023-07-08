import React, { useEffect, useState } from "react";
// jwt-decode
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
// import fro jwt verify
// import { verify } from "jsonwebtoken";

const ProtectedRoute = ({ allowedRoles, children, setUser }) => {
  const [isTokenDecoded, setIsTokenDecoded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  console.log("token:");

  useEffect(() => {
    const decodeToken = async () => {
      if (token) {
        try {
          // verify token
          // const decoded = verify(token, import.meta.env.VITE_JWT_SECRET);

          console.log("decoding token:");
          const decodedToken = jwt_decode(token);
          const { role_id } = decodedToken;
          setIsAuthenticated(allowedRoles.includes(role_id));
          console.log("decodedTokeniss:", decodedToken);
          // setUser(decodedToken.username);
        } catch (error) {
          console.error("Error decoding token:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsTokenDecoded(true);
    };

    decodeToken();
  }, []);

  if (!isTokenDecoded) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    if (!token) {
      return <Navigate to="/login" replace />;
    } else {
      return (
        <div>
          <h3>Access Denied</h3>
          <p>You are not authorized to access this page.</p>
          {/* go back */}
          <button onClick={() => window.history.back()}>Go Back</button>
        </div>
      );
    }
  }

  return <>{children}</>;

  // // simple if token auth
  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // } else {
  //   return <>{children}</>;
  // }
};

export default ProtectedRoute;
