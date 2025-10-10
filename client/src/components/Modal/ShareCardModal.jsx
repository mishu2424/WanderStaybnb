import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import {
  FacebookShareButton, TwitterShareButton, WhatsappShareButton,
  LinkedinShareButton, EmailShareButton,
  FacebookIcon, TwitterIcon, WhatsappIcon, LinkedinIcon, EmailIcon,
} from "react-share";

const ShareCardModal = ({ closeShareModal, isOpen, shareUrl = "", title = "" }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeShareModal}>
        <TransitionChild as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="relative flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as={Fragment}
              enter="ease-out duration-300" enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100" leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex relative items-start justify-between gap-6">
                  <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
                    Share this place
                  </DialogTitle>
                  <button
                    type="button"
                    onClick={closeShareModal}
                    aria-label="Close"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  Loved this place? Spread the word and share it with your friends!
                </p>

                <hr className="my-6" />

                <div className="bg-white shadow-sm p-6 rounded-xl max-w-sm mx-auto text-center">
                  <div className="flex items-center justify-center gap-3">
                    <FacebookShareButton url={shareUrl} quote={title}>
                      <FacebookIcon size={40} round aria-label="Share on Facebook" />
                    </FacebookShareButton>

                    <TwitterShareButton url={shareUrl} title={title}>
                      <TwitterIcon size={40} round aria-label="Share on X/Twitter" />
                    </TwitterShareButton>

                    <WhatsappShareButton url={shareUrl} title={title} separator=" — ">
                      <WhatsappIcon size={40} round aria-label="Share on WhatsApp" />
                    </WhatsappShareButton>

                    <LinkedinShareButton url={shareUrl} title={title}>
                      <LinkedinIcon size={40} round aria-label="Share on LinkedIn" />
                    </LinkedinShareButton>

                    <EmailShareButton url={shareUrl} subject={title} body="Check out this amazing place!">
                      <EmailIcon size={40} round aria-label="Share via Email" />
                    </EmailShareButton>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ShareCardModal;
