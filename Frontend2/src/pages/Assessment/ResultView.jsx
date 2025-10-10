import React from "react";
import { Link } from "react-router-dom";

export const ResultView = ({ result }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 py-12">
      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full mb-4 text-sm font-medium">
        Assessment Complete
      </span>

      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Your Assessment Result
      </h1>

      <pre className="bg-gray-100 p-6 rounded-lg max-w-xl w-full text-sm text-gray-700 shadow-inner overflow-auto">
        {JSON.stringify(result, null, 2)}
      </pre>

      <Link
        to="/assessment"
        className="mt-6 inline-block bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Take Assessment Again
      </Link>
    </div>
  );
};
