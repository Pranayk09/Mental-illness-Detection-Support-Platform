import { motion } from "framer-motion";

export default function Profile({ profile }) {
  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center transition-transform duration-300 hover:scale-[1.01]">
      <motion.img
        src={profile.image}
        alt="Profile"
        className="w-28 h-28 rounded-full border-4 border-indigo-300 mb-4"
        whileHover={{ scale: 1.05 }}
      />
      <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
      <p className="text-gray-600 text-base mt-1">
        {profile.gender}, {profile.age}
      </p>
      <span className="mt-3 px-4 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-full">
        Condition: {profile.condition}
      </span>
    </div>
  );
}
