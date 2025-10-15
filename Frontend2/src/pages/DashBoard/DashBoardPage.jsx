import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  // --- Profile Info (Hardcoded for demo) ---
  const profile = {
    name: "Abhishek",
    age: 21,
    gender: "Male",
    condition: "Stress",
    image:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  };

  // --- Tasks for Day 1 (Hardcoded for now) ---
  const tasks = [
    "Practice 10 mins deep breathing",
    "Write down 3 things you’re grateful for",
    "Take a 15-min walk",
    "Listen to relaxing instrumental music"
  ];

  // --- Track completed tasks ---
  const [completed, setCompleted] = useState([]);

  const toggleTask = (task) => {
    setCompleted((prev) =>
      prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task]
    );
  };

  const progress = (completed.length / tasks.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-6">
      {/* Profile Section */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl mb-6 p-6 flex flex-col items-center transition-transform duration-300 hover:scale-[1.01]">
        <motion.img
          src={profile.image}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-indigo-300 mb-3"
          whileHover={{ scale: 1.05 }}
        />
        <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
        <p className="text-gray-600">
          {profile.gender}, {profile.age}
        </p>
        <span className="mt-2 px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full">
          Condition: {profile.condition}
        </span>
      </div>

      {/* Daily Tasks Section */}
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Day 1 Tasks</h3>
        <p className="text-sm text-gray-500 mb-4">
          Complete the tasks below to improve your well-being.
        </p>

        {/* Tasks List */}
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <motion.div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                completed.includes(task)
                  ? "bg-green-50 border border-green-400"
                  : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
              }`}
              onClick={() => toggleTask(task)}
              whileTap={{ scale: 0.97 }}
            >
              <span
                className={`text-sm ${
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

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-indigo-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center text-sm mt-2 text-gray-600">
            Progress: {completed.length}/{tasks.length} tasks done (
            {Math.round(progress)}%)
          </p>
        </div>
      </div>
    </div>
  );
}
