import express from "express";
import userAuth from "../Middleware/userAuth.js";
import { getTodayTasks, getUserDetails, markTaskComplete, seedTasks } from "../controller/taskController.js";



const taskRouter = express.Router();

taskRouter.get("/today/:userId", userAuth, getTodayTasks);
taskRouter.post("/complete", userAuth, markTaskComplete);
taskRouter.post("/seed", seedTasks);
taskRouter.get('/profile',userAuth, getUserDetails );

export default taskRouter;