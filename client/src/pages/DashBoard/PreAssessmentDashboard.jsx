import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  ClipboardCheck,
  Clock,
  ShieldCheck,
  ArrowRight,
  Heart,
  CheckCircle2,
  BookOpen,
  Wind,
  PhoneCall,
  TrendingUp,
  Brain,
  Activity,
  Smile,
  Play
} from "lucide-react";

export const PreAssessmentDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [breathingStep, setBreathingStep] = useState(0); // 0: Idle, 1: Inhale, 2: Hold, 3: Exhale, 4: Rest
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  const startBreathingCycle = () => {
    setIsBreathingActive(true);
    setBreathingStep(1); // Inhale
    setTimeout(() => setBreathingStep(2), 4000); // Hold
    setTimeout(() => setBreathingStep(3), 8000); // Exhale
    setTimeout(() => setBreathingStep(4), 12000); // Rest
    setTimeout(() => setIsBreathingActive(false), 16000); // Reset
  };

  const getBreathingText = () => {
    switch (breathingStep) {
      case 1: return "Inhale slowly through your nose (4s)... 🌿";
      case 2: return "Hold your breath calmly (4s)... 🧘";
      case 3: return "Exhale smoothly through your mouth (4s)... 🌬️";
      case 4: return "Rest and feel the peaceful calm... ✨";
      default: return "Click to start 1-Minute Calming Box Breathing";
    }
  };

  return (
    <div className="space-y-10 pb-12">
      
      {/* 🌟 HERO WELCOME BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white rounded-3xl p-8 sm:p-10 shadow-2xl shadow-emerald-900/10 border border-white/20">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-emerald-100 text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Welcome to Nirvanic Wellness Platform
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Hello, <span className="text-amber-300">{user?.name || "Friend"}</span>! 👋
          </h1>

          <p className="text-emerald-100 text-sm sm:text-base font-medium leading-relaxed">
            Your mental wellness journey begins with understanding yourself. Complete your initial clinical assessment to unlock your personalized 10-day recovery plan and tailored daily wellness activities.
          </p>
        </div>
      </section>

      {/* 🎯 PRIMARY CALL TO ACTION CARD (ASSESSMENT HERO) */}
      <section className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-emerald-200/80 shadow-xl shadow-teal-900/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-full pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold flex items-center gap-1.5">
                <ClipboardCheck className="w-3.5 h-3.5" /> Clinical DASS-21 Standard
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" /> Takes 5–10 Minutes
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" /> 100% Confidential & Secure
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              Start Your Initial Mental Health Assessment
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Answer 21 simple, scientifically validated questions regarding depression, anxiety, and stress levels. Our intelligent system will generate your personalized wellness score and custom daily plan.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Personalized Mental Health Report
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Custom 10-Day Recovery Roadmap
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Daily Tailored CBT Activities
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Progress Analytics & Mood Tracking
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => navigate("/assessment")}
                className="w-full sm:w-auto py-4 px-8 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.02] cursor-pointer"
              >
                Start Assessment Now <ArrowRight className="w-5 h-5" />
              </button>

              <span className="text-[11px] text-slate-400 font-semibold italic text-center sm:text-left">
                🔒 Safe & secure. Designed to support, not diagnose.
              </span>
            </div>
          </div>

          {/* Calming Decorative Visual */}
          <div className="hidden lg:flex flex-col items-center justify-center p-6 bg-gradient-to-br from-emerald-500/10 to-indigo-500/10 rounded-3xl border border-emerald-100 space-y-4 text-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/20">
              <Brain className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-slate-800">Mindscape Assessment</h4>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Empowering your emotional self-awareness step by step.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 📍 "HOW IT WORKS" TIMELINE */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
            Your Wellness Roadmap
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">How Nirvanic Platform Works</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <div className="bg-white/80 rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3 relative">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center text-xs">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-800">Create Account</h3>
            <p className="text-xs text-slate-500">Sign up and join the Nirvanic wellness community.</p>
            <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              ✓ Completed
            </span>
          </div>

          <div className="bg-white/80 rounded-2xl p-5 border-2 border-emerald-500 shadow-md space-y-3 relative ring-4 ring-emerald-100">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xs shadow-md">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900">Take Assessment</h3>
            <p className="text-xs text-slate-600 font-medium">Answer 21 short questions on emotional wellness.</p>
            <span className="inline-block text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md animate-pulse">
              Current Step
            </span>
          </div>

          <div className="bg-white/80 rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 font-extrabold flex items-center justify-center text-xs">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-800">Personalized Results</h3>
            <p className="text-xs text-slate-500">Receive your score breakdown and clinical insights.</p>
          </div>

          <div className="bg-white/80 rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 font-extrabold flex items-center justify-center text-xs">
              4
            </div>
            <h3 className="text-sm font-bold text-slate-800">10-Day Activity Plan</h3>
            <p className="text-xs text-slate-500">Follow structured daily tasks tailored to your needs.</p>
          </div>

          <div className="bg-white/80 rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 font-extrabold flex items-center justify-center text-xs">
              5
            </div>
            <h3 className="text-sm font-bold text-slate-800">Track Progress</h3>
            <p className="text-xs text-slate-500">Monitor mood improvement and complete daily streaks.</p>
          </div>

        </div>
      </section>

      {/* 💡 BENEFITS & FEATURES SHOWCASE */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Why Take Assessment */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-700">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Why Take the Assessment?</h3>
              <p className="text-xs text-slate-500 font-medium">Benefits designed for your personal growth</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-800">Identify Stress & Anxiety Levels</h4>
                <p className="text-xs text-slate-500">Gain clear clarity on emotional triggers affecting your mood.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-800">Customized Daily Activity Schedule</h4>
                <p className="text-xs text-slate-500">Receive 3 tailored daily tasks targeted to your condition.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-800">Access Targeted Educational Content</h4>
                <p className="text-xs text-slate-500">Read relevant CBT guides and watch expert video resources.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calming Box Breathing Widget */}
        <div className="bg-gradient-to-br from-teal-500 via-emerald-600 to-indigo-600 text-white rounded-3xl p-8 shadow-xl shadow-teal-900/10 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            {/* <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-xs font-bold">
              <Wind className="w-3.5 h-3.5 text-amber-300" /> Interactive Calming Feature
            </div> */}
            <h3 className="text-xl font-extrabold">1-Minute Box Breathing Protocol</h3>
            <p className="text-xs text-emerald-100">
              Release immediate physical tension and steady your nervous system.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center space-y-4">
            <p className="text-sm font-bold text-amber-300 transition-all min-h-[40px] flex items-center justify-center">
              {getBreathingText()}
            </p>

            <button
              onClick={startBreathingCycle}
              disabled={isBreathingActive}
              className="py-2.5 px-6 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isBreathingActive ? "Breathing in progress..." : "Start 16s Breathing Cycle"}
            </button>
          </div>

          <div className="text-[11px] text-emerald-100 italic text-center">
            "Peace comes from within. Do not seek it without." — Buddha
          </div>
        </div>

      </section>

    </div>
  );
};

export default PreAssessmentDashboard;
