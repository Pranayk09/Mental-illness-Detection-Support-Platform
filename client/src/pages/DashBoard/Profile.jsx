import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Flame, Heart, Sun, Moon, Sunrise, ShieldCheck, User } from "lucide-react";

export default function Profile({ profile, user }) {
  const p = profile || user || {};
  const defaultImage = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  const userImage = p.image || defaultImage;

  // Time-based greeting calculation
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good Morning", icon: Sunrise, color: "text-amber-500" };
    if (hour < 18) return { text: "Good Afternoon", icon: Sun, color: "text-orange-500" };
    return { text: "Good Evening", icon: Moon, color: "text-indigo-400" };
  };

  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;

  const quotes = [
    "Small daily steps build lasting peace of mind.",
    "Your mental health is a priority, not an option.",
    "Peace comes from within. Nurture yourself today.",
    "Every day is a fresh beginning for emotional clarity.",
    "Be patient with yourself; healing takes time.",
  ];

  // Pick quote based on current day or date
  const dayIndex = (p.currentDay || 1) % quotes.length;
  const quoteOfDay = quotes[dayIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-teal-900/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden"
    >
      {/* Decorative gradient blur background elements */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-emerald-200/40 via-teal-200/30 to-indigo-200/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-tr from-indigo-200/30 via-purple-200/20 to-teal-200/30 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar with status ring */}
        <div className="relative shrink-0">
          <motion.img
            src={userImage}
            alt="Profile Avatar"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-md object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Hero Details */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/60 text-slate-700 text-xs font-semibold">
              <GreetingIcon className={`w-3.5 h-3.5 ${greeting.color}`} />
              {greeting.text}
            </span>

            {p.condition && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-bold shadow-2xs">
                <Heart className="w-3 h-3 text-emerald-500" />
                Condition: {p.condition}
              </span>
            )}

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              Day {p.currentDay || 1} Streak
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600">{p.name || "Wellness Member"}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl italic">
            "{quoteOfDay}"
          </p>

          <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-medium text-slate-600">
            {p.gender && (
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {p.gender}{p.age ? `, ${p.age} yrs` : ""}
              </span>
            )}
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              10-Day Wellness Journey
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
