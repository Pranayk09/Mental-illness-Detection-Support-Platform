import express from "express";
import userAuth from "../Middleware/userAuth.js";
import {
  getTodayTasks,
  getUserProfile,
  completeTask,
  seedTasks,
  getDashboardInit
} from "../controller/taskController.js";

const taskRouter = express.Router();

taskRouter.get("/init", userAuth, getDashboardInit);
taskRouter.get("/today/:userId", userAuth, getTodayTasks);
taskRouter.post("/complete-task", userAuth, completeTask);
taskRouter.post("/complete", userAuth, completeTask);
taskRouter.post("/seed", seedTasks);
taskRouter.get('/profile', userAuth, getUserProfile);

export default taskRouter;