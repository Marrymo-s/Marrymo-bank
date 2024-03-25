'use client';

import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const WeddingDatepicker = () => {
  const [weddingDate, setWeddingDate] = useState(new Date());
  return (
    <DatePicker
      selected={weddingDate}
      onChange={date => setWeddingDate(date)
    } />
  );
};

export default WeddingDatepicker;