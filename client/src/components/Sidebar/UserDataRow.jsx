import PropTypes from "prop-types";
import UpdateUserModal from "../Modal/UpdateUserModal";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const UserDataRow = ({ user, refetch }) => {
  const { user: loggedInUser } = useAuth();
  const [isUpdateRoleModalOpen, setIsUpdateRoleModalOpen] = useState(false);

  const closeModal = () => {
    setIsUpdateRoleModalOpen(false);
  };
  const axiosSecure = useAxiosSecure();
  const { mutateAsync: updateUserRoleAsync } = useMutation({
    mutationKey: ["update-user-role"],
    mutationFn: async (updatedUser) => {
      const { data } = await axiosSecure.patch(
        `/update-user-role/${user?.email}`,
        updatedUser
      );
      return data;
    },
    onSuccess: () => {
      closeModal();
      refetch();
    },
    onError: () => {
      toast.error("Something went wrong!");
      closeModal();
    },
  });

  const modalHandler = async (role) => {
    console.log(
      loggedInUser?.email === user?.email,
      loggedInUser?.email,
      user?.email
    );
    if (loggedInUser?.email === user?.email) {
      return toast.error("Admin can not change his own role");
    }
    const updatedUser = {
      role,
      status: "Verified",
    };
    console.log(updatedUser);
    try {
      await updateUserRoleAsync(updatedUser);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {user?.status ? (
          <p
            className={`${
              user.status === "Verified" ? "text-green-500" : "text-yellow-500"
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className="text-red-500 whitespace-no-wrap">Unavailable</p>
        )}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => setIsUpdateRoleModalOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal
          user={user}
          closeModal={closeModal}
          setIsUpdateRoleModalOpen={setIsUpdateRoleModalOpen}
          isUpdateRoleModalOpen={isUpdateRoleModalOpen}
          refetch={refetch}
          modalHandler={modalHandler}
        />
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;
