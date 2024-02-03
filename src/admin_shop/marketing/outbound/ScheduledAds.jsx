// App.js
import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import "./App.css";
import axios from "axios";
import Cookies from "js-cookie";

import Navbar from "../../../system/Navbar";
import Footer from "../../../system/Footer";

const App = () => {
  //   const [events, setEvents] = useState([
  //     {
  //       id: 1,
  //       title: "Event 1",
  //       start: new Date(2024, 1, 1, 10, 0),
  //       end: new Date(2024, 1, 1, 12, 0),
  //     },
  //     // Add more events as needed
  //   ]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the server when the component mounts
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/scheduledad",

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  const handleDateClick = async (date) => {
    try {
      const adjustedDate = new Date(date.getTime()); // Add 1 day

      const eventsForDate = events.filter(
        (event) =>
          adjustedDate.toDateString() === new Date(event.date).toDateString()
      );

      console.log("Events for date:", events);
      setSelectedDateEvents(eventsForDate);
    } catch (error) {
      console.error("Error fetching and filtering events:", error);
    }
  };

  const handleEventAdd = async (date, title) => {
    try {
      // const adjustedDate = new Date(selectedDate);

      //   do post request for that date and the next 6 as well

      for (let i = 1; i < 15; i++) {
        const adjustedDate = new Date(date.getTime() + i * 24 * 60 * 60 * 1000); // Add 1 day
        // console.log("fgt;", date);
        // adjustedDate.setDate(date.getDate() + i);
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "/api/scheduledad",
          {
            blog_id: title,
            date: adjustedDate.toISOString().split("T")[0],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
          }
        );

        const newEvent = response.data;
        setEvents([...events, newEvent]);
        setSelectedDateEvents([newEvent]);
      }

      // const response = await axios.post(
      //   import.meta.env.VITE_API_URL + "/api/scheduledad",
      //   {
      //     blog_id: title,
      //     date: adjustedDate.toISOString().split("T")[0],
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "x-api-key": import.meta.env.VITE_API_KEY,
      //     },
      //   }
      // );

      // const newEvent = response.data;
      // setEvents([...events, newEvent]);
      // setSelectedDateEvents([newEvent]);

      window.location.reload();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <h1 className="mt-5 mb-5">Schedule SMS Blog Broadcasts</h1>
        <div className="Calendar-container">
          <Calendar
            events={events}
            onDateClick={handleDateClick}
            onEventAdd={handleEventAdd}
            selectedDateEvents={selectedDateEvents}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default App;
