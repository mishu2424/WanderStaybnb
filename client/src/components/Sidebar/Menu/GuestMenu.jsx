import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import MenuItem from "./MenuItem";
import HostModal from "../../Modal/HostModal";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../shared/LoadingSpinner";

const GuestMenu = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [role, isLoading] = useRole();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleHostRequest = async () => {
    try {
      const newUser = {
        email: user?.email,
        name: user?.displayName,
        role: "guest",
        status: "Requested",
      };
      const { data } = await axiosSecure.put("/users", newUser);
      if (data.modifiedCount > 0) {
        return toast.success("Host request has been sent!");
      } else {
        return toast.success(
          "Request had already been made! Please wait for admin approval!"
        );
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      closeModal();
    }
  };
  console.log(role);

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label="My Bookings"
        address="my-bookings"
      />

      {role === "guest" && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex w-full items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer"
        >
          <GrUserAdmin className="w-5 h-5" />

          <span className="mx-4 font-medium">Become A Host</span>
        </button>
      )}
      <HostModal
        isOpen={isOpen}
        closeModal={closeModal}
        handleHostRequest={handleHostRequest}
      />
    </>
  );
};

export default GuestMenu;
