import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

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
  // Handle "Enter" key to submit / go next
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && isAnswered) {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isAnswered, onNext]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.25 }}
        className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 p-6 sm:p-10 border border-emerald-100/60"
      >
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Question {question.id}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 leading-relaxed">
            {question.text}
          </h2>
        </div>

        {/* Number Input */}
        {question.type === "number" && (
          <div className="max-w-xs mx-auto my-6">
            <label className="block text-xs font-medium text-slate-500 mb-2 text-center">
              Please enter your age in years:
            </label>
            <input
              type="number"
              min={1}
              max={120}
              placeholder="e.g. 25"
              value={answer ?? ""}
              onChange={(e) => onAnswerChange(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full p-4 text-center text-xl font-semibold text-slate-800 bg-slate-50 rounded-2xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none shadow-inner transition-all"
            />
          </div>
        )}

        {/* Custom Select */}
        {question.type === "select" && (
          <div className="max-w-md mx-auto my-6">
            <div className="relative">
              <select
                value={answer ?? ""}
                onChange={(e) => onAnswerChange(Number(e.target.value))}
                className="w-full p-4 bg-slate-50 text-slate-800 font-medium rounded-2xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none shadow-sm transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled>Select option...</option>
                {question.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Large Tactile Option Cards */}
        {question.type === "radio" && (
          <div className="grid grid-cols-1 gap-3.5 mt-6">
            {question.options?.map((opt) => {
              const isSelected = answer === opt.value;
              return (
                <motion.button
                  type="button"
                  key={opt.value}
                  whileHover={{ scale: 1.012 }}
                  whileTap={{ scale: 0.988 }}
                  onClick={() => onAnswerChange(opt.value)}
                  className={`group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-emerald-50 to-teal-50/80 border-emerald-500 shadow-md ring-2 ring-emerald-500/20 text-emerald-950 font-semibold"
                      : "bg-slate-50/70 hover:bg-slate-100/80 border-slate-200/80 text-slate-700 font-medium hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                        isSelected
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-slate-300 bg-white group-hover:border-emerald-400"
                      }`}
                    >
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-emerald-400 transition-colors" />
                      )}
                    </div>
                    <span className="text-base sm:text-lg">{opt.label}</span>
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="hidden sm:block text-xs text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full font-bold"
                    >
                      Selected
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={onPrev}
            disabled={isFirst}
            className={`flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isFirst
                ? "opacity-0 pointer-events-none"
                : "text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200/80"
            }`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!isAnswered || loading}
            className={`flex items-center px-7 py-3 rounded-xl text-sm font-bold text-white shadow-lg transition-all transform ${
              !isAnswered || loading
                ? "bg-slate-300 shadow-none cursor-not-allowed text-slate-500 opacity-60"
                : "bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 shadow-emerald-500/25 active:scale-98"
            }`}
          >
            {isLast ? (loading ? "Evaluating..." : "Finish Assessment") : "Continue"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuestionCard;
