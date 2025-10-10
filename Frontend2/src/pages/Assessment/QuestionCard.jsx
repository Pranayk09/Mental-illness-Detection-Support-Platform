import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const QuestionCard = ({
  question,
  answer,
  onAnswerChange,
  onNext,
  onPrev,
  isFirst,
  isLast,
  isAnswered,
  loading,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Question {question.id}</h2>
        <h3 className="text-lg text-gray-700">{question.text}</h3>
      </div>

      {/* Number input */}
      {question.type === "number" && (
        <input
          type="number"
          min={0}
          value={answer ?? ""}
          onChange={(e) => onAnswerChange(Number(e.target.value))}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
      )}

      {/* Select input */}
      {question.type === "select" && (
        <select
          value={answer ?? ""}
          onChange={(e) => onAnswerChange(Number(e.target.value))}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
        >
          <option value="">Select an option</option>
          {question.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {/* Radio input */}
      {question.type === "radio" && (
        <div className="space-y-3 mt-4">
          {question.options?.map((opt) => (
            <label
              key={opt.value}
              htmlFor={`${question.id}-${opt.value}`}
              className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition ${
                answer === opt.value ? "border-green-400 bg-green-50" : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                id={`${question.id}-${opt.value}`}
                name={`question-${question.id}`}
                value={opt.value}
                checked={answer === opt.value}
                onChange={() => onAnswerChange(opt.value)}
                className="accent-green-500"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className={`flex items-center px-5 py-2 rounded-lg border transition ${
            isFirst
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "border-gray-300 hover:bg-gray-100 text-gray-700"
          }`}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </button>

        <button
          onClick={onNext}
          disabled={!isAnswered}
          className={`flex items-center px-5 py-2 rounded-lg text-white transition ${
            !isAnswered
              ? " bg-purple-400 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition cursor-not-allowed"
              : " bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition"
          }`}
        >
          {isLast ? (loading ? "Submitting..." : "Finish") : "Next"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
