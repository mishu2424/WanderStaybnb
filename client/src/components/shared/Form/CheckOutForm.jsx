import React from "react";
import { ImSpinner9 } from "react-icons/im";
import useAuth from "../../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

const CheckOutForm = ({ closeModal, bookingInfo }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { mutateAsync, isPending: isUpdatingBooking } = useMutation({
    mutationKey: ["book"],
    mutationFn: async (booking) => {
      const { data } = await axiosSecure.post("/booking", booking);
      return data;
    },
    onError: () => {
      toast.error(`Something went wrong while booking!`);
    },
  });

  const { mutateAsync: updateRoomStatus, isPending: isUpdatingStatus } =
    useMutation({
      mutationKey: ["booking-status"],
      mutationFn: async () => {
        const { data } = await axiosSecure.patch(
          `/update-room-status/${bookingInfo._id}`,
          { status: true }
        );
        return data;
      },
      onSuccess: () => {
        toast.success("Booking Confirmed");
        closeModal();
        navigate("/dashboard/my-bookings");
      },
      onError: () => {
        toast.error(`Something went wrong while updating room status!`);
        closeModal();
      },
    });

  const handleBookings = async (e) => {
    e.preventDefault();
    if (bookingInfo?.host?.email === user?.email) {
      return toast.error("You can not book your own room!");
    }
    const booking = {
      ...bookingInfo,
      guest: {
        email: user?.email,
        name: user?.displayName,
        photoURL: user?.photoURL,
      },
    };

    delete booking._id;
    try {
      await mutateAsync(booking);
      await updateRoomStatus();
    } catch (err) {
      toast.error(err.message);
    } finally {
      closeModal();
    }
  };

  if (isUpdatingBooking || isUpdatingStatus) return <LoadingSpinner />;
  return (
    <form onSubmit={handleBookings}>
      <div className="flex mt-2 justify-around">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
        >
          {/* {processing ? (
              <ImSpinner9 className="animate-spin m-auto" />
            ) : (
              `Pay ${bookingInfo?.total}`
            )} */}
          Pay
        </button>
        <button
          onClick={closeModal}
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          No
        </button>
      </div>
    </form>
  );
};

export default CheckOutForm;
