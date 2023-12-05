import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./components/TableContact";

import Cookies from "js-cookie";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);

  const getContacts = async () => {
    // get with axios
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/contact",
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

    // filter data
    const filteredData = data.filter((contact) => {
      return contact.name !== "undefined";
    });

    // set contacts
    setContacts(filteredData);
  };

  // useEffect hook
  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div>
      <h1>Contacts</h1>
      <Table data={contacts} setContacts={setContacts} />
    </div>
  );
};

export default Contacts;
