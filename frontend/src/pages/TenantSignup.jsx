import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const TenantSignup = () => {
  const [currentStep, setCurrentStep] = useState("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentStep("otp");
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setCurrentStep("confirmation");
  };
  const SignupForm = (
    <div className="w-full max-w-xl bg-[#1e2435] rounded-lg shadow-xl p-8">
      <h1 className="text-2xl font-semibold text-white mb-6">Create Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-gray-300 mb-2">
            Full Name
          </label>
          <div className="relative">
            <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2a2f42] text-white border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>
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
        <div>
          <label htmlFor="password" className="block text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-[#2a2f42] text-white border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Create password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="propertyAddress" className="block text-gray-300 mb-2">
            Property Address
          </label>
          <div className="relative">
            <i className="fas fa-home absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              id="propertyAddress"
              type="text"
              value={propertyAddress}
              onChange={(e) => setPropertyAddress(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2a2f42] text-white border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter property address"
            />
          </div>
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-gray-300 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <i className="fas fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2a2f42] text-white border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="aadhar" className="block text-gray-300 mb-2">
              Aadhar Card
            </label>
            <div className="relative">
              <i className="fas fa-id-card absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                id="aadhar"
                type="file"
                accept="image/*"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2a2f42] text-white border-none focus:ring-2 focus:ring-blue-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="addressProof" className="block text-gray-300 mb-2">
              Address Proof
            </label>
            <div className="relative">
              <i className="fas fa-file-image absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                id="addressProof"
                type="file"
                accept="image/*"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2a2f42] text-white border-none focus:ring-2 focus:ring-blue-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                required
              />
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-300">
              I agree to the{" "}
              <a href="#" className="text-blue-500 hover:text-blue-400">
                Terms and Conditions
              </a>
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 !rounded-button whitespace-nowrap"
        >
          Sign Up
        </button>
      </form>

      <p className="text-center mt-6 text-gray-400">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 hover:text-blue-400">
          Sign in
        </a>
      </p>
    </div>
  );
  const OtpVerification = (
    <div className="w-full max-w-md bg-[#1e2435] rounded-lg shadow-xl p-8">
      <h1 className="text-2xl font-semibold text-white mb-6">
        OTP Verification
      </h1>
      <p className="text-gray-300 mb-8">
        Please enter the verification code sent to {email}
      </p>
      <form onSubmit={handleOtpSubmit} className="space-y-6">
        <div className="flex justify-between space-x-2">
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
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 !rounded-button whitespace-nowrap"
        >
          Verify
        </button>
      </form>
      <div className="text-center mt-6">
        <p className="text-gray-400">
          Didn't receive the code?{" "}
          <button className="text-blue-500 hover:text-blue-400">Resend</button>
        </p>
      </div>
    </div>
  );
  const ConfirmationPage = (
    <div className="w-full max-w-md bg-[#1e2435] rounded-lg shadow-xl p-8 text-center">
      <div className="mb-6">
        <i className="fas fa-check-circle text-6xl text-green-500"></i>
      </div>
      <h1 className="text-2xl font-semibold text-white mb-4">
        Registration Successful!
      </h1>
      <p className="text-gray-300 mb-8">
        Thank you for registering with us. Your account has been successfully
        created.
      </p>
      <button
        onClick={() => (window.location.href = "/dashboard")}
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 !rounded-button whitespace-nowrap"
      >
        Go to Dashboard
      </button>
    </div>
  );
  return (
    <div className="h-screen bg-gray-900">
      <Navbar />
      <div className="min-h-screen w-full bg-[#1a1f2e] flex items-center justify-center p-4">
        {currentStep === "signup" && SignupForm}
        {currentStep === "otp" && OtpVerification}
        {currentStep === "confirmation" && ConfirmationPage}
      </div>
    </div>
  );
};

export default TenantSignup;
