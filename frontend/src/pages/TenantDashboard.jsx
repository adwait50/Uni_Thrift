import React, { useState } from "react";
import { MessageCircle, Search, Filter, Star } from "lucide-react";

const items = [
  {
    id: 1,
    name: "Study Table",
    price: 75,
    age: "1.5 years",
    condition: "Good",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=1536",
    description:
      "Sturdy wooden study table with drawer storage. Perfect for students.",
    seller: {
      name: "Alex Johnson",
      rating: 4.8,
      responseTime: "Usually responds within 1 hour",
    },
  },
  {
    id: 2,
    name: "Gaming Chair",
    price: 120,
    age: "8 months",
    condition: "Excellent",
    image:
      "https://images.unsplash.com/photo-1598103586054-c4b456cbf0ae?auto=format&fit=crop&q=80&w=1536",
    description:
      "Ergonomic gaming chair with lumbar support and adjustable armrests.",
    seller: {
      name: "Sarah Miller",
      rating: 4.9,
      responseTime: "Usually responds within 30 minutes",
    },
  },
  {
    id: 3,
    name: "MacBook Pro 2021",
    price: 1200,
    age: "1 year",
    condition: "Like New",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1536",
    description:
      "M1 MacBook Pro, 16GB RAM, 512GB SSD. Includes charger and protective case.",
    seller: {
      name: "Mike Chen",
      rating: 5.0,
      responseTime: "Usually responds within 2 hours",
    },
  },
  {
    id: 4,
    name: "Single Bed Frame",
    price: 90,
    age: "2 years",
    condition: "Good",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1536",
    description: "Solid wood bed frame with under-bed storage space.",
    seller: {
      name: "Emma Wilson",
      rating: 4.7,
      responseTime: "Usually responds within 1 hour",
    },
  },
  {
    id: 5,
    name: "Dell Monitor",
    price: 150,
    age: "6 months",
    condition: "Excellent",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1536",
    description: "27-inch 4K Dell Monitor. Perfect for work or gaming.",
    seller: {
      name: "David Park",
      rating: 4.9,
      responseTime: "Usually responds within 45 minutes",
    },
  },
  {
    id: 6,
    name: "Bookshelf",
    price: 65,
    age: "1 year",
    condition: "Very Good",
    image:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=1536",
    description: "5-tier bookshelf, easy to assemble and move.",
    seller: {
      name: "Lisa Thompson",
      rating: 4.8,
      responseTime: "Usually responds within 2 hours",
    },
  },
];

const ItemCard = ({ item, onClick }) => (
  <div
    onClick={() => onClick(item)}
    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-xl cursor-pointer"
  >
    <img
      src={item.image}
      alt={item.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
        <p className="text-lg font-bold text-blue-600">${item.price}</p>
      </div>
      <p className="text-sm text-gray-600 mb-2">Age: {item.age}</p>
      <p className="text-sm text-gray-600">Condition: {item.condition}</p>
    </div>
  </div>
);

const ItemModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
              <p className="text-lg text-blue-600 font-semibold">
                ${item.price}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Age: {item.age}</p>
              <p className="text-sm text-gray-600">
                Condition: {item.condition}
              </p>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{item.description}</p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Seller Information</h3>
            <div className="flex items-center mb-2">
              <p className="text-gray-700">{item.seller.name}</p>
              <div className="flex items-center ml-4">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-600">
                  {item.seller.rating}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600">{item.seller.responseTime}</p>
          </div>

          <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition flex items-center justify-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Chat with Seller</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Marketplace() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("all");

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCondition =
      selectedCondition === "all" ||
      item.condition.toLowerCase() === selectedCondition.toLowerCase();
    return matchesSearch && matchesCondition;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            Campus Marketplace
          </h1>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-48 appearance-none bg-white"
              >
                <option value="all">All Conditions</option>
                <option value="excellent">Excellent</option>
                <option value="very good">Very Good</option>
                <option value="good">Good</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} onClick={setSelectedItem} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No items found matching your criteria.
            </p>
          </div>
        )}

        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      </div>
    </div>
  );
}
