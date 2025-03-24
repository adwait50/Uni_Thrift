import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Moon, Sun } from "lucide-react";
import toast from "react-hot-toast";

function TenantOtp() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (element, index) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    }
    toast.success("Account verified successfully!");
    navigate("/tenant/dashboard");
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-indigo-50 to-blue-50"
      }`}
    >
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed top-4 right-4 p-2 rounded-full ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } shadow-lg`}
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>

      <div
        className={`rounded-2xl shadow-xl p-8 w-full max-w-md ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-center mb-8">
          <Shield
            className={`w-16 h-16 ${
              isDarkMode ? "text-indigo-400" : "text-indigo-500"
            }`}
          />
        </div>

        <h1
          className={`text-3xl font-bold text-center mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Verify Your Email
        </h1>

        <p
          className={`text-center mb-8 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          We've sent a verification code to your email address. Please enter it
          below.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-8">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                className={`w-12 h-12 text-center text-xl font-semibold rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Verify
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setOtp(["", "", "", "", "", ""])}
            className={`${
              isDarkMode
                ? "text-indigo-400 hover:text-indigo-300"
                : "text-indigo-500 hover:text-indigo-600"
            }`}
          >
            Didn't receive the code? Resend
          </button>
        </div>
      </div>
    </div>
  );
}

export default TenantOtp;
