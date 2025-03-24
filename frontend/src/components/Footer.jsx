import React from "react";
import { BookMarked, Mail, MessageSquare, Phone, Store } from "lucide-react";

function Footer({ isDarkMode }) {
  return (
    <footer
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              StudentHub
            </h3>
            <p className="text-sm">
              Your one-stop platform for all student needs. Connect, trade, and
              find accommodation with ease.
            </p>
          </div>

          <div>
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Our Services
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="flex items-center space-x-2 hover:text-blue-500 transition"
                >
                  <Store className="w-4 h-4" />
                  <span>Buy & Sell</span>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="flex items-center space-x-2 hover:text-blue-500 transition"
                >
                  <BookMarked className="w-4 h-4" />
                  <span>Housing & PG</span>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="flex items-center space-x-2 hover:text-blue-500 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Community</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@studenthub.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition">
                Twitter
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                Facebook
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 StudentHub. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-blue-500 transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
