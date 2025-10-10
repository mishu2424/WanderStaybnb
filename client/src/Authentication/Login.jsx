import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import companyLogo from "../assets/images/wanderstay.png";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import { destroy } from "splash-screen";
import { useState } from "react";
import useBlock from "../hooks/useBlock";
import { useEffect } from "react";
import ResetPasswordModal from "../components/Modal/ResetPasswordModal";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Login = () => {
  const { loading, setLoading, signInWithGoogle, signIn, resetPassword } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // console.log(from);
  const [resetEmail, setEmail] = useState("");
  const [blockedText, setBlockedText] = useState("");
  const [status, isLoading] = useBlock(resetEmail);

  // ✅ update blocked text automatically when API responds
  useEffect(() => {
    if (status === "blocked") {
      setBlockedText("Your account is blocked!");
    } else {
      setBlockedText("");
    }
  }, [status]);

  // email&password authentication
  const handleSignIn = async (e) => {
    e.preventDefault();
    if(!resetEmail) return ;
    // console.log("came here");
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");
    try {
      setLoading(true);
      if (isLoading) {
        toast.error("Checking account status, please wait...");
        return;
      }
      if (status === "blocked") {
        // console.log("entered");
        setLoading(false);
        return setBlockedText("Your account is blocked to use!");
      }

      await signIn(email, password);
      toast.success("Signed in successfully!");
      // console.log("came this far");
      navigate(from);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // google authentication
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Signed in successfully!");
      // console.log("came this far");
      navigate(from);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // reset password
  const handleResetPassword = async () => {
    if (!resetEmail) return toast.error("Please write your email");
    setLoading(true);
    // console.log(resetEmail);
    try {
      await resetPassword(resetEmail);
      toast.success("Please check your email");
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  // modal
  let [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  function openModal() {
    setIsResetPasswordOpen(true);
  }

  function closeModal() {
    setIsResetPasswordOpen(false);
  }

  // destroy();
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-center mx-auto">
          <img className="w-auto md:h-14 h-8" src={companyLogo} alt="logo" />
        </div>
        <div className="flex items-center justify-center mt-6">
          <span className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300">
            Sign in
          </span>
        </div>

        <form className="mt-6" onSubmit={handleSignIn}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Email
            </label>
            <input
              onBlur={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              placeholder="Enter your email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Password
              </label>
              <div
                onClick={openModal}
                className="space-y-1 flex justify-between"
              >
                <button className="text-xs hover:underline hover:text-rose-500 text-gray-400">
                  Forgot password?
                </button>
                <span className="text-xs hover:underline hover:text-rose-500 text-red-700">
                  {blockedText}
                </span>
              </div>
              <Transition show={isResetPasswordOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black/25" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Forget Password
                          </Dialog.Title>
                          <div className="mt-2">
                            <input
                              onChange={(e) => setEmail(e.target.value)}
                              type="email"
                              name="reset-email"
                              id="email"
                              required
                              defaultValue={resetEmail}
                              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                              data-temp-mail-org="0"
                            />
                          </div>

                          <div className="mt-4">
                            <button
                              onClick={handleResetPassword}
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >
                              Reset Password
                            </button>
                          </div>
                          <div className="mt-4">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={() => setIsResetPasswordOpen(false)}
                            >
                              Close
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
              <span className="text-xs hover:underline hover:text-rose-500 text-red-700">
                {blockedText}
              </span>
            </div>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 cursor-pointer">
              {loading ? (
                <ImSpinner3 className="animate-spin m-auto" />
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

          <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
            or login with Social Media
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
                "Sign in with Google"
              )}
            </span>
          </button>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-400">
          {" "}
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
