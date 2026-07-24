import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Award,
  Smile,
  Lightbulb,
  Heart,
  TrendingUp,
  ChevronRight,
  CheckCircle2
} from "lucide-react";

// Celebratory Achievement Banner
export const CelebratoryBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-600/20 relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 border border-emerald-400/30"
    >
      {/* Decorative background sparkles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-4 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-amber-300 shrink-0 shadow-lg">
          <Award className="w-9 h-9" />
        </div>

        <div className="space-y-1">
          {/* <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-emerald-100 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> All Tasks Completed Today!
          </div> */}
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Outstanding Work on Your Mind!
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 font-medium max-w-md">
            You've completed every mental wellness activity assigned for today. Take a moment to feel proud of your commitment to inner peace.
          </p>
        </div>
      </div>

      <div className="relative z-10 shrink-0">
        <div className="px-5 py-2.5 rounded-2xl bg-white text-emerald-800 font-extrabold text-xs sm:text-sm shadow-md hover:bg-emerald-50 transition-colors flex items-center gap-1.5 cursor-default">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Day Complete
        </div>
      </div>
    </motion.div>
  );
};

// Interactive Mood Check-in Card (Frontend State)
export const MoodCheckIn = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { id: "great", emoji: "😄", label: "Great", color: "hover:bg-emerald-50 text-emerald-700 border-emerald-200" },
    { id: "calm", emoji: "🙂", label: "Calm", color: "hover:bg-teal-50 text-teal-700 border-teal-200" },
    { id: "okay", emoji: "😐", label: "Okay", color: "hover:bg-sky-50 text-sky-700 border-sky-200" },
    { id: "low", emoji: "😔", label: "Low", color: "hover:bg-indigo-50 text-indigo-700 border-indigo-200" },
    { id: "stressed", emoji: "😤", label: "Stressed", color: "hover:bg-rose-50 text-rose-700 border-rose-200" },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-teal-900/5 rounded-3xl p-6 sm:p-7 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Smile className="w-5 h-5 text-teal-600" /> How are you feeling right now?
          </h3>
          <p className="text-xs text-slate-500">Check in with your emotions today</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {moods.map((m) => {
          const isSelected = selectedMood === m.id;
          return (
            <motion.button
              key={m.id}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(m.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-emerald-100/80 border-emerald-400 shadow-md ring-2 ring-emerald-300"
                  : `bg-slate-50/70 border-slate-200/80 ${m.color}`
              }`}
            >
              <span className="text-2xl sm:text-3xl mb-1">{m.emoji}</span>
              <span className="text-[11px] font-bold">{m.label}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-xs text-emerald-800 font-medium flex items-center gap-2"
          >
            <Heart className="w-4 h-4 text-emerald-600 shrink-0" />
            Thank you for checking in with yourself. Taking notice of your feelings is the first step to emotional wellness.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Weekly Wellness Progress Chart (Animated Bar Chart)
export const WeeklyProgressChart = ({ currentDay = 1 }) => {
  const daysData = [
    { day: "Mon", score: 80, active: currentDay >= 1 },
    { day: "Tue", score: 100, active: currentDay >= 2 },
    { day: "Wed", score: 60, active: currentDay >= 3 },
    { day: "Thu", score: 90, active: currentDay >= 4 },
    { day: "Fri", score: 75, active: currentDay >= 5 },
    { day: "Sat", score: 50, active: currentDay >= 6 },
    { day: "Sun", score: 85, active: currentDay >= 7 },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-teal-900/5 rounded-3xl p-6 sm:p-7 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" /> Weekly Wellness Progress
          </h3>
          <p className="text-xs text-slate-500">Overview of your activity completion rate</p>
        </div>
        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          7-Day Trend
        </span>
      </div>

      <div className="h-44 pt-6 pb-2 flex items-end justify-between gap-2 px-2">
        {daysData.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
            {/* Tooltip on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 shadow-xs mb-1">
              {item.score}%
            </div>

            {/* Animated Bar */}
            <div className="w-full bg-slate-100 rounded-t-xl h-full flex items-end overflow-hidden border border-slate-200/60 p-0.5">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${item.score}%` }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                className={`w-full rounded-t-lg transition-colors ${
                  item.active
                    ? "bg-gradient-to-t from-emerald-500 via-teal-500 to-indigo-500 group-hover:from-emerald-600 group-hover:to-indigo-600"
                    : "bg-slate-300"
                }`}
              />
            </div>

            <span className="text-[11px] font-bold text-slate-500">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Daily Wellness Tip Card
export const DailyWellnessTip = ({ currentDay = 1 }) => {
  const tips = [
    {
      title: "Practice 4-7-8 Breathing",
      text: "Inhale quietly through your nose for 4 seconds, hold your breath for 7 seconds, and exhale completely through your mouth for 8 seconds.",
    },
    {
      title: "Take a 5-Minute Mindful Walk",
      text: "Step outside or walk around your room slowly. Notice the physical sensation of your feet touching the ground.",
    },
    {
      title: "Hydrate Your Body & Mind",
      text: "Drinking a glass of fresh water in the morning boosts cognitive clarity and reduces fatigue.",
    },
    {
      title: "Unplug Before Sleep",
      text: "Turn off screens 30 minutes before bedtime to allow your brain to synthesize melatonin naturally.",
    },
    {
      title: "Express Daily Gratitude",
      text: "Write down 3 things you feel thankful for today. Gratitude rewires neural pathways toward optimism.",
    },
  ];

  const currentTip = tips[(currentDay - 1) % tips.length];

  return (
    <div className="bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-teal-50/60 border border-amber-200/60 shadow-xl shadow-teal-900/5 rounded-3xl p-6 sm:p-7 space-y-3 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
            <Lightbulb className="w-5 h-5" />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
            Daily Wellness Tip
          </span>
        </div>
        <span className="text-xs font-bold text-amber-700">Tip #{((currentDay - 1) % tips.length) + 1}</span>
      </div>

      <h4 className="text-base sm:text-lg font-bold text-slate-800">{currentTip.title}</h4>
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
        {currentTip.text}
      </p>
    </div>
  );
};
