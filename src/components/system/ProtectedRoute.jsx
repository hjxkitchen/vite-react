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
};

export default ProtectedRoute;
