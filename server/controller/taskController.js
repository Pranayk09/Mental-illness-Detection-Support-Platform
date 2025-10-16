import userModel from "../models/userModel.js";
import taskTemplateModel from "../models/taskTemplateModel.js";
import userTaskProgressModel from "../models/userTaskProgressModel.js";
import taskData from "../Data/tasks.js";
import jwt from 'jsonwebtoken'


const unlockNextDayIfNeeded = async (user) => {
  const now = new Date();


  
  if (user.currentDay >= 10 && progress.isCompleted) {
  user.assessmentLocked = false;   //  Unlock new test eligibility
  user.condition = null;
  user.currentDay = 0;
  await user.save();
  return 
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
  console.log("user condition", user.condition)
  console.log(" day", user.currentDay)
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
    if(user.assessmentLocked){
      
    const progress = await userTaskProgressModel.findOne({
      userId: user._id,
      day: user.currentDay
    });


    if (!progress) {
      // First-time user or missing progress entry
      await createNewDayTasks(user);
      const newProgress = await userTaskProgressModel.findOne({
        userId: user._id,
        day: user.currentDay
      });
      return res.json(newProgress);
    }

    res.json(progress);
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const markTaskComplete = async (req, res) => {
  try {
    const { userId, taskIndex } = req.body;
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const progress = await userTaskProgressModel.findOne({
      userId,
      day: user.currentDay
    });

    if (!progress) return res.status(404).json({ message: "No tasks found" });

    // Mark a specific task as completed
    progress.tasks[taskIndex].completed = true;

    // If all tasks are done → mark as complete for the day
    if (progress.tasks.every(t => t.completed)) {
      progress.isCompleted = true;
      user.lastTaskCompleted = true;
      user.lastTaskUpdate = new Date();
      await user.save();
      
    }

    await progress.save();

    res.json({ message: "Task updated successfully", progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};




export const getUserDetails = async (req, res) => {
  try {
    const token = req.cookies?.token || req.headers?.token;
    if (!token) {
      return res.json({ success: false, message: "No token found in cookies" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await userModel.findById(userId).select("name age gender condition");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      user: {
         _id: user._id,  
        name: user.name,
        age: user.age,
        gender: user.gender,
        condition: user.condition,
      },
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
        
        // Check if task already exists
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


