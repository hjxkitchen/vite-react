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

      <div className="container p-4">
        <h1 className="text-center ">Recent Chats</h1>
        <div className="row justify-content-center text-center">
          <div className="col-6">
            {/* map show only last message*/}
            {Object.keys(incoming).map((key) => (
              <Link to={"/contact/" + key}>
                <div key={key} className="card mt-4 col">
                  <h2 className="mt-4">{key}</h2>

                  <div key={key} className="card-body">
                    <p>{incoming[key][0].Message}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecentChats;
