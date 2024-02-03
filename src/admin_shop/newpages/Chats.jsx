import React from "react";
import { Link } from "react-router-dom";

import Navbar from "./../../system/Navbar";
import Footer from "./../../system/Footer";

const Chats = () => {
  return (
    <div>
      <Navbar />

      {/* link to contacts */}
      <Link to="/messages">
        <h2 className="text-center mt-5">Unread Messages</h2>
      </Link>

      <br />
      <br />
      {/* link to contacts */}
      <Link to="/recentchats">
        <h2 className="text-center mt-5">Recent Chats</h2>
      </Link>

      <br />
      <br />

      <Footer />
    </div>
  );
};

export default Chats;
