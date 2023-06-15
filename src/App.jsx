import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Login from "./components/system/Login";
import Navbar from "./components/system/Navbar";

const App = () => {
  const [token, setToken] = useState("");
  const [isLoadingToken, setIsLoadingToken] = useState(true);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setIsLoadingToken(false);
  }, []);

  const handleLogout = () => {
    setToken("");
    Cookies.remove("token");
  };

  if (isLoadingToken) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {token ? (
        <div>
          <Navbar handleLogout={handleLogout} />
          <h1>Welcome!</h1>
        </div>
      ) : (
        <Login setToken={setToken} />
      )}
    </div>
  );
};

export default App;
