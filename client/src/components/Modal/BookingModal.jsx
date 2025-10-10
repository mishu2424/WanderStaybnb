import PropTypes from "prop-types";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { format } from "date-fns";
import { Fragment } from "react";
import CheckOutForm from "../shared/Form/CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import copy from "copy-to-clipboard";
import { TiClipboard } from "react-icons/ti";
import { IoMdCheckmark } from "react-icons/io";

import { useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const BookingModal = ({ closeModal, isOpen, bookingInfo }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copy("4242424242424242");
    setCopied(true);
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Review Info Before Reserve
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Room: {bookingInfo?.title}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Location: {bookingInfo?.location}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Guest: {bookingInfo?.host?.name}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    From: {format(new Date(bookingInfo?.from), "PP")} - To:{" "}
                    {format(new Date(bookingInfo?.to), "PP")}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Price: $ {bookingInfo?.total}
                  </p>
                </div>
                <hr className="mt-8 text-gray-200" />
                {/* Copy Test Card Info */}
                <div className="flex items-center justify-between text-xs bg-gray-100 p-3 rounded-md">
                  <span className="text-gray-700">
                    For testing, use this card number:
                    <br />
                    <span className="font-mono text-sm">
                      4242 4242 4242 4242
                    </span>
                  </span>
                  <button
                    onClick={handleCopy}
                    type="button"
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    {copied ? <IoMdCheckmark /> : <TiClipboard size={16} />}
                  </button>
                </div>{" "}
                {/* checkout form */}
                <Elements stripe={stripePromise}>
                  <CheckOutForm
                    closeModal={closeModal}
                    bookingInfo={bookingInfo}
                  />
                </Elements>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

BookingModal.propTypes = {
  bookingInfo: PropTypes.object,
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default BookingModal;
