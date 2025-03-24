import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, Mail, Lock, Shield } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

function TenantLogin() {
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
    <div className="h-screen bg-gray-900">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br   p-4">
        <div className="text-white rounded-2xl shadow-xl bg-gray-800 p-8 w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Building2 className="w-16 h-16 text-indigo-500" />
          </div>

          <h1 className="text-3xl font-bold text-center  mb-8">
            Welcome Back!
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium  mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2  w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full p-3  bg-[#2a2f42]  rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium  mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full p-3  bg-[#2a2f42]  rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="w-4 h-4 rounded bg-[#2a2f42] border-none text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <Link to={"/tenant-forgot-password"}>
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
              className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to={"/tenant-signup"}>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-500 "
              >
                Don't have an account?{" "}
                <span className="hover:text-indigo-600">Sign up </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TenantLogin;
