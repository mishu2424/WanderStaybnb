import React, { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import useAuth from "../../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
// import { CardElement, Elements, useElements, useStripe } from "../../src";
import useRole from "../../../hooks/useRole";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckOutForm.css";
const CheckOutForm = ({ closeModal, bookingInfo }) => {
  const { user, setToggle, toggleHandler } = useAuth();
  const [role] = useRole();
  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const total = bookingInfo?.total;
    // console.log(total);
    if (total > 1) {
      getClientSecret({ total });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingInfo?.total]);

  const getClientSecret = async (price) => {
    // console.log(price);
    const { data } = await axiosSecure.post(`/create-payment-intent`, price);
    // console.log(data);
    setClientSecret(data.clientSecret);
  };

  const { mutateAsync, isPending: isUpdatingBooking } = useMutation({
    mutationKey: ["book"],
    mutationFn: async (booking) => {
      const { data } = await axiosSecure.post("/booking", booking);
      return data;
    },
    onError: () => {
      setCardError(`Something went wrong while booking!`);
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
        setToggle(true);
        // toggleHandler();
        navigate("/dashboard/my-bookings");
      },
      onError: () => {
        toast.error(`Something went wrong while updating room status!`);
        closeModal();
      },
    });

  const handleBookings = async (e) => {
    e.preventDefault();
    // if (role === "admin")
    //   return toast.error("Admin account cannot book the rooms");

    // Prevent booking in the past
    const today = new Date();
    const checkIn = new Date(bookingInfo.from);
    const checkOut = new Date(bookingInfo.to);

    if (checkIn < today || checkOut < today) {
      toast.error("You cannot book for past dates!");
      return;
    }

    
    if (user?.email === bookingInfo?.host?.email)
      return toast.error("You are not allowed to reserve this room!");

    setProcessing(true);
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      setProcessing(false);
      return;
    }
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      setProcessing(false);
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log("[error]", error);
      setProcessing(false);
      setCardError(error.message);
      return;
    } else {
      setCardError("");
      // console.log("[PaymentMethod]", paymentMethod);
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "",
            name: user?.displayName || "",
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const booking = {
        ...bookingInfo,
        roomId: bookingInfo?._id,
        date: new Date(),
        transactionId: paymentIntent.id,
        guest: {
          email: user?.email,
          name: user?.displayName,
          photoURL: user?.photoURL,
        },
      };

      delete booking._id;
      delete booking?.booked;
      try {
        await mutateAsync(booking);
        await updateRoomStatus();
      } catch (err) {
        toast.error(err.message);
      } finally {
        closeModal();
        setProcessing(false);
      }
      setProcessing(false);
    }
  };

  if (isUpdatingBooking || isUpdatingStatus) return <LoadingSpinner />;
  return (
    <form onSubmit={handleBookings}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex mt-2 justify-around">
        <button
          type="submit"
          disabled={!stripe || processing || bookingInfo?.booked}
          className="inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
        >
          {processing ? (
            <ImSpinner9 className="animate-spin m-auto" />
          ) : (
            `Pay $${bookingInfo?.total}`
          )}
        </button>
        <button
          onClick={closeModal}
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          No
        </button>
      </div>
      <p className="text-xs text-red-500">{cardError}</p>
    </form>
  );
};

export default CheckOutForm;
