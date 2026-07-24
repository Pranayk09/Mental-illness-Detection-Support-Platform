import express from "express";
import { getSubscriptionStatus } from "../controller/subscriptionController.js";

const subscriptionRouter = express.Router();

subscriptionRouter.get("/status", getSubscriptionStatus);

export default subscriptionRouter;
