import React from "react";
import { motion } from "framer-motion";

export const ProgressHeader = ({ progress, step, total, category }) => {
  return (
    <div className="text-center mb-8">
      {category && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          key={category}
          className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-gradient-to-r from-emerald-100/80 via-teal-100/60 to-indigo-100/80 text-indigo-900 border border-indigo-200/50 shadow-xs mb-3"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
          {category}
        </motion.div>
      )}

      <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
        Mental Wellness Evaluation
      </h1>
      <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
        Your honest answers help us tailor a calming, evidence-backed guidance plan.
      </p>

      {/* Animated progress bar */}
      <div className="mt-6 w-full max-w-lg mx-auto bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/60 shadow-sm">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-2">
          <span className="text-slate-500">Assessment Completion</span>
          <span className="text-emerald-700 font-bold">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-500 shadow-xs"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium">
          <span>Question {step} of {total}</span>
          <span>{total - step} remaining</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;
