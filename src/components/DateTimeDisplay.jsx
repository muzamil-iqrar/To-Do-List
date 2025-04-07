import React from "react";

const DateTimeDisplay = ({ currentDate, currentTime }) => (
  <div className="date-time-wrapper">
    <p className="current-date">{currentDate}</p>
    <p className="currenttime">{currentTime}</p>
  </div>
);

export default DateTimeDisplay;
