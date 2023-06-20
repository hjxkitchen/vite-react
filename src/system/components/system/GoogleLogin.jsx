import React from "react";

const GoogleAuth = () => {
  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_API_URL + "/auth/google"; // Redirect to the server route for Google OAuth authentication
  };

  return <button onClick={handleGoogleLogin}>Sign in with Google</button>;
};

export default GoogleAuth;
