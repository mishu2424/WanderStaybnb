import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../shared/LoadingSpinner";
import toast from "react-hot-toast";
import DeleteModal from "../../Modal/DeleteModal";

const BookingDataRow = ({ booking, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeCancelModal = () => {
    setIsOpen(false);
  };

  // cancel booking
  const { mutateAsync: cancelBookingAsync, isPending: isCancelBookingPending } =
    useMutation({
      mutationKey: ["delete-booking"],
      mutationFn: async ({ id, reason }) => {
        const { data } = await axiosSecure.delete(
          `/bookings/${id}?reason=${reason}`
        );
        // console.log(id);
        return data;
      },
      onSuccess: () => {
        setLoading(false);
        closeCancelModal();
        refetch();
      },
    });

  const handleCancelBooking = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    const reason = e.target.reason.value;
    // console.log(reason);
    try {
      await cancelBookingAsync({ id, reason });
      await axiosSecure.patch(`/update-room-status/${booking?.roomId}`, {
        status: false,
      });
      // console.log(data);
      toast.success("Booking has been cancelled!!!");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  if(isCancelBookingPending) return <LoadingSpinner/>;
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={booking?.image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{booking?.title}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={booking?.guest?.photoURL}
                className="mx-auto object-cover rounded-full h-10 w-10 "
              />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">
              {booking?.guest?.name}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${booking?.price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(booking?.from), "P")}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(booking?.to), "P")}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button onClick={()=>setIsOpen(true)} className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Cancel</span>
        </button>
        <DeleteModal id={booking?._id}
            closeModal={closeCancelModal}
            isOpen={isOpen}
            loading={loading} 
            handleDeleteRoom={handleCancelBooking}/>
      </td>
    </tr>
  );
};

BookingDataRow.propTypes = {
  booking: PropTypes.object,
  refetch: PropTypes.func,
};

export default BookingDataRow;
