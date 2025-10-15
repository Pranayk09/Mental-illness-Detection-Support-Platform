import express from "express";
import userAuth from "../Middleware/userAuth.js";
import { createOrder, verifyPayment } from "../controller/paymentController.js";


const paymentRouter = express.Router();

paymentRouter.post("/create-order", userAuth,createOrder );
paymentRouter.post("/verify-payment", userAuth, verifyPayment);

export default paymentRouter;
