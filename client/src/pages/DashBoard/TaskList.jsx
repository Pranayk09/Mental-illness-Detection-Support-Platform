import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Sparkles,
  Heart,
  Brain,
  Leaf,
  Smile,
  Activity,
  Sun,
  Coffee,
  Check
} from "lucide-react";

export default function TaskList({ day, tasks = [], completed = [], toggleTask }) {
  // Map icons dynamically based on task text or index
  const getTaskMeta = (taskText, index) => {
    const textLower = (taskText || "").toLowerCase();
    if (textLower.includes("breath") || textLower.includes("wind") || textLower.includes("sleep")) {
      return { icon: Leaf, category: "Breathing & Relaxation", color: "text-emerald-600", bg: "bg-emerald-100/60" };
    }
    if (textLower.includes("mind") || textLower.includes("meditat") || textLower.includes("thought")) {
      return { icon: Brain, category: "Cognitive Mindfulness", color: "text-indigo-600", bg: "bg-indigo-100/60" };
    }
    if (textLower.includes("feel") || textLower.includes("emotion") || textLower.includes("heart")) {
      return { icon: Heart, category: "Emotional Health", color: "text-rose-600", bg: "bg-rose-100/60" };
    }
    if (textLower.includes("activ") || textLower.includes("walk") || textLower.includes("physic")) {
      return { icon: Activity, category: "Physical Wellness", color: "text-teal-600", bg: "bg-teal-100/60" };
    }
    if (textLower.includes("sun") || textLower.includes("morning") || textLower.includes("day")) {
      return { icon: Sun, category: "Daily Routine", color: "text-amber-600", bg: "bg-amber-100/60" };
    }
    
    // Fallback list by index
    const fallbacks = [
      { icon: Leaf, category: "Mindful Practice", color: "text-emerald-600", bg: "bg-emerald-100/60" },
      { icon: Brain, category: "Cognitive Exercise", color: "text-indigo-600", bg: "bg-indigo-100/60" },
      { icon: Heart, category: "Self Care Habit", color: "text-rose-600", bg: "bg-rose-100/60" },
      { icon: Smile, category: "Mood Enhancement", color: "text-amber-600", bg: "bg-amber-100/60" },
      { icon: Coffee, category: "Daily Reflection", color: "text-teal-600", bg: "bg-teal-100/60" },
    ];
    return fallbacks[index % fallbacks.length];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-teal-900/5 rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
              Day {day || 1} Program
            </span>
            <h3 className="text-xl font-bold text-slate-800">Daily Wellness Tasks</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Complete today's exercises to maintain mental balance and earn your streak.
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200/60 px-3.5 py-1.5 rounded-2xl shrink-0">
          {completed.length} of {tasks.length} Done
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="py-12 text-center text-slate-500">
          <Sparkles className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-60" />
          <p className="text-sm font-medium">No tasks assigned for today yet.</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3.5"
        >
          {tasks.map((task, index) => {
            const isDone = completed.includes(task);
            const meta = getTaskMeta(task, index);
            const TaskIcon = meta.icon;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileTap={{ scale: 0.99 }}
                onClick={() => toggleTask(task)}
                className={`relative flex items-center justify-between p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isDone
                    ? "bg-emerald-50/70 border-emerald-300/80 shadow-xs"
                    : "bg-white border-slate-200/80 hover:border-emerald-300 hover:bg-slate-50/60 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Left Green Accent Bar for completed */}
                {isDone && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-emerald-500 rounded-r-full" />
                )}

                <div className="flex items-center gap-3.5 pl-1.5 flex-1 min-w-0 pr-4">
                  {/* Task Category Icon */}
                  <div className={`p-2.5 rounded-xl ${meta.bg} shrink-0`}>
                    <TaskIcon className={`w-5 h-5 ${meta.color}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                      {meta.category}
                    </span>
                    <h4
                      className={`text-sm sm:text-base font-semibold transition-colors truncate ${
                        isDone
                          ? "line-through text-emerald-800/80"
                          : "text-slate-800 group-hover:text-emerald-700"
                      }`}
                    >
                      {task}
                    </h4>
                  </div>
                </div>

                {/* Right Animated Checkbox */}
                <div className="shrink-0 flex items-center gap-2">
                  {isDone ? (
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/90 px-2.5 py-1 rounded-full border border-emerald-200">
                      <Sparkles className="w-3 h-3 text-emerald-600" /> Completed
                    </span>
                  ) : null}

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                      isDone
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                        : "bg-slate-100 border border-slate-300 text-slate-400 hover:border-emerald-500 hover:text-emerald-500"
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : <Circle className="w-4 h-4" />}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
