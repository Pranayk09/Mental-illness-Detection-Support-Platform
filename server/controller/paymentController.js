import Razorpay from "razorpay";
import dotenv from "dotenv";
import paymentModel from "../models/paymentModel.js";
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
export const createOrder = async (req, res) => {
  try {
    const { plan, amount } = req.body;
      const token = req.cookies?.token || req.headers?.token;
       if (!token) {
         return res.json({ success: false, message: "No token found in cookies" });
       }
       
   
       // ✅ Decode the token
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       const userId = decoded.id;

    if (!plan || !amount) {
      return res.json({ success: false, message: "Missing plan or amount" });
    }

    const options = {
      amount: amount * 100, // convert to paise
      currency: process.env.CURRENCY,
      receipt: `order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    await paymentModel.create({
      userId,
      plan,
      amount,
      currency: process.env.CURRENCY,
      orderId: order.id,
    });

    res.json({ success: true, order });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Verify payment
export const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, status } = req.body;
    const token = req.cookies?.token || req.headers?.token;

    if (!token) return res.json({ success: false, message: "Not Authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const payment = await paymentModel.findOne({ orderId });
    if (!payment) return res.json({ success: false, message: "Order not found" });

    // Update payment info
    payment.paymentId = paymentId;
    payment.status = status;
    await payment.save();

    // Update user plan
    const user = await userModel.findById(userId);
    if (user) {
      user.plan = payment.plan; // set user plan to purchased plan
      await user.save();
    }

    res.json({ success: true, message: "Payment verified and plan updated!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
