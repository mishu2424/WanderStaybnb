import React, { useEffect, useRef, useState } from "react";
import companyLogo from "../assets/images/wanderstay.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import { ImageBBUpload } from "../api/utilities";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge, // 👈 correct spelling
  validateCaptcha,
} from "react-simple-captcha";
import * as RSC from "react-simple-captcha";

const Signup = () => {
  const [passToggle, setPassToggle] = useState(false);
  //   const [confirmPassToggle, seConfirmPassToggle] = useState(false);
  const [passError, setPassError] = useState(false);
  const captchaRef = useRef(null);
  const [imageFile, setImageFile] = useState();

  const {
    loading,
    setLoading,
    signInWithGoogle,
    createUser,
    updateUserProfile,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [imgVal, setImgVal] = useState("Profile Photo");
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleImagePreview = (image) => {
    setImageFile(URL.createObjectURL(image));
  };

  // email&password authentication
  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");
    const user_captcha = form.get("user_captcha");
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      // console.log('entered')
      setPassError(true);
      return;
    }
    const confirmPassword = form.get("confirmPassword");
    const name = form.get("name");
    const photoURL = form.get("photoURL");
    if (validateCaptcha(user_captcha, false)) {
      try {
        setLoading(true);
        if (password !== confirmPassword)
          return toast.error("Passwords did not match!");
        const img = await ImageBBUpload(photoURL);
        await createUser(email, password);
        await updateUserProfile(name, img);
        toast.success("Signed up successfully!");
        navigate(from);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      return toast.error("Captcha Does Not Match");
    }
  };

  // google authentication
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Signed up successfully!");
      navigate(from);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form className="w-full max-w-md" onSubmit={handleSignIn}>
          <div className="flex justify-center mx-auto">
            <img className="w-auto md:h-16 h-8" src={companyLogo} alt="logo" />
          </div>

          <div className="flex items-center justify-center mt-6">
            <span className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300">
              Sign up
            </span>
          </div>

          <div className="relative flex items-center mt-8">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>

            <input
              required
              type="text"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Username"
              name="name"
            />
          </div>

          <label
            htmlFor="dropzone-file"
            className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-300 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>

            <h2 className="mx-3 text-gray-400">{imgVal}</h2>

            <div>
              <input
                required
                name="photoURL"
                type="file"
                className="hidden"
                id="dropzone-file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setImgVal(file ? file.name : "Profile Photo");
                  handleImagePreview(e.target.files[0]);
                }}
              />
              {imageFile && (
                <img
                  className="w-8 h-8 object-cover"
                  src={imageFile}
                  alt="user-photo"
                />
              )}
            </div>
          </label>

          <div className="relative flex items-center mt-6">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>

            <input
              type="email"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Email address"
              name="email"
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            <input
              type={`${passToggle ? "text" : "password"}`}
              className="relative block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
              name="password"
            />
            {passToggle ? (
              <IoEyeOffSharp
                onClick={() => setPassToggle(!passToggle)}
                className="absolute top-4 right-3 cursor-pointer"
                size={16}
              />
            ) : (
              <IoEye
                onClick={() => setPassToggle(!passToggle)}
                className="absolute top-4 right-3 cursor-pointer"
                size={16}
              />
            )}
          </div>
          {passError && (
            <div>
              <ul className="list-disc pl-5 text-red-500">
                <li>
                  At least <strong>8</strong> characters
                </li>
                <li>
                  Must contain <strong>1 uppercase letter (A-Z)</strong>
                </li>
                <li>
                  Must contain <strong>1 lowercase letter (a-z)</strong>
                </li>
                <li>
                  Must contain <strong>1 number (0-9)</strong>
                </li>
                <li>
                  Must contain <strong>1 special character</strong> (@ $ ! % * ?
                  &)
                </li>
              </ul>
            </div>
          )}

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            <input
              type="password"
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Confirm Password"
              name="confirmPassword"
            />
          </div>
          <div className="relative mt-4">
            <label className="label">
              <LoadCanvasTemplate reloadText="Reload Captcha" />
            </label>
            <input
              ref={captchaRef}
              type="text"
              name="user_captcha"
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Write the text above"
              required
            />
          </div>

          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-800 rounded-lg hover:bg-white hover:text-green-800 border hover:border-green-800 cursor-pointer focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              {loading ? (
                <ImSpinner3 className="animate-spin m-auto" />
              ) : (
                "Sign up"
              )}
            </button>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

              <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                or signup with Social Media
              </span>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
            </div>

            <div className="flex items-center mt-6 -mx-2">
              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="flex items-center justify-center cursor-pointer w-full px-6 py-2 mx-2 text-sm font-medium text-green-800 border transition-colors duration-300 transform focus:outline-none"
              >
                <FcGoogle />

                <span className="hidden mx-2 sm:inline">
                  {loading ? (
                    <ImSpinner3 className="animate-spin m-auto" />
                  ) : (
                    "Sign up with Google"
                  )}
                </span>
              </button>
            </div>

            <div className="mt-6 text-center ">
              <Link
                to={`/login`}
                className="text-sm text-blue-500 hover:underline dark:text-blue-400"
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
