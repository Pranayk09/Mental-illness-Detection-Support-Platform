import React from "react";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";

const PricingCard = ({ plan }) => {
  return (
    <div
      className={`relative bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 ${
        plan.popular ? "border-2 border-purple-600" : ""
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-sm px-4 py-1 rounded-full flex items-center">
          <Star size={14} className="mr-1" /> Most Popular
        </div>
      )}

      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">{plan.name}</h3>
        <p className="mt-2 text-4xl font-bold">
          {plan.price}
          <span className="text-gray-500 text-base">/{plan.period}</span>
        </p>
        <p className="text-gray-600 mt-3">{plan.description}</p>
      </div>

      <Link to={plan.name === "Free" ? "/assessment" : "/pricing"}>
        <button
          className={`w-full py-2 px-4 rounded-md font-medium mt-4 ${
            plan.name === "Premium"
              ? "bg-purple-600 text-white"
              : "border border-gray-400 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {plan.buttonText}
        </button>
      </Link>

      <div className="mt-6 space-y-2 text-left">
        {plan.features.map((feature, i) => (
          <div key={i} className="flex items-start space-x-2">
            <Check size={18} className="text-green-600 mt-0.5" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {plan.notIncluded.length > 0 && (
        <>
          <div className="border-t border-gray-300 my-4" />
          <h4 className="text-sm text-gray-500 font-semibold mb-2">
            Not Included
          </h4>
          {plan.notIncluded.map((feature, i) => (
            <div key={i} className="flex items-start space-x-2 text-gray-400">
              <div className="h-1 w-3 bg-gray-400 rounded mt-2"></div>
              <span>{feature}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PricingCard;
