import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressHeader } from './ProgressHeader';
import { QuestionCard } from './QuestionCard';
import { ResultView } from './ResultView';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  Heart,
  Brain,
  Activity,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Calendar,
  Lock,
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const demographicQuestions = [
  { id: 1, text: 'Age', type: 'number' },
  { id: 2, text: 'Gender', type: 'radio', options: [{ label: 'Male', value: 1 }, { label: 'Female', value: 2 }] },
  { id: 3, text: 'Marital Status', type: 'radio', options: [{ label: 'Unmarried / Single', value: 0 }, { label: 'Married', value: 1 }] },
  {
    id: 4,
    text: 'Educational Level',
    type: 'select',
    options: [
      { label: 'Primary Education', value: 1 },
      { label: 'Secondary (SSC)', value: 2 },
      { label: 'Higher Secondary (HSC)', value: 3 },
      { label: 'Graduate Degree & Above', value: 4 },
      { label: 'Other', value: 5 },
    ],
  },
  {
    id: 5,
    text: 'Occupational Status',
    type: 'select',
    options: [
      { label: 'Homemaker / Housewife', value: 1 },
      { label: 'Service / Corporate', value: 2 },
      { label: 'Business / Entrepreneur', value: 3 },
      { label: 'Student', value: 4 },
      { label: 'Day Laborer', value: 5 },
      { label: 'Unemployed / Seeking Work', value: 6 },
    ],
  },
  {
    id: 6,
    text: 'Do you experience regular sleeping difficulties?',
    type: 'radio',
    options: [
      { label: 'No, generally sleep well', value: 0 },
      { label: 'Yes, frequent sleep disturbances', value: 1 },
    ],
  },
];

const dassOptions = [
  { label: 'Did not apply to me at all', value: 0 },
  { label: 'Applied to me to some degree, or some of the time', value: 1 },
  { label: 'Applied to me to a considerable degree or good part of time', value: 2 },
  { label: 'Applied to me very much or most of the time', value: 3 },
];

const dassQuestions = [
  // Stress (Q7..13)
  'I found it hard to wind down',
  'I was aware of dryness of my mouth',
  'I couldn’t seem to experience any positive feeling at all',
  'I experienced breathing difficulty (e.g. breathlessness in absence of physical exertion)',
  'I found it difficult to work up the initiative to do things',
  'I tended to over-react to situations',
  'I experienced trembling (e.g. in the hands)',
  
  // Anxiety (Q14..20)
  'I felt that I was using a lot of nervous energy',
  'I was worried about situations in which I might panic and make a fool of myself',
  'I felt that I had nothing to look forward to',
  'I found myself getting agitated',
  'I found it difficult to relax',
  'I felt down-hearted and blue',
  'I was intolerant of anything that kept me from getting on with what I was doing',
  
  // Depression (Q21..27)
  'I felt I was close to panic',
  'I was unable to become enthusiastic about anything',
  'I felt I wasn’t worth much as a person',
  'I felt that I was rather touchy',
  'I was aware of the action of my heart in the absence of physical exertion',
  'I felt scared without any good reason',
  'I felt that life was meaningless',
].map((text, i) => ({
  id: 7 + i,
  text,
  type: 'radio',
  options: dassOptions,
}));

const allQuestions = [...demographicQuestions, ...dassQuestions];

const SECTION_CONFIGS = [
  {
    startIndex: 0,
    endIndex: 5,
    title: 'Demographics & Background',
    icon: ShieldCheck,
    quote: 'Let’s start with a brief introduction to better understand your context.',
    color: 'from-emerald-50 to-teal-100',
  },
  {
    startIndex: 6,
    endIndex: 12,
    title: 'Stress & Tension Indicators',
    icon: Activity,
    quote: 'Take a deep breath. Reflect gently on your feelings over the past week.',
    color: 'from-teal-50 to-cyan-100',
  },
  {
    startIndex: 13,
    endIndex: 19,
    title: 'Anxiety & Somatic Awareness',
    icon: Heart,
    quote: 'You are doing great. Notice how your body & mind react to everyday moments.',
    color: 'from-indigo-50 to-blue-100',
  },
  {
    startIndex: 20,
    endIndex: 26,
    title: 'Mood & Emotional Well-being',
    icon: Brain,
    quote: 'Final section! Be completely candid—this space is non-judgmental & confidential.',
    color: 'from-purple-50 to-indigo-100',
  },
];

