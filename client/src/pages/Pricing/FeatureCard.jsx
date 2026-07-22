import React from "react";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
      <Icon className="text-purple-600" size={24} />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FeatureCard;
