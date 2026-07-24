import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Flame, TrendingUp, Sparkles } from "lucide-react";

export default function ProgressBar({ day, totalDays = 10, completed = 0, totalTasks = 0 }) {
  const currentDayNum = day || 1;
  const safeTotalTasks = totalTasks > 0 ? totalTasks : 1;
  const percentage = Math.min(100, Math.round((completed / safeTotalTasks) * 100));

  // Encouraging messaging based on completion rate
  const getEncouragingMessage = () => {
    if (completed === 0) return "Ready to start your daily wellness reflection?";
    if (percentage < 50) return "Great start! Take it one gentle step at a time.";
    if (percentage < 100) return "Awesome effort! You're almost done with today's activities.";
    return "🎉 Outstanding job! You've completed all tasks for today!";
  };

  const stats = [
    {
      id: "tasks",
      title: "Completed Tasks",
      value: `${completed} / ${totalTasks}`,
      label: "Daily Tasks Done",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
    },
    {
      id: "day",
      title: "Program Day",
      value: `Day ${currentDayNum}`,
      label: `of ${totalDays} Days Journey`,
      icon: Calendar,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-100",
    },
    {
      id: "streak",
      title: "Active Streak",
      value: `${currentDayNum} Days`,
      label: "Consistency Track",
      icon: Flame,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
    },
    {
      id: "rate",
      title: "Completion Rate",
      value: `${percentage}%`,
      label: "Today's Score",
      icon: TrendingUp,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100",
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Horizontal Progress Tracker Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-teal-900/5 rounded-3xl p-6 sm:p-7 space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" /> Daily Progress Tracker
            </h3>
            <p className="text-xs text-slate-500">Track your daily wellness tasks completion</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
              {completed} of {totalTasks} Tasks Completed
            </span>
            <span className="text-sm font-extrabold text-emerald-600 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200/60">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Modern Animated Gradient Progress Bar */}
        <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 rounded-full shadow-sm shadow-emerald-500/30"
          />
        </div>

        {/* Encouraging Footer Message */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <p className="text-slate-600 font-medium italic flex items-center gap-1.5">
            {getEncouragingMessage()}
          </p>
          <span className="text-slate-400 font-semibold text-[11px] shrink-0">
            Day {currentDayNum} Progress
          </span>
        </div>
      </motion.div>

      {/* Modern Statistic Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-md shadow-teal-900/5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500">{stat.title}</span>
                <div className={`p-2 rounded-xl ${stat.bgColor} ${stat.borderColor} border group-hover:scale-110 transition-transform`}>
                  <IconComponent className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight mb-0.5">
                  {stat.value}
                </div>
                <div className="text-[11px] font-medium text-slate-400">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
