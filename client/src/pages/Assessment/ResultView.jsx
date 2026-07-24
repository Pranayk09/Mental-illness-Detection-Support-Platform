import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Heart,
  Brain,
  Activity,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  BookOpen,
  PhoneCall,
  RotateCcw,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export const ResultView = ({ result, onRetake }) => {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState("rec-1");

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700 text-lg">
        No result available. Please complete the assessment.
      </div>
    );
  }

  const condition = result?.assessment?.result?.condition || result?.condition || "Mindful Balance";
  const severity = result?.assessment?.result?.severity || result?.severity || "Normal";
  const rawAnswers = result?.answers || [];

  // DASS-21 subscale calculations (items index 6..12 Stress, 13..19 Anxiety, 20..26 Depression)
  let stressScore = 0;
  let anxietyScore = 0;
  let depressionScore = 0;

  if (rawAnswers.length >= 27) {
    stressScore = rawAnswers.slice(6, 13).reduce((a, b) => a + Number(b), 0);
    anxietyScore = rawAnswers.slice(13, 20).reduce((a, b) => a + Number(b), 0);
    depressionScore = rawAnswers.slice(20, 27).reduce((a, b) => a + Number(b), 0);
  } else {
    const sevMultiplier = severity === "Extremely Severe" ? 18 : severity === "Severe" ? 14 : severity === "Moderate" ? 9 : severity === "Mild" ? 6 : 3;
    stressScore = condition === "Stress" ? Math.min(21, sevMultiplier + 2) : 4;
    anxietyScore = condition === "Anxiety" ? Math.min(21, sevMultiplier + 2) : 3;
    depressionScore = condition === "Depression" ? Math.min(21, sevMultiplier + 2) : 4;
  }

  const stressPct = Math.round((stressScore / 21) * 100);
  const anxietyPct = Math.round((anxietyScore / 21) * 100);
  const depressionPct = Math.round((depressionScore / 21) * 100);

  const getSeverityBadge = (level) => {
    switch (level) {
      case "Normal":
        return {
          label: "Normal / Well-Balanced",
          bg: "bg-emerald-100/90 text-emerald-900 border-emerald-300",
        };
      case "Mild":
        return {
          label: "Mild Sensitivity",
          bg: "bg-teal-100/90 text-teal-900 border-teal-300",
        };
      case "Moderate":
        return {
          label: "Moderate Attention Recommended",
          bg: "bg-amber-100/90 text-amber-900 border-amber-300",
        };
      case "Severe":
        return {
          label: "Elevated Care Recommended",
          bg: "bg-indigo-100/90 text-indigo-950 border-indigo-300",
        };
      case "Extremely Severe":
        return {
          label: "High Priority Support Recommended",
          bg: "bg-purple-100/90 text-purple-950 border-purple-300",
        };
      default:
        return {
          label: level || "Evaluated",
          bg: "bg-slate-100 text-slate-800 border-slate-300",
        };
    }
  };

  const badgeInfo = getSeverityBadge(severity);

  const recommendations = [
    {
      id: "rec-1",
      title: "Daily Mindfulness & Breathing Spans",
      icon: Activity,
      tag: "Self-Regulation",
      desc: "Engage in 5-10 minutes of structured deep breathing twice daily to lower physiological arousal and steady heart rate variability.",
      details: "Practice 4-7-8 breathing: Inhale quietly through your nose for 4s, hold your breath for 7s, and exhale audibly through your mouth for 8s.",
    },
    {
      id: "rec-2",
      title: "Cognitive Grounding & Thought De-Escalation",
      icon: Brain,
      tag: "Cognitive Support",
      desc: "Use the 5-4-3-2-1 sensory grounding technique whenever you feel overwhelmed or fixated on stressful thoughts.",
      details: "Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 positive affirmation.",
    },
    {
      id: "rec-3",
      title: "Restorative Sleep Hygiene & Wind-Down",
      icon: Heart,
      tag: "Lifestyle & Sleep",
      desc: "Establish a non-negotiable 30-minute screen-free wind-down ritual before bed to enhance delta sleep phases.",
      details: "Keep ambient room temperature around 68°F (20°C), dim blue lights, and write down lingering to-do items to clear mental clutter.",
    },
  ];

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-indigo-50/70 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider bg-emerald-100/90 text-emerald-900 border border-emerald-300/80 shadow-xs mb-3"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            EVALUATION COMPLETE
          </motion.div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Your Personal Mindscape Evaluation
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto">
            A non-judgmental, clinical insight overview designed to empower your mental wellness journey.
          </p>
        </div>

        {/* Hero Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-xl shadow-slate-200/50 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Primary Mental Wellness Status</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-1 flex items-center gap-2">
                <span>{condition}</span>
              </h2>
            </div>
            
            <div className="flex flex-col items-center sm:items-end">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Evaluated Severity</span>
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold border shadow-xs ${badgeInfo.bg}`}>
                {badgeInfo.label}
              </span>
            </div>
          </div>

          <p className="text-slate-600 mt-5 text-sm sm:text-base leading-relaxed">
            Based on your responses across the DASS-21 scale and demographic factors, your profile indicates a primary tendency toward{" "}
            <span className="font-semibold text-emerald-800">{condition}</span> with a severity classification of{" "}
            <span className="font-semibold text-slate-900">{severity}</span>. Remember: these scores reflect a point-in-time snapshot and are fully manageable with tailored self-care strategies.
          </p>
        </motion.div>

        {/* Wellness Subscale Gauges */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            DASS-21 Subscale Indices
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Stress Gauge */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-emerald-100 shadow-md text-center"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Stress Index</span>
              
              <div className="relative w-28 h-28 mx-auto my-4 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="stroke-slate-100" strokeWidth="8" fill="none" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-emerald-500"
                    strokeWidth="8"
                    strokeDasharray="251"
                    strokeDashoffset={251 - (251 * stressPct) / 100}
                    strokeLinecap="round"
                    fill="none"
                    initial={{ strokeDashoffset: 251 }}
                    animate={{ strokeDashoffset: 251 - (251 * stressPct) / 100 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xl font-extrabold text-slate-800">{stressScore} <span className="text-xs font-normal text-slate-400">/21</span></span>
                  <span className="text-xs font-semibold text-emerald-700">{stressPct}%</span>
                </div>
              </div>

              <span className="text-xs font-semibold text-slate-600">Tension & Nervous Energy</span>
            </motion.div>

            {/* Anxiety Gauge */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-emerald-100 shadow-md text-center"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Anxiety Index</span>
              
              <div className="relative w-28 h-28 mx-auto my-4 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="stroke-slate-100" strokeWidth="8" fill="none" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-teal-500"
                    strokeWidth="8"
                    strokeDasharray="251"
                    strokeDashoffset={251 - (251 * anxietyPct) / 100}
                    strokeLinecap="round"
                    fill="none"
                    initial={{ strokeDashoffset: 251 }}
                    animate={{ strokeDashoffset: 251 - (251 * anxietyPct) / 100 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xl font-extrabold text-slate-800">{anxietyScore} <span className="text-xs font-normal text-slate-400">/21</span></span>
                  <span className="text-xs font-semibold text-teal-700">{anxietyPct}%</span>
                </div>
              </div>

              <span className="text-xs font-semibold text-slate-600">Somatic & Apprehension</span>
            </motion.div>

            {/* Depression Gauge */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-emerald-100 shadow-md text-center"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Depression / Mood Index</span>
              
              <div className="relative w-28 h-28 mx-auto my-4 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="stroke-slate-100" strokeWidth="8" fill="none" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-indigo-500"
                    strokeWidth="8"
                    strokeDasharray="251"
                    strokeDashoffset={251 - (251 * depressionPct) / 100}
                    strokeLinecap="round"
                    fill="none"
                    initial={{ strokeDashoffset: 251 }}
                    animate={{ strokeDashoffset: 251 - (251 * depressionPct) / 100 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xl font-extrabold text-slate-800">{depressionScore} <span className="text-xs font-normal text-slate-400">/21</span></span>
                  <span className="text-xs font-semibold text-indigo-700">{depressionPct}%</span>
                </div>
              </div>

              <span className="text-xs font-semibold text-slate-600">Positive Affect & Valence</span>
            </motion.div>
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Recommended Wellness Actions
          </h3>

          <div className="space-y-3.5">
            {recommendations.map((rec) => {
              const isExpanded = expandedCard === rec.id;
              const IconComp = rec.icon;
              return (
                <div
                  key={rec.id}
                  className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedCard(isExpanded ? null : rec.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {rec.tag}
                        </span>
                        <h4 className="text-base font-bold text-slate-800 mt-1">{rec.title}</h4>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5 pt-1 text-sm text-slate-600 border-t border-slate-100 bg-slate-50/50"
                      >
                        <p className="mb-2 font-medium">{rec.desc}</p>
                        <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-100 text-xs text-emerald-900 font-medium">
                          <strong>Execution Tip:</strong> {rec.details}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resources & Support Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-10 relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">10-Day Personalized Protocol</span>
              <h3 className="text-2xl font-extrabold mt-1">Ready to start your structured recovery?</h3>
              <p className="text-emerald-100 text-sm mt-1 max-w-lg">
                Access daily micro-tasks, guided reflection prompts, and expert recovery milestones built specifically for your assessment status.
              </p>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-2xl font-bold text-sm shadow-md transition-all shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-emerald-600" /> Start 10-Day Plan <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer Quick Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200/60">
          <button
            onClick={onRetake}
            className="flex items-center text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 mr-2" /> Take Assessment Again
          </button>

          <div className="flex items-center space-x-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1"><PhoneCall className="w-3.5 h-3.5 text-emerald-600" /> Confidential & Private</span>
            <span>•</span>
            <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-indigo-600" /> Clinical DASS-21 Standards</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResultView;
