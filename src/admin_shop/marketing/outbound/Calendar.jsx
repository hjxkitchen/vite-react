import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = ({
  events,
  onDateClick,
  onEventAdd,
  selectedDateEvents,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newEventTitle, setNewEventTitle] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateClick(date);
  };

  const handleTitleChange = (event) => {
    setNewEventTitle(event.target.value);
  };

  const handleAddEvent = () => {
    onEventAdd(selectedDate, newEventTitle);
    setNewEventTitle(""); // Reset the title for the next event
  };

  const tileClassName = ({ date }) => {
    const weekStartDate = new Date(selectedDate);
    const weekEndDate = new Date(selectedDate);
    weekEndDate.setDate(selectedDate.getDate() + 13);

    // console.log("weekStartDate:", weekStartDate);
    // console.log("weekEndDate:", weekEndDate);

    return date >= weekStartDate && date <= weekEndDate
      ? "react-calendar__tile--active"
      : null;
  };

  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={tileClassName}
          tileContent={({ date, view }) => {
            const eventsForDate = events.filter(
              (event) =>
                date.toDateString() === new Date(event.date).toDateString()
            );

            return view === "month" ? (
              <div>
                {eventsForDate.length > 0 && (
                  <div>
                    {/* {eventsForDate.length} */}
                    {eventsForDate.map((event, index) => {
                      return <div key={index}>({event.blog_id})</div>;
                    })}
                  </div>
                )}
              </div>
            ) : null;
          }}
        />
      </div>
      <div className="col-4">
        <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
        <label>
          Event Blog ID:
          <input
            type="number"
            value={newEventTitle}
            onChange={handleTitleChange}
          />
        </label>
        <br />
        <button className="btn btn-outline-dark" onClick={handleAddEvent}>
          Add Event
        </button>
        <div className="mt-5">
          <h2>Scheduled Blog ID for {selectedDate.toLocaleDateString()}</h2>
          <ul>
            {selectedDateEvents.map((event) => (
              <li key={event.id}>{event.blog_id}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
