import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Contact = () => {
  let { id } = useParams();
  let url_id = id.replace("+", "%2B");
  console.log("id: ", id);

  const [incoming, setIncoming] = useState([]);
  const [pendingsend, setPendingsend] = useState([]);
  const [customer, setCustomer] = useState({});

  const getCustomer = async () => {
    // get with axios
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/contact?phone=" + url_id
    );

    // get data from response
    const data = response.data;
    console.log("customerdata: ", data);

    // set customer
    setCustomer(data[0]);
  };

  // get incoming for id
  const getIncoming = async () => {
    // query phone: replace + with %2B

    // get incoming where phone is id
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/incoming?phone=" + url_id
    );

    // get data from response
    const data = response.data;
    console.log("incomingdata: ", data);

    // set incoming
    setIncoming(data);
  };

  //   get all incomings and all pendingsends

  const getPendingsend = async () => {
    // get with axios
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/pendingsend?phone=" + url_id
    );

    // get data from response
    const data = response.data;
    console.log("pendingsenddata: ", data);

    // filter out where sms is false
    const filteredData = data.filter((message) => {
      return message.sms === true;
    });

    setPendingsend(filteredData);
  };

  // useEffect hook
  useEffect(() => {
    getIncoming();
    getPendingsend();
    getCustomer();
  }, []);

  // make the 2 arrays into 1 array sorted by createdAt
  const all = [...incoming, ...pendingsend];
  all.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  console.log(all, ":all");

  // reply
  const Reply = async () => {
    const customer_phone = id;

    // get reply / content
    const content = document.querySelector("input[name='reply']").value;

    // make incoming object
    const data = {
      customer_phone,
      content,
      sms: true,
    };

    // post with axios
    await axios.post(import.meta.env.VITE_API_URL + "/api/pendingsend", data);

    //  get id of all incomings where read is false
    const unreadIncomings = incoming.filter((message) => {
      return message.read === false;
    });

    // put read to true for all unread incomings with id
    unreadIncomings.forEach(async (message) => {
      await axios.put(
        import.meta.env.VITE_API_URL + "/api/incoming/" + message.id,
        {
          read: true,
        }
      );
    });

    // add to pendingsend and set
    data.createdAt = new Date();
    setPendingsend([...pendingsend, data]);

    // succes alert``
    alert("Reply sent");
  };

  return (
    <div>
      <h1>
        Contact {id}: {customer?.customer_name} ({customer?.score})
      </h1>
      <div className="chat-container">
        {all.map((message, index) => (
          <div
            key={index}
            className="chat-message"
            // style={{ float: message.customer_phone ? "right" : "left" }}
            style={{
              backgroundColor: message.phone ? "lightblue" : "white",
              marginLeft: message.phone ? "10%" : "0px",
            }}
          >
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      {/* reply */}
      <input type="text" name="reply" />
      <button onClick={() => Reply()}>Reply</button>
    </div>
  );
};
export default Contact;
