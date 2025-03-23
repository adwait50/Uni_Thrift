import React from "react";
import {
  BookMarked,
  Home,
  LogIn,
  Menu,
  MessageSquare,
  Moon,
  Store,
  Sun,
} from "lucide-react";

function Navbar({ isDarkMode, setIsDarkMode }) {
  return (
    <nav
      className={`sticky top-0 z-50 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } shadow-md`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <Home className="w-6 h-6 text-blue-500" />
              <span className="font-bold text-xl">StudentHub</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="hover:text-blue-500 transition">
              Home
            </a>
            <a
              href="/marketplace"
              className="flex items-center space-x-1 hover:text-blue-500 transition"
            >
              <Store className="w-4 h-4" />
              <span>Buy & Sell</span>
            </a>
            <a
              href="/housing"
              className="flex items-center space-x-1 hover:text-blue-500 transition"
            >
              <BookMarked className="w-4 h-4" />
              <span>Housing</span>
            </a>
            <a
              href="/community"
              className="flex items-center space-x-1 hover:text-blue-500 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Community</span>
            </a>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <a
              href="/login"
              className="flex items-center space-x-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
