import React from "react";
import { Link } from "react-router-dom";

export const ResultView = ({ result,onRetake }) => {
  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-700 text-lg">
        No result available. Please complete the assessment.
      </div>
    );
  }
  const condition = result?.assessment?.result?.condition;
  const severity = result?.assessment?.result?.severity;


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 py-12">
      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full mb-4 text-sm font-medium">
        Assessment Complete
      </span>

      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        Your Assessment Result
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
        <p className="text-lg text-gray-700 mb-3">
          <span className="font-semibold text-gray-900">Condition:</span>{" "}
          <span className="text-blue-600 font-medium">{condition}</span>
        </p>

        <p className="text-lg text-gray-700">
          <span className="font-semibold text-gray-900">Severity:</span>{" "}
          <span
            className={`font-medium ${
              severity === "Severe"
                ? "text-red-600"
                : severity === "Moderate"
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            {severity}
          </span>
        </p>
      </div>

      <Link
         onClick={onRetake}
        className="mt-6 inline-block bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Take Assessment Again
      </Link>
    </div>
  );
};
