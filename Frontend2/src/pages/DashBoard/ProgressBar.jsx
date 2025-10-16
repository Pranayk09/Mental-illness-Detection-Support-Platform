import { motion } from "framer-motion";

export default function ProgressBar({ day, totalDays, completed, totalTasks }) {
  const progress = (completed / totalTasks) * 100;

  return (
    <div className="flex flex-col items-center mt-10">
      <motion.div
        className="relative w-36 h-36 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-200 to-indigo-400 shadow-md"
        initial={{ rotate: 0 }}
        animate={{ rotate: progress * 3.6 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
          <p className="text-sm text-gray-500">
            Day {day}/{totalDays}
          </p>
          <p className="text-xl font-semibold text-indigo-600">
            {completed}/{totalTasks}
          </p>
          <p className="text-xs text-gray-500">Tasks Done</p>
        </div>
      </motion.div>
    </div>
  );
}
