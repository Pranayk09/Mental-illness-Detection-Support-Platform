import React from "react";

export const ProgressHeader = ({ progress, step, total }) => {
  return (
    <div className="text-center mb-8">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Assessment</h1>

      {/* Progress bar */}
      <div className="mt-4 w-full max-w-md mx-auto">
        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
          <div
            className="bg-purple-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          {step} of {total}
        </div>
      </div>
    </div>
  );
};
