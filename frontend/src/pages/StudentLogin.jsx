import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/students/login`,
        { studentEmail: email, password }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="h-screen bg-gray-900">
      <Navbar />
      <div className=" w-full bg-gray-900 mt-16 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-2xl font-semibold text-white mb-8">
            Login to StudentHub
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#2a2f42] text-white border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#2a2f42] text-white border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#2a2f42] border-none text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <Link to={"/forgot-password"}>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-sm text-blue-500 hover:text-blue-400 cursor-pointer whitespace-nowrap"
                >
                  Forgot password?
                </button>
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
            >
              Sign in
            </button>
          </form>

          <p className="text-center mt-6 text-gray-400">
            Don't have an account?{" "}
            <Link to={"/student-signup"}>
              <button className="text-blue-500 hover:text-blue-400 cursor-pointer whitespace-nowrap">
                Sign up
              </button>
            </Link>
          </p>
        </div>

        {/* Forgot Password Modal */}
        {/* {showForgotModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-[#1e2435] rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-white mb-4">
                Reset Password
              </h2>
              <p className="text-gray-300 mb-4">
                Enter your email address and we'll send you instructions to
                reset your password.
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-[#2a2f42] text-white border-none focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer">
                  Send Instructions
                </button>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default StudentLogin;
