import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./Profile";
import TaskList from "./TaskList";
import ProgressBar from "./ProgressBar";
import { toast } from "react-toastify";

export default function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user profile and tasks on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Fetch user profile
        const profileRes = await axios.get("http://localhost:5000/api/dashboard/profile", {
          withCredentials: true, // to send cookies (token)
        });
         
        

        if (profileRes.data.success) {
          setProfile({
            ...profileRes.data.user,
            image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          });

          // ✅ Fetch today’s tasks
          const userId = profileRes.data.user._id || profileRes.data.userId;
          const tasksRes = await axios.get(`http://localhost:5000/api/dashboard/today/${userId}`, {
            withCredentials: true,
          });


          if (tasksRes.data && tasksRes.data.tasks) {
            const allTasks = tasksRes.data.tasks.map((t) => t.text);
            const doneTasks = tasksRes.data.tasks
              .filter((t) => t.completed)
              .map((t) => t.text);

            setTasks(allTasks);
            setCompleted(doneTasks);
          }
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Handle task toggle
 const toggleTask = async (task) => {
  try {
    const taskIndex = tasks.indexOf(task);

    // Update local state instantly
    setCompleted((prev) => {
      const updated = prev.includes(task)
        ? prev.filter((t) => t !== task)
        : [...prev, task];

      // ✅ Show motivational toast based on progress
      const completedCount = updated.length;

      if (!prev.includes(task)) { // only when marking complete, not unchecking
        switch (completedCount) {
          case 1:
            toast.success("🔥 Great start! You’re almost there!");
            break;
          case 2:
            toast("💪 Halfway done! Keep going!");
            break;
          case 3:
            toast("👏 Almost finished! Just one more to go!");
            break;
          case 4:
            toast.success("🎉 You’re done for today! Take a break!");
            break;
          default:
            break;
        }
      }

      return updated;
    });

    // Call backend to mark completion
    await axios.post(
      "http://localhost:5000/api/dashboard/complete",
      { userId: profile._id, taskIndex },
      { withCredentials: true }
    );
  } catch (err) {
    console.error("Error marking task complete:", err);
    toast.error("Something went wrong!");
  }
};

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!profile) return <div className="text-center mt-10">No profile data</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-start p-10">
      {/* Left Section */}
      <div className="w-full max-w-sm flex flex-col items-center space-y-4 mr-10">
        <Profile profile={profile} />
        <ProgressBar
          day={1}
          totalDays={10}
          completed={completed.length}
          totalTasks={tasks.length}
        />
      </div>

      {/* Right Section */}
      <div className="flex-1 max-w-lg">
        <TaskList tasks={tasks} completed={completed} toggleTask={toggleTask} />
      </div>
    </div>
  );
}
