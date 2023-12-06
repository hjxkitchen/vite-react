import React from "react";
import { Link } from "react-router-dom";

import Navbar from "./../../system/Navbar";
import Footer from "./../../system/Footer";

const Chats = () => {
  return (
    <div>
      <Navbar />

      {/* link to contacts */}
      <Link to="/messages">Unread Messages</Link>

      <br />
      <br />
      {/* link to contacts */}
      <Link to="/recentchats">Recent Chats</Link>

      <br />
      <br />

      <Footer />
    </div>
  );
};

export default Chats;
