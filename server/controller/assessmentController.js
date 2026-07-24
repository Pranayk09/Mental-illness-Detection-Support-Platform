import assessmentModel from "../models/assessmentModel.js";
import jwt from 'jsonwebtoken';
import axios from 'axios';
import userModel from "../models/userModel.js";
import userTaskProgressModel from "../models/userTaskProgressModel.js";
import taskTemplateModel from "../models/taskTemplateModel.js";
import taskData from "../Data/tasks.js";

export const submitAssessment = async (req, res) => {
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

    const { answers } = req.body;
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.json({ success: false, message: 'Answers array is required' });
    }

    const age = Number(answers[0]) || 25;
    const genderVal = Number(answers[1]) || 1;
    const maritalVal = Number(answers[2]) || 1;
    const eduVal = Number(answers[3]) || 1;
    const occVal = Number(answers[4]) || 1;
    const sleepVal = Number(answers[5]) || 1;
    const dassAnswers = answers.slice(6, 27).map(v => Number(v) || 0);

    const gender = genderVal === 1 ? "Male" : "Female";

    const mlAnswers = [
      age,
      ...dassAnswers,
      genderVal,
      maritalVal,
      eduVal,
      occVal,
      sleepVal
    ];

    const newAssessment = new assessmentModel({ userId, answers });
    const savedAssessment = await newAssessment.save();

    let normalizedCondition = "Stress";
    let severityResult = "Moderate";

    try {
      const mlResponse = await axios.post("http://127.0.0.1:5000/predict", { userId, answers: mlAnswers });
      const statusMap = {
        Stressed: "Stress",
        Anxious: "Anxiety",
        Depressed: "Depression",
      };
      const rawCondition = mlResponse.data.Mental_Health_Status;
      normalizedCondition = statusMap[rawCondition] || rawCondition || "Stress";
      severityResult = mlResponse.data.Severity || "Moderate";
    } catch (mlErr) {
      console.error("Flask ML Service note, fallback evaluation used:", mlErr.message);
    }

    savedAssessment.result = {
      condition: normalizedCondition,
      severity: severityResult,
    };
    await savedAssessment.save();

    // Update user record with locked state and day 1
    await userModel.findByIdAndUpdate(userId, {
      assessmentLocked: true,
      condition: normalizedCondition,
      currentDay: 1,
      lastTaskCompleted: false,
      lastTaskUpdate: null,
      age,
      gender
    });

    // Clear any stale task progress & initialize Day 1 tasks
    await userTaskProgressModel.deleteMany({ userId });

    const template = await taskTemplateModel.findOne({ condition: normalizedCondition, day: 1 });
    const tasksForDay1 = template?.tasks || taskData[normalizedCondition]?.Day1 || taskData["Stress"].Day1;

    await userTaskProgressModel.create({
      userId,
      day: 1,
      tasks: tasksForDay1.map(t => ({ text: t, completed: false })),
      isCompleted: false,
      dateAssigned: new Date()
    });

    return res.json({
      success: true,
      message: 'Assessment submitted & evaluated successfully',
      assessment: savedAssessment,
      condition: normalizedCondition,
      severity: severityResult
    });

  } catch (error) {
    console.error("Submit assessment error:", error);
    return res.json({ success: false, message: error.message });
  }
};

export const getAssessmentStatus = async (req, res) => {
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

    const existingAssessment = await assessmentModel.findOne({ userId }).sort({ createdAt: -1 });

    const isLocked = !!user.assessmentLocked;
    const currentDay = user.currentDay || 1;
    const condition = user.condition || existingAssessment?.result?.condition || "";

    return res.json({
      success: true,
      completed: !!existingAssessment || isLocked,
      assessmentLocked: isLocked,
      currentDay: currentDay,
      totalDays: 10,
      daysRemaining: Math.max(0, 10 - currentDay + 1),
      condition: condition,
      canRetake: !isLocked,
      lastAssessment: existingAssessment
        ? {
            condition: existingAssessment.result?.condition,
            severity: existingAssessment.result?.severity,
            createdAt: existingAssessment.createdAt,
          }
        : null,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const resetAssessment = async (req, res) => {
  try {
    const token = req.cookies?.token || req.headers?.token;
    if (!token) {
      return res.json({ success: false, message: "No token found in cookies" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    await userModel.findByIdAndUpdate(userId, {
      assessmentLocked: false,
      condition: "",
      currentDay: 1,
      lastTaskCompleted: false,
      lastTaskUpdate: null,
    });

    await assessmentModel.deleteMany({ userId });
    await userTaskProgressModel.deleteMany({ userId });

    return res.json({
      success: true,
      message: "Assessment & 10-day recovery plan reset successfully. You can now take a new assessment.",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};