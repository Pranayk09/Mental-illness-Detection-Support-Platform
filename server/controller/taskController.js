import userModel from "../models/userModel.js";
import taskTemplateModel from "../models/taskTemplateModel.js";
import userTaskProgressModel from "../models/userTaskProgressModel.js";
import taskData from "../Data/tasks.js";
import jwt from 'jsonwebtoken';

const unlockNextDayIfNeeded = async (user) => {
  const now = new Date();
  const progress = await userTaskProgressModel.findOne({
    userId: user._id,
    day: user.currentDay,
  });

  if (user.currentDay >= 10 && progress && progress.isCompleted) {
    user.assessmentLocked = false; // Unlock new test eligibility
    user.condition = "";
    user.currentDay = 1;
    await user.save();
    return;
  }

  if (
    user.lastTaskCompleted &&
    user.lastTaskUpdate &&
    now - new Date(user.lastTaskUpdate) >= 24 * 60 * 60 * 1000 &&
    user.currentDay < 10
  ) {
    user.currentDay += 1;
    user.lastTaskCompleted = false;
    user.lastTaskUpdate = now;
    await user.save();
    await createNewDayTasks(user);
  }
};

const createNewDayTasks = async (user) => {
  const newTemplate = await taskTemplateModel.findOne({
    condition: user.condition,
    day: user.currentDay
  });

  if (!newTemplate) return;

  await userTaskProgressModel.create({
    userId: user._id,
    day: user.currentDay,
    tasks: newTemplate.tasks.map(t => ({ text: t, completed: false })),
    isCompleted: false,
    dateAssigned: new Date()
  });
};

export const getTodayTasks = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await unlockNextDayIfNeeded(user);
    if (user.assessmentLocked) {
      let progress = await userTaskProgressModel.findOne({
        userId: user._id,
        day: user.currentDay
      });

      if (!progress && user.condition) {
        await createNewDayTasks(user);
        progress = await userTaskProgressModel.findOne({
          userId: user._id,
          day: user.currentDay
        });
      }

      const tasks = progress ? progress.tasks : [];
      return res.json({ day: progress?.day || user.currentDay, tasks });
    } else {
      return res.json({ day: user.currentDay, tasks: [] });
    }
  } catch (err) {
    console.error("Error in getTodayTasks:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const completeTask = async (req, res) => {
  try {
    const { taskIndex } = req.body;
    const token = req.cookies?.token || req.headers?.token;
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const progress = await userTaskProgressModel.findOne({
      userId: user._id,
      day: user.currentDay
    });

    if (!progress) return res.status(404).json({ message: "No active task progress found for today" });

    if (taskIndex < 0 || taskIndex >= progress.tasks.length) {
      return res.status(400).json({ message: "Invalid task index" });
    }

    progress.tasks[taskIndex].completed = !progress.tasks[taskIndex].completed;

    const allCompleted = progress.tasks.every(t => t.completed);
    progress.isCompleted = allCompleted;

    if (allCompleted) {
      user.lastTaskCompleted = true;
      user.lastTaskUpdate = new Date();
      await user.save();
    } else {
      user.lastTaskCompleted = false;
      await user.save();
    }

    await progress.save();
    res.json({ message: "Task status updated", tasks: progress.tasks, day: progress.day });
  } catch (err) {
    console.error("Error in completeTask:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const token = req.cookies?.token || req.headers?.token;
    if (!token) {
      return res.json({ success: false, message: "No token found in cookies" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await userModel.findById(userId).select("name age gender condition currentDay assessmentLocked plan planExpiresAt");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const hasCompleted = !!(user.assessmentLocked || (user.condition && user.condition.trim() !== ""));

    return res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        age: user.age,
        gender: user.gender,
        condition: user.condition,
        currentDay: user.currentDay,
        assessmentLocked: user.assessmentLocked,
        plan: user.plan || "Free",
        planExpiresAt: user.planExpiresAt,
        hasCompletedAssessment: hasCompleted
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Fast Unified Initializer Endpoint
export const getDashboardInit = async (req, res) => {
  try {
    const token = req.cookies?.token || req.headers?.token;
    if (!token) {
      return res.json({ success: false, message: "No token found in cookies" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    await unlockNextDayIfNeeded(user);

    const hasCompleted = !!(user.assessmentLocked || (user.condition && user.condition.trim() !== ""));

    let progress = null;
    if (hasCompleted) {
      progress = await userTaskProgressModel.findOne({
        userId: user._id,
        day: user.currentDay
      });

      if (!progress && user.condition) {
        await createNewDayTasks(user);
        progress = await userTaskProgressModel.findOne({
          userId: user._id,
          day: user.currentDay
        });
      }
    }

    const allTasks = progress?.tasks ? progress.tasks.map((t) => t.text) : [];
    const doneTasks = progress?.tasks
      ? progress.tasks.filter((t) => t.completed).map((t) => t.text)
      : [];

    return res.json({
      success: true,
      hasCompletedAssessment: hasCompleted,
      user: {
        _id: user._id,
        name: user.name,
        age: user.age,
        gender: user.gender,
        condition: user.condition,
        currentDay: user.currentDay,
        assessmentLocked: user.assessmentLocked,
        plan: user.plan || "Free",
        planExpiresAt: user.planExpiresAt,
        hasCompletedAssessment: hasCompleted
      },
      day: progress?.day || user.currentDay || 1,
      tasks: allTasks,
      completed: doneTasks,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const seedTasks = async (req, res) => {
  try {
    for (const condition in taskData) {
      for (const [dayKey, tasks] of Object.entries(taskData[condition])) {
        const dayNumber = parseInt(dayKey.replace("Day", ""));
        const exists = await taskTemplateModel.findOne({ condition, day: dayNumber });
        if (!exists) {
          await taskTemplateModel.create({ condition, day: dayNumber, tasks });
        }
      }
    }

    res.json({ message: "Task templates seeded successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error seeding tasks" });
  }
};