export const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStepText, setLoadingStepText] = useState('Analyzing responses...');
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [showTransition, setShowTransition] = useState(false);
  const [nextSectionIndex, setNextSectionIndex] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetting, setResetting] = useState(false);

  const { user, logIn, backendUrl, token, setShowLogin, fetchUserData } = useContext(AppContext);
  const navigate = useNavigate();

  // Fetch assessment & plan status from backend
  const checkAssessmentStatus = async () => {
    setCheckingStatus(true);
    try {
      const storedToken = localStorage.getItem("token") || token;
      if (!storedToken && !user) {
        toast.info('Please log in to access the assessment.', { toastId: 'auth-assessment' });
        setShowLogin(true);
        setCheckingStatus(false);
        return;
      }

      const res = await axios.get(`${backendUrl}/api/test/status`, {
        withCredentials: true,
        headers: { token: storedToken },
      });

      if (res.data) {
        setStatusData(res.data);
        if (res.data.assessmentLocked || res.data.completed) {
          setHasCompletedAssessment(true);
        } else {
          setHasCompletedAssessment(false);
        }
      }
    } catch (err) {
      console.error("Error checking status:", err);
    } finally {
      setCheckingStatus(false);
    }
  };

  useEffect(() => {
    checkAssessmentStatus();
  }, [user, logIn, backendUrl, token]);

  const handleResetAssessment = async () => {
    setResetting(true);
    try {
      const storedToken = localStorage.getItem("token") || token;
      const res = await axios.post(
        `${backendUrl}/api/test/reset`,
        {},
        {
          withCredentials: true,
          headers: { token: storedToken },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || 'Assessment reset successfully!', { toastId: 'reset-success' });
        setHasCompletedAssessment(false);
        setStatusData(null);
        setAnswers({});
        setCurrentQuestion(0);
        setShowResults(false);
        setShowResetConfirm(false);
      } else {
        toast.error(res.data.message || 'Failed to reset assessment.', { toastId: 'reset-err' });
      }
    } catch (err) {
      console.error("Reset error:", err);
      toast.error('Failed to reset assessment. Please try again.');
    } finally {
      setResetting(false);
    }
  };

  const currentSection = SECTION_CONFIGS.find(
    (sec) => currentQuestion >= sec.startIndex && currentQuestion <= sec.endIndex
  );

  const currentQ = allQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / allQuestions.length) * 100;
  const isAnswered = answers[currentQ.id] !== undefined && answers[currentQ.id] !== '';

  const handleAnswerChange = (value) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
  };

  const nextQuestion = () => {
    const nextQIndex = currentQuestion + 1;
    if (nextQIndex < allQuestions.length) {
      const targetSec = SECTION_CONFIGS.find(
        (sec) => sec.startIndex === nextQIndex
      );

      if (targetSec) {
        setNextSectionIndex(nextQIndex);
        setShowTransition(true);
        return;
      }
      setCurrentQuestion(nextQIndex);
    } else {
      submitAnswers();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const startNextSection = () => {
    if (nextSectionIndex !== null) {
      setCurrentQuestion(nextSectionIndex);
      setNextSectionIndex(null);
    }
    setShowTransition(false);
  };

  const submitAnswers = async () => {
    setLoading(true);
    setLoadingProgress(0);

    const steps = [
      { pct: 25, text: 'Analyzing response patterns...' },
      { pct: 55, text: 'Evaluating DASS-21 score subscales...' },
      { pct: 85, text: 'Running clinical decision matrix...' },
      { pct: 100, text: 'Generating personalized wellness report...' },
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setLoadingProgress(steps[stepIdx].pct);
        setLoadingStepText(steps[stepIdx].text);
        stepIdx++;
      } else {
        clearInterval(interval);
      }
    }, 550);

    try {
      const answerArray = allQuestions.map((q) => Number(answers[q.id] ?? 0));
      const storedToken = localStorage.getItem("token") || token;

      const response = await axios.post(
        `${backendUrl}/api/test/assessment`,
        { answers: answerArray },
        {
          withCredentials: true,
          headers: { token: storedToken },
        }
      );

      setTimeout(() => {
        clearInterval(interval);
        setLoadingProgress(100);
        if (response.data.success) {
          toast.success(response.data.message || "Assessment submitted successfully!", { toastId: 'assessment-success' });
          setResult({ ...response.data, answers: answerArray });
          setShowResults(true);
          setHasCompletedAssessment(true);
          if (fetchUserData) fetchUserData(storedToken);
        } else {
          toast.error(response.data.message || "Assessment submission failed", { toastId: 'assessment-exists' });
        }
        setLoading(false);
      }, 2500);

    } catch (error) {
      clearInterval(interval);
      toast.error('Failed to submit answers. Please try again.', { toastId: 'submit-error' });
      setLoading(false);
    }
  };

  if (checkingStatus) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-emerald-50/40 text-slate-700">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mb-4" />
        <p className="text-base font-semibold">Validating assessment status...</p>
      </div>
    );
  }

  const storedToken = localStorage.getItem("token") || token;
  if (!user && !storedToken) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-emerald-50/70 via-teal-50/30 to-indigo-50/60 p-6 text-center">
        <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-xl border border-white/60 max-w-md w-full text-center space-y-4">
          <ShieldCheck className="w-14 h-14 text-emerald-600 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-800">Authentication Required</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Please log in or create an account to start your clinical mental health assessment.
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Sign In / Register <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Radial Loading Overlay
  if (loading) {
    const strokeDashoffset = 283 - (283 * loadingProgress) / 100;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-emerald-100"
        >
          <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-slate-100"
                strokeWidth="8"
                fill="transparent"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-emerald-500"
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-extrabold text-slate-800">{loadingProgress}%</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Evaluating</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-2">Analyzing Responses</h3>
          <p className="text-sm font-medium text-emerald-700 animate-pulse h-6">
            {loadingStepText}
          </p>

          <div className="mt-6 flex justify-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping delay-150" />
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping delay-300" />
          </div>
        </motion.div>
      </div>
    );
  }

  if (showResults) {
    return (
      <ResultView
        result={result}
        onRetake={() => {
          setShowResults(false);
          setAnswers({});
          setCurrentQuestion(0);
          setResult(null);
        }}
      />
    );
  }

  // ACTIVE 10-DAY PLAN SCREEN (User has already taken test & has active plan)
  if (hasCompletedAssessment) {
    const currentDayVal = statusData?.currentDay || 1;
    const conditionVal = statusData?.condition || "Mindfulness & Mental Health Plan";
    const daysRemainingVal = statusData?.daysRemaining ?? (10 - currentDayVal + 1);
    const planProgressPct = Math.min(100, Math.round((currentDayVal / 10) * 100));

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50/60 via-teal-50/40 to-indigo-50/50 px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-emerald-100 max-w-xl w-full text-center relative overflow-hidden"
        >
          {/* Subtle Top Badge */}
          {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-6">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            Assessment Locked • Active 10-Day Plan
          </div> */}

          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-200/60 shadow-sm">
            <Calendar className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-3">
            Complete Your 10-Day Plan
          </h2>

          <p className="text-slate-600 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            You currently have an active <span className="font-bold text-emerald-700">{conditionVal}</span> program assigned based on your recent assessment. Please complete your 10-day recovery plan before taking a new assessment.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex flex-col items-center">
              <span className="text-xs text-slate-500 font-medium">Program</span>
              <span className="text-sm font-bold text-emerald-700 truncate max-w-[100px]">{conditionVal}</span>
            </div>
            <div className="flex flex-col items-center border-x border-slate-200 px-2">
              <span className="text-xs text-slate-500 font-medium">Current Milestone</span>
              <span className="text-sm font-bold text-slate-800">Day {currentDayVal} / 10</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-slate-500 font-medium">Remaining</span>
              <span className="text-sm font-bold text-indigo-600">{daysRemainingVal} Days</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 text-left">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>Recovery Journey Progress</span>
              <span>{planProgressPct}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${planProgressPct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
              />
            </div>
          </div>

          {/* Guidance Note */}
          <div className="bg-emerald-50/70 border border-emerald-200/60 p-4 rounded-2xl text-left flex items-start gap-3 mb-8">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-900 leading-relaxed font-medium">
              Completing daily tasks builds healthy mental habits and ensures accurate re-evaluation once your 10-day cycle finishes.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] cursor-pointer"
            >
              Go to Today's Tasks <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowResetConfirm(true)}
              className="py-3.5 px-5 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 rounded-2xl font-bold border border-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer text-xs"
            >
              <RotateCcw className="w-4 h-4" /> Reset Assessment
            </button>
          </div>

          {/* Reset Modal Confirmation */}
          <AnimatePresence>
            {showResetConfirm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 text-left"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 15 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Reset 10-Day Plan & Assessment?</h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-6">
                    This will clear your current assessment results and reset your 10-day recovery progress so you can take a fresh assessment. This action cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      disabled={resetting}
                      className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleResetAssessment}
                      disabled={resetting}
                      className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs shadow-md shadow-red-500/20 flex items-center justify-center gap-1 transition-all"
                    >
                      {resetting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Reset"}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  const upcomingSec = SECTION_CONFIGS.find((sec) => sec.startIndex === nextSectionIndex);

  return (
    <div className="min-h-screen py-10 bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-indigo-50/60 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Header */}
        <ProgressHeader
          progress={progress}
          step={currentQuestion + 1}
          total={allQuestions.length}
          category={currentSection?.title}
        />

        {/* Section Transition Modal */}
        <AnimatePresence>
          {showTransition && upcomingSec && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl border border-emerald-100 relative overflow-hidden"
              >
                <div className={`absolute -top-12 -left-12 w-32 h-32 rounded-full bg-gradient-to-br ${upcomingSec.color} blur-2xl opacity-60`} />
                <div className={`w-14 h-14 rounded-2xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center mx-auto mb-4 border border-emerald-200/60 shadow-xs`} >
                  <upcomingSec.icon className="w-7 h-7" />
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/50">
                  Next Stage
                </span>

                <h3 className="text-2xl font-bold text-slate-800 mt-3 mb-2">
                  {upcomingSec.title}
                </h3>
                <p className="text-sm text-slate-600 italic mb-6 max-w-md mx-auto">
                  "{upcomingSec.quote}"
                </p>

                <button
                  onClick={startNextSection}
                  className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01]"
                >
                  Continue Section <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Question Card */}
        <QuestionCard
          question={currentQ}
          answer={answers[currentQ.id]}
          onAnswerChange={handleAnswerChange}
          onNext={nextQuestion}
          onPrev={previousQuestion}
          isFirst={currentQuestion === 0}
          isLast={currentQuestion === allQuestions.length - 1}
          isAnswered={isAnswered}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Assessment;
