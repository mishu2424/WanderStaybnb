import { differenceInCalendarDays } from "date-fns";
import React, { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { Calendar, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const RoomReservation = ({ from, to, price }) => {
  const TAX_RATE = 0.13; // 13% (change if needed)
  const [state, setState] = useState([
    {
      startDate: from ? new Date(from) : new Date(),
      endDate: to ? new Date(to) : new Date(Date.now()),
      key: "selection",
    },
  ]);

  // If parent updates from/to later, sync them
  useEffect(() => {
    if (from && to) {
      setState([
        {
          startDate: new Date(from),
          endDate: new Date(to),
          key: "selection",
        },
      ]);
    }
  }, [from, to]);

  const start = state[0]?.startDate;
  const end = state[0]?.endDate;

  const nights = useMemo(() => {
    if (!start || !end) return 1;
    return Math.max(1, differenceInCalendarDays(end, start));
  }, [start, end]);

  const { total } = useMemo(() => {
    const nightly = Number(price || 0);
    const subtotal = nights * nightly;
    const tax = subtotal * TAX_RATE;
    return { subtotal, tax, total: subtotal + tax };
  }, [nights, price]);

  console.log(total);
  return (
    <>
      {/* Price & actions */}
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="text-lg sm:text-xl font-semibold">
          ${price}{" "}
          <span className="text-sm font-normal text-gray-500">/ night</span>
        </div>
        <div className="text-lg sm:text-xl font-semibold">
          Total: ${total}{" "}
        </div>
      </div>
      <DateRange
        className="w-full"
        editableDateInputs={true}
        onChange={(item) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        minDate={new Date()}
        rangeColors={["#008236"]}
        ranges={state}
      />
    </>
  );
};

export default RoomReservation;
