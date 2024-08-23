// components/CustomTimePicker.js
import React, { useState } from "react";

const CustomTimePicker = () => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");

  const handleHoursChange = (e) => {
    setHours(e.target.value);
  };

  const handleMinutesChange = (e) => {
    setMinutes(e.target.value);
  };

  return (
    <div>
      <h2>Select Time</h2>
      <input
        type="number"
        value={hours}
        onChange={handleHoursChange}
        min="0"
        max="23"
        placeholder="HH"
      />
      :
      <input
        type="number"
        value={minutes}
        onChange={handleMinutesChange}
        min="0"
        max="59"
        placeholder="MM"
      />
    </div>
  );
};

export default CustomTimePicker;
