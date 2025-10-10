import PropTypes from "prop-types";
import UpdateUserModal from "../Modal/UpdateUserModal";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

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
    if (user?.status !== "Requested") {
      return "Can not change the status of user unless user requests for the change!";
    }
    if (loggedInUser?.email === user?.email) {
      return toast.error("Admin can not change his own role");
    }
    const updatedUser = {
      role,
      status: "Verified",
    };
    // console.log(updatedUser);
    try {
      await updateUserRoleAsync(updatedUser);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const { mutateAsync } = useMutation({
    mutationKey: ["block-user"],
    mutationFn: async (user) => {
      const { data } = await axiosSecure.delete(`/block-user/${user?.email}`);
      return data;
    },
  });

  const handleBlockUser = async (user) => {
    if (loggedInUser?.email === user?.email)
      return toast.error("Admin cannot block their own account");
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await mutateAsync(user);
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          } catch (err) {
            toast.error(err.message);
          }
        }
      });
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

        <button
          onClick={() => handleBlockUser(user)}
          className="relative cursor-pointer ml-2 inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-100 opacity-50 rounded-full"
          ></span>
          <span className="relative">Block User</span>
        </button>
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;
