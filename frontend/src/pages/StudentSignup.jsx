import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function StudentSignup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [proofOfAdmission, setproofOfAdmission] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      setShowOtpModal(true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = () => {
    setShowOtpModal(false);
    setCurrentStep(2);
  };
  return (
    <div className="h-screen bg-gray-900">
      <Navbar />
      <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-[#1e2435] rounded-lg shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-white">
              Student Registration
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <>
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-gray-300 mb-2"
                  >
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
                  <label
                    htmlFor="phoneNumber"
                    className="block text-gray-300 mb-2"
                  >
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

                <div>
                  <label
                    htmlFor="currentAddress"
                    className="block text-gray-300 mb-2"
                  >
                    Current Address
                  </label>
                  <div className="relative">
                    <i className="fas fa-map-marker-alt absolute left-3 top-3 text-gray-400"></i>
                    <textarea
                      id="currentAddress"
                      value={currentAddress}
                      onChange={(e) => setCurrentAddress(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2a2f42] text-white border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Enter your current address"
                      rows={3}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-300 mb-2"
                  >
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
                      placeholder="Create a password"
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
                    htmlFor="fullName"
                    className="block text-gray-300 mb-2"
                  >
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
                {/* <div>
                  <label className="block text-gray-300 mb-2">
                    Admission Proof
                  </label>
                  <div
                    className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors duration-200"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                    />
                    <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                    <p className="text-gray-400 text-sm">
                      {selectedFile
                        ? selectedFile.name
                        : "Upload a file or drag and drop"}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </div>
                </div> */}

                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#2a2f42] border-none text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                    I agree to the{" "}
                    <button
                      type="button"
                      className="text-blue-500 hover:text-blue-400"
                    >
                      Terms and Conditions
                    </button>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!agreeToTerms}
                  className={`w-full py-3 px-4 text-white rounded-lg transition-colors duration-200 !rounded-button whitespace-nowrap ${
                    agreeToTerms
                      ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                      : "bg-gray-600 cursor-not-allowed"
                  }`}
                >
                  Create Account
                </button>
              </>
            )}

            {currentStep === 2 && (
              <div className="text-center">
                <i className="fas fa-check-circle text-green-500 text-5xl mb-4"></i>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Registration Successful!
                </h2>
                <p className="text-gray-400 mb-6">
                  Your account has been created successfully.
                </p>
                <Link to={"/student-login"}>
                  <button
                    type="button"
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    Go to Login
                  </button>
                </Link>
              </div>
            )}
          </form>

          <p className="text-center mt-6 text-gray-400">
            Already have an account?{" "}
            <Link to={"/student-login"}>
              <button className="text-blue-500 hover:text-blue-400 cursor-pointer whitespace-nowrap">
                Sign in
              </button>
            </Link>
          </p>
        </div>

        {/* OTP Verification Modal */}
        {showOtpModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-[#1e2435] rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-white mb-2">
                Verify Your Email
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
                <button className="text-blue-500 hover:text-blue-400 text-sm">
                  Didn't receive the code? Resend
                </button>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowOtpModal(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVerifyOtp}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentSignup;
