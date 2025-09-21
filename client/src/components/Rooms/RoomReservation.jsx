import React, { useState } from "react";
import { Calendar, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const RoomReservation = ({ price }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  return (
    <>
      {/* Price & actions */}
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="text-lg sm:text-xl font-semibold">
          {price}{" "}
          <span className="text-sm font-normal text-gray-500">/ night</span>
        </div>
      </div>
      <DateRange
        className="w-full"
        editableDateInputs={true}
        onChange={(item) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        minDate={new Date()}
        ranges={state}
      />
    </>
  );
};

export default RoomReservation;
