import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Navbar from "./../../system/Navbar";
import Footer from "./../../system/Footer";

const RecentChats = () => {
  // incoming state
  const [incoming, setIncoming] = useState([]);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  // get incoming
  const getIncoming = async () => {
    // get with axios
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/incoming",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    // get data from response
    const data = response.data;

    // group by phone and sort by CreatedAt
    const sortedData = data
      .sort((a, b) => {
        return new Date(b.CreatedAt) - new Date(a.CreatedAt);
      })
      .reduce((r, a) => {
        r[a.phone] = [...(r[a.phone] || []), a];
        return r;
      }, {});

    // set incoming
    setIncoming(sortedData);
  };

  // useEffect hook
  useEffect(() => {
    getIncoming();
  }, []);

  return (
    <div>
      <Navbar />

      <h1>Recent Chats</h1>

      {/* map show only last message*/}
      {Object.keys(incoming).map((key) => (
        <div key={key}>
          <Link to={"/contact/" + key}>
            <h2>{key}</h2>
          </Link>
          <p>{incoming[key][0].Message}</p>
        </div>
      ))}

      <Footer />
    </div>
  );
};

export default RecentChats;
