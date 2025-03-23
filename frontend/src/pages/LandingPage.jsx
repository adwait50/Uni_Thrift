import React, { useState } from "react";
import {
  BookMarked,
  Home,
  LogIn,
  Menu,
  MessageSquare,
  ShoppingBag,
  Store,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";

const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const services = [
    {
      title: "Buy & Sell Items",
      description:
        "Buy and sell second-hand books, electronics, and more within your campus community.",
      icon: <Store className="w-8 h-8" />,
      image:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1470",
    },
    {
      title: "Housing & PG",
      description:
        "Find the perfect accommodation near your campus with verified listings.",
      icon: <BookMarked className="w-8 h-8" />,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1470",
    },
    {
      title: "Community Hub",
      description:
        "Connect with peers, share knowledge, and get your questions answered.",
      icon: <MessageSquare className="w-8 h-8" />,
      image:
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1470",
    },
  ];

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "dark bg-gray-900" : "bg-white"}`}
    >
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* Hero Section */}
      <section className="relative min-h-[600px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1470"
            className="w-full h-full object-cover"
            alt="Students studying"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 to-blue-800/95"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-4">
                Your Complete Campus Companion
              </h1>
              <p className="text-xl mb-4">
                Everything you need for a better student life - all in one
                place.
              </p>
              <p className="text-lg mb-8 opacity-90">
                Join thousands of students who've simplified their campus life
                with StudentHub. From finding affordable housing to connecting
                with peers, we've got you covered.
              </p>
              <div className="space-y-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition w-full md:w-auto">
                  Get Started
                </button>
                <div className="flex items-center gap-8 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>10,000+ Active Users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>50+ Universities</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute -top-8 -left-8 w-72 h-72 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1470"
                alt="Students collaborating"
                className="relative rounded-lg shadow-2xl transform hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={`py-16 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2
            className={`text-3xl font-bold text-center mb-12 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Why Students Choose StudentHub
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div
              className={`p-6 rounded-lg ${
                isDarkMode ? "bg-gray-700" : "bg-white"
              } shadow-lg`}
            >
              <h3
                className={`text-xl font-semibold mb-3 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Verified Community
              </h3>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Connect with verified students from your university. Our
                community is exclusive to college students, ensuring safe and
                relevant interactions.
              </p>
            </div>
            <div
              className={`p-6 rounded-lg ${
                isDarkMode ? "bg-gray-700" : "bg-white"
              } shadow-lg`}
            >
              <h3
                className={`text-xl font-semibold mb-3 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Save Money
              </h3>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Find affordable housing options, buy used textbooks, and sell
                items you no longer need. StudentHub helps you manage your
                expenses effectively.
              </p>
            </div>
            <div
              className={`p-6 rounded-lg ${
                isDarkMode ? "bg-gray-700" : "bg-white"
              } shadow-lg`}
            >
              <h3
                className={`text-xl font-semibold mb-3 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                24/7 Support
              </h3>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Our dedicated support team is always here to help. Whether you
                have questions about listings or need technical assistance,
                we've got your back.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Our Services
            </h2>
            <p
              className={`text-xl max-w-2xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Everything you need to thrive in your college life, all in one
              platform. Discover our comprehensive suite of student services.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} isDarkMode={isDarkMode} />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        className={`py-20 px-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-4xl font-bold text-center mb-16 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            About Us
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1471"
                alt="Team"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
              <h3
                className={`text-2xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Empowering Student Life
              </h3>
              <p className="mb-4">
                We started with a simple mission: to make student life easier
                and more connected. Our platform brings together essential
                services that every student needs, from finding affordable
                accommodation to buying and selling study materials.
              </p>
              <p className="mb-4">
                What sets us apart is our community-first approach. We believe
                in the power of student communities to support and uplift each
                other. Through our platform, we're not just providing services -
                we're building a network of students helping students.
              </p>
              <p>
                Join thousands of students who are already part of our growing
                community and experience a better way to manage student life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h3
                className={`text-4xl font-bold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                10K+
              </h3>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Active Students
              </p>
            </div>
            <div className="text-center">
              <h3
                className={`text-4xl font-bold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                50+
              </h3>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Universities
              </p>
            </div>
            <div className="text-center">
              <h3
                className={`text-4xl font-bold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                5K+
              </h3>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Housing Listings
              </p>
            </div>
            <div className="text-center">
              <h3
                className={`text-4xl font-bold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                15K+
              </h3>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Items Traded
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default LandingPage;
