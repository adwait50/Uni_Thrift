import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Mail, Lock, Shield } from "lucide-react";
import toast from "react-hot-toast";

function TenantSignup() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login
      toast.success("Login successful!");
      //   navigate("/tenant/dashboard");
      navigate("/otp");
    } else {
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Building2 className="w-16 h-16 text-indigo-500" />
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          {isLogin ? "Welcome Back!" : "List Your Properties"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-500 hover:text-indigo-600"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
      {/* <div>
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Shield className="w-16 h-16 text-indigo-500" />
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Verify Your Email
          </h1>

          <p className="text-center text-gray-600 mb-8">
            We've sent a verification code to your email address. Please enter
            it below.
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
                  className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              ))}
            </div>
            <Link>
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
              >
                Verify
              </button>
            </Link>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setOtp(["", "", "", "", "", ""])}
              className="text-indigo-500 hover:text-indigo-600"
            >
              Didn't receive the code? Resend
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default TenantSignup;
