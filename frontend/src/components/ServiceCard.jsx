import React from "react";

function ServiceCard({ title, description, icon, image, isDarkMode }) {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 
      ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
    >
      <div className="relative h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="text-blue-500">{icon}</div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          {description}
        </p>
        <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
          Learn More
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
