import PropTypes from "prop-types";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../../hooks/useAuth";
const UpdateProfileForm = ({
  handleUpdateProfile,
  handleImagePreview,
  imageFile,
  imageText,
}) => {
  const { user, loading } = useAuth();
  return (
    <form
      onSubmit={handleUpdateProfile}
      noValidate=""
      action=""
      className="space-y-6 ng-untouched ng-pristine ng-valid"
    >
      <div>
        <label htmlFor="email" className="block mb-2 text-sm">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter Your Name Here"
          defaultValue={user?.displayName}
          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
          data-temp-mail-org="0"
        />
      </div>
      <div>
        <label htmlFor="image" className="block mb-2 text-sm">
          Select Image:
        </label>
        <div className="flex items-center border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200">
          <div className="flex">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => handleImagePreview(e.target.files[0])}
              className="w-full p-2 text-gray-900 cursor-pointer"
              title="Click to change the file"
            />
            {imageText.length > 20
              ? imageText.split(".")[0].slice(0, 15) +
                "..." +
                imageText.split(".")[1]
              : imageText}
          </div>
          {imageFile && (
            <img
              className="w-12 h-12 rounded mr-3"
              src={imageFile}
              alt="Uploaded preview"
            />
          )}
        </div>
      </div>
      {/* <div className="border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3">
        {imageText.length > 20
          ? imageText.split(".")[0].slice(0, 15) +
            "..." +
            imageText.split(".")[1]
          : imageText}
      </div> */}

      <button
        disabled={loading}
        type="submit"
        className="bg-[#F43F5E] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]"
      >
        {loading ? (
          <TbFidgetSpinner className="animate-spin m-auto" />
        ) : (
          "Update"
        )}
      </button>
    </form>
  );
};

UpdateProfileForm.propTypes = {
  handleUpdateProfile: PropTypes.func,
};
export default UpdateProfileForm;
