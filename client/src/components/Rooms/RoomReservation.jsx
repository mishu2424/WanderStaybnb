import { differenceInCalendarDays } from "date-fns";
import React, { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { Calendar, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import useAuth from "../../hooks/useAuth";
import BookingModal from "../Modal/BookingModal";

const RoomReservation = ({
  bookingInfo,
  closeModal,
  isOpen,
  setIsBookingModalOpen,
}) => {
  const { theme } = useAuth();
  const TAX_RATE = 0.13; // 13% (change if needed)
  const [state, setState] = useState([
    {
      startDate: bookingInfo?.from ? new Date(bookingInfo?.from) : new Date(),
      endDate: bookingInfo?.to
        ? new Date(bookingInfo?.to)
        : new Date(Date.now()),
      key: "selection",
    },
  ]);

  // If parent updates from/to later, sync them
  useEffect(() => {
    if (bookingInfo?.from && bookingInfo?.to) {
      setState([
        {
          startDate: new Date(bookingInfo?.from),
          endDate: new Date(bookingInfo?.to),
          key: "selection",
        },
      ]);
    }
  }, [bookingInfo?.from, bookingInfo?.to]);

  const start = state[0]?.startDate;
  const end = state[0]?.endDate;

  const nights = useMemo(() => {
    if (!start || !end) return 1;
    return Math.max(1, differenceInCalendarDays(end, start));
  }, [start, end]);

  const { total } = useMemo(() => {
    const nightly = Number(bookingInfo?.price || 0);
    const subtotal = nights * nightly;
    const tax = subtotal * TAX_RATE;
    return { subtotal, tax, total: subtotal + tax };
  }, [nights, bookingInfo?.price]);

  // console.log(total);
  return (
    <>
      {/* Price & actions */}
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div
          className={`text-lg sm:text-xl font-semibold ${
            theme === "night" && `text-black`
          }`}
        >
          ${bookingInfo?.price}{" "}
          <span className="text-sm font-normal text-gray-500">/ night</span>
        </div>
        <div
          className={`text-lg sm:text-xl font-semibold ${
            theme === "night" && `text-black`
          }`}
        >
          Total: ${total}{" "}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <h5 className="text-sm text-center font-bold text-white bg-green-800 rounded-sm px-6 my-3">
          Available Dates
        </h5>
      </div>
      <DateRange
        className="w-full"
        editableDateInputs={true}
        onChange={(item) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        minDate={new Date()}
        maxDate={new Date(bookingInfo?.to)}
        rangeColors={["#008236"]}
        ranges={state}
      />
      <button
        disabled={bookingInfo?.booked}
        onClick={() => setIsBookingModalOpen(true)}
        className="px-4 py-2 w-full rounded-lg bg-green-800 text-white hover:bg-green-700 transition cursor-pointer disabled:bg-green-800/50"
      >
        {bookingInfo?.booked ? "Reserved" : "Reserve"}
      </button>
      <BookingModal
        closeModal={closeModal}
        isOpen={isOpen}
        bookingInfo={{
          ...bookingInfo,
          total,
          from: state[0].startDate,
          to: state[0].endDate,
        }}
      />
    </>
  );
};

export default RoomReservation;
