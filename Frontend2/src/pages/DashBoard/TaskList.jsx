import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

export default function TaskList({ tasks, completed, toggleTask }) {
  return (
    <div className="w-full max-w-lg bg-white shadow-md rounded-2xl p-8 min-h-[500px] flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-semibold mb-3 text-gray-800">Day 1 Tasks</h3>
        <p className="text-sm text-gray-500 mb-5">
          Complete the tasks below to improve your well-being.
        </p>

        <div className="space-y-4">
          {tasks.map((task, index) => (
            <motion.div
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                completed.includes(task)
                  ? "bg-green-50 border border-green-400"
                  : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
              }`}
              onClick={() => toggleTask(task)}
              whileTap={{ scale: 0.97 }}
            >
              <span
                className={`text-base ${
                  completed.includes(task)
                    ? "line-through text-green-700"
                    : "text-gray-700"
                }`}
              >
                {task}
              </span>
              {completed.includes(task) ? (
                <CheckCircle2 className="text-green-600" />
              ) : (
                <Circle className="text-gray-400" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
