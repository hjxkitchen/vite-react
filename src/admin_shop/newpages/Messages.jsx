import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Navbar from "./../../system/Navbar";
import Footer from "./../../system/Footer";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  const getMessages = async () => {
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
    console.log("data: ", data);

    // filter to only show where read is false
    const filteredData = data.filter((message) => {
      return message.read === false;
    });

    // sort by CreatedAt
    filteredData.sort((a, b) => {
      return new Date(b.id) - new Date(a.id);
    });

    setMessages(filteredData);
  };

  // useEffect hook
  useEffect(() => {
    getMessages();
  }, []);

  // reply
  const Reply = async (id) => {
    // get phone value from input
    const customer_phone = document.querySelector(
      "input[name='phone" + id + "']"
    ).value;

    // get reply / content
    const content = document.querySelector(
      "input[name='reply" + id + "']"
    ).value;

    // make incoming object
    const pendingsend = {
      customer_phone,
      content,
      sms: true,
    };

    // post with axios
    await axios.post(
      import.meta.env.VITE_API_URL + "/api/pendingsend",
      pendingsend,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    // set incoming read true
    await axios.put(
      import.meta.env.VITE_API_URL + "/api/incoming/" + id,
      {
        read: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    // filter this messages from messages state
    const filteredMessages = messages.filter((message) => {
      return message.id !== id;
    });

    // set messages state
    setMessages(filteredMessages);

    // succes alert``
    alert("Reply sent");
  };

  return (
    <div>
      <Navbar />

      <h1 className="text-center mt-3">Unread Messages</h1>

      {
        // map messages
        messages.map((message) => {
          return (
            <div className="row justify-content-center">
              <div className="card mt-4 mb-5 col-6">
                <input
                  type="text"
                  value={message.phone}
                  name={"phone" + message.id}
                  hidden
                />
                <Link to={"/contact/" + message.phone}>
                  <p className="text-center mt-3">{message.phone}</p>
                </Link>
                <p key={message.id}>{message.content}</p>
                {/* input and reply */}
                <input type="text" name={"reply" + message.id} />
                <button
                  className="btn btn-outline-dark"
                  onClick={() => Reply(message.id)}
                >
                  Reply
                </button>
              </div>
            </div>
          );
        })
      }

      <Footer />
    </div>
  );
};

export default Messages;
