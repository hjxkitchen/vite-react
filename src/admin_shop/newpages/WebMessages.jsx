import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import Navbar from "../../system/Navbar";
import Footer from "../../system/Footer";

const WebMessages = () => {
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  const [webmessages, setWebmessages] = useState([]);

  const getWebmessages = async () => {
    // get webmessages
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/webmessage",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    // get data from response
    const data = response.data;
    console.log("webmessages: ", data);

    // read webmessages filter
    const readWebmessages = data.filter((webmessage) => {
      return webmessage.read === true;
    });

    // unread webmessages
    const unreadWebmessages = data.filter((webmessage) => {
      return webmessage.read === false;
    });

    // set webmessages
    setWebmessages(unreadWebmessages);
  };

  useEffect(() => {
    getWebmessages();
  }, []);

  const sendReply = async (phone) => {
    // get phone number
    // let phone = webmessages[0].phone;
    console.log("phone: ", phone);

    // go to /contact/phone
    window.location.href = "/contact/" + phone;
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="text-center">Web Messages</h1>
        <div>
          {/* MAP WEBMESSAGES AS CARDS */}
          {webmessages.map((webmessage) => (
            <div className="card mt-4 mb-4 p-4">
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">
                  {webmessage.reason}
                </h6>
                <h5 className="card-title">
                  {webmessage.name} - {webmessage.phone}
                </h5>
                <p className="card-text">{webmessage.message}</p>
                {/* button */}
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => sendReply(webmessage.phone)}
                >
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WebMessages;
