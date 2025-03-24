import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function TenantForgotpassword() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep + 1);
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };
  return (
    <div className="h-screen bg-gray-900">
      <Navbar />
      <div className=" mt-20 w-full  bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#1e2435] rounded-lg shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-white">
              Reset Password
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2a2f42] text-white border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Send Reset Code
                </button>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Enter Verification Code
                  </h2>
                  <p className="text-gray-300 mb-6">
                    We've sent a verification code to your email address. Please
                    enter the code below.
                  </p>
                  <div className="flex justify-center gap-3 mb-6">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-12 h-12 text-center text-xl bg-[#2a2f42] text-white border-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    ))}
                  </div>
                  <div className="text-center mb-6">
                    <button
                      type="button"
                      className="text-blue-500 hover:text-blue-400 text-sm cursor-pointer"
                    >
                      Didn't receive the code? Resend
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Verify Code
                </button>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-300 mb-2"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 rounded-lg bg-[#2a2f42] text-white border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Enter new password"
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

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-300 mb-2"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 rounded-lg bg-[#2a2f42] text-white border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Confirm new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    >
                      <i
                        className={`fas ${
                          showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Reset Password
                </button>
              </>
            )}

            {currentStep === 4 && (
              <div className="text-center">
                <i className="fas fa-check-circle text-green-500 text-5xl mb-4"></i>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Password Reset Successful!
                </h2>
                <p className="text-gray-400 mb-6">
                  Your password has been reset successfully.
                </p>
                <Link to="/student-login">
                  <button
                    type="button"
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    Back to Login
                  </button>
                </Link>
              </div>
            )}
          </form>

          <p className="text-center mt-6 text-gray-400">
            Remember your password?{" "}
            <button className="text-blue-500 hover:text-blue-400 cursor-pointer whitespace-nowrap">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TenantForgotpassword;
