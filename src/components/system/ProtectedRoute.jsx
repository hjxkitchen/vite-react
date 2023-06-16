import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ token, allowedRoles, children }) => {
  const [isTokenDecoded, setIsTokenDecoded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const decodeToken = async () => {
      if (token) {
        try {
          const decodedToken = jwt_decode(token);
          const { roleId } = decodedToken;
          setIsAuthenticated(allowedRoles.includes(roleId));
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
  }, [token, allowedRoles]);

  if (!isTokenDecoded) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!isAuthenticated) {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return null; // Return null instead of rendering the "Access Denied" message
  }

  return <>{children}</>;
};

export default ProtectedRoute;
