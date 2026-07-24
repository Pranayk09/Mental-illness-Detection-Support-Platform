import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Profile from "./Profile";
import TaskList from "./TaskList";
import ProgressBar from "./ProgressBar";
import PreAssessmentDashboard from "./PreAssessmentDashboard";
import {
  CelebratoryBanner,
  MoodCheckIn,
  WeeklyProgressChart,
  DailyWellnessTip
} from "./WellnessWidgets";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";
import { ClipboardList, Sparkles, ArrowRight, ShieldCheck, Heart, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Skeleton Loader for Dashboard while user & tasks are loading
const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/60 via-teal-50/30 to-indigo-50/60 p-4 sm:p-6 lg:p-8 space-y-8 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Skeleton */}
        <div className="h-44 bg-white/70 rounded-3xl border border-slate-200/80 shadow-md" />

        {/* Progress Bar Skeleton */}
        <div className="h-32 bg-white/70 rounded-3xl border border-slate-200/80 shadow-md" />

        {/* Task Cards Skeleton Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-8 w-48 bg-slate-200/80 rounded-xl" />
            <div className="h-28 bg-white/70 rounded-2xl border border-slate-200/80" />
            <div className="h-28 bg-white/70 rounded-2xl border border-slate-200/80" />
            <div className="h-28 bg-white/70 rounded-2xl border border-slate-200/80" />
          </div>

          <div className="space-y-6">
            <div className="h-48 bg-white/70 rounded-3xl border border-slate-200/80" />
            <div className="h-56 bg-white/70 rounded-3xl border border-slate-200/80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const { backendUrl, token, user, setShowLogin, loadingUser } = useContext(AppContext);
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);

  // Fetch user profile and tasks on mount (Backend-driven)
  useEffect(() => {
    const storedToken = localStorage.getItem("token") || token;
    if (!storedToken || (!user && !loadingUser)) {
      setProfile(null);
      setTasks([]);
      setCompleted([]);
      setHasCompletedAssessment(false);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fast single roundtrip init request
        const initRes = await axios.get(`${backendUrl}/api/dashboard/init`, {
          withCredentials: true,
          headers: { token: storedToken },
        });

        if (initRes.data && initRes.data.success && initRes.data.user) {
          const userObj = initRes.data.user;
          const isCompleted = !!(
            initRes.data.hasCompletedAssessment ||
            userObj.hasCompletedAssessment ||
            userObj.assessmentLocked ||
            (userObj.condition && userObj.condition.trim() !== "")
          );

          setProfile({
            ...userObj,
            image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          });
          setHasCompletedAssessment(isCompleted);
          setCurrentDay(initRes.data.day || userObj.currentDay || 1);
          setTasks(initRes.data.tasks || []);
          setCompleted(initRes.data.completed || []);
        } else {
          // Fallback if init endpoint unavailable
          const profileRes = await axios.get(`${backendUrl}/api/dashboard/profile`, {
            withCredentials: true,
            headers: { token: storedToken },
          });

          if (profileRes.data && profileRes.data.success && profileRes.data.user) {
            const userObj = profileRes.data.user;
            const isCompleted = !!(
              profileRes.data.user.hasCompletedAssessment ||
              userObj.assessmentLocked ||
              (userObj.condition && userObj.condition.trim() !== "")
            );

            setProfile({
              ...userObj,
              image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            });
            setHasCompletedAssessment(isCompleted);
            setCurrentDay(userObj.currentDay || 1);

            if (isCompleted) {
              const userId = userObj._id || userObj.userId;
              if (userId) {
                const tasksRes = await axios.get(`${backendUrl}/api/dashboard/today/${userId}`, {
                  withCredentials: true,
                  headers: { token: storedToken },
                });

                if (tasksRes.data) {
                  if (tasksRes.data.day) setCurrentDay(tasksRes.data.day);
                  if (tasksRes.data.tasks) {
                    setTasks(tasksRes.data.tasks.map((t) => t.text));
                    setCompleted(tasksRes.data.tasks.filter((t) => t.completed).map((t) => t.text));
                  }
                }
              }
            }
          }
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (storedToken) {
      fetchData();
    }
  }, [backendUrl, token, user, loadingUser]);

  // Handle task toggle for post-assessment dashboard
  const toggleTask = async (task) => {
    try {
      const taskIndex = tasks.indexOf(task);
      const storedToken = localStorage.getItem("token") || token;

      // Update local state instantly
      setCompleted((prev) => {
        const updated = prev.includes(task)
          ? prev.filter((t) => t !== task)
          : [...prev, task];

        const completedCount = updated.length;

        if (!prev.includes(task)) {
          switch (completedCount) {
            case 1:
              toast.success("🔥 Great start! You’re almost there!");
              break;
            case 2:
              toast.success("💪 Halfway done! Keep the momentum going!");
              break;
            case 3:
              toast.success("🎉 Outstanding! You completed all tasks for today!");
              break;
            default:
              toast.success("Task completed!");
          }
        }

        return updated;
      });

      // Sync backend task completion
      await axios.post(
        `${backendUrl}/api/dashboard/complete-task`,
        { taskIndex },
        {
          withCredentials: true,
          headers: { token: storedToken },
        }
      );
    } catch (error) {
      console.error("Task toggle sync error:", error);
      toast.error("Failed to sync task with server");
    }
  };

  // 1. Loading Skeleton State
  if (loading || loadingUser) {
    return <DashboardSkeleton />;
  }

  // 2. Unauthenticated Guard
  const storedToken = localStorage.getItem("token") || token;
  if (!storedToken || !user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-emerald-50/70 via-teal-50/30 to-indigo-50/60 text-slate-700 p-6 text-center">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-xl border border-white/60 max-w-md w-full text-center space-y-4"
        >
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <ClipboardList className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Authentication Required</h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Please sign in or create an account to access your personal dashboard and 10-day recovery program.
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer transform active:scale-98"
          >
            Sign In / Register <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    );
  }

  const activeUser = profile || user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/60 via-teal-50/30 via-sky-50/30 to-indigo-50/60 text-slate-800 font-sans pb-16">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* 🌟 CONDITIONALLY RENDER PRE-ASSESSMENT VS POST-ASSESSMENT DASHBOARD */}
        {!hasCompletedAssessment ? (
          <PreAssessmentDashboard user={activeUser} />
        ) : (
          <div className="space-y-8">
            {/* Top Banner Celebration when all daily tasks complete */}
            <AnimatePresence>
              {tasks.length > 0 && completed.length === tasks.length && (
                <CelebratoryBanner />
              )}
            </AnimatePresence>

            {/* HERO PROFILE SECTION */}
            <Profile profile={activeUser} user={user} />

            {/* HORIZONTAL PROGRESS BAR & STATS ROW */}
            <ProgressBar
              completed={completed.length}
              total={tasks.length}
              currentDay={currentDay}
            />

            {/* MAIN CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left 2 Columns: Daily Tasks */}
              <div className="lg:col-span-2 space-y-6">
                <TaskList
                  tasks={tasks}
                  completed={completed}
                  toggleTask={toggleTask}
                  currentDay={currentDay}
                />
              </div>

              {/* Right Column: Wellness Widgets & Mood Tracker */}
              <div className="space-y-6">
                <MoodCheckIn />
                <WeeklyProgressChart completedCount={completed.length} />
                <DailyWellnessTip />
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
