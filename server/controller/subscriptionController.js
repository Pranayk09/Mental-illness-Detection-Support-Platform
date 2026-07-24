import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const getSubscriptionStatus = async (req, res) => {
  try {
    const token = req.cookies?.token || req.headers?.token;
    if (!token) {
      return res.json({
        success: true,
        plan: "Free",
        isPremium: false,
        expiresAt: null,
        daysRemaining: 0
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return res.json({
        success: true,
        plan: "Free",
        isPremium: false,
        expiresAt: null,
        daysRemaining: 0
      });
    }

    const userId = decoded.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Auto-check and revoke expired subscription
    if (user.plan !== "Free" && user.planExpiresAt && new Date(user.planExpiresAt) < new Date()) {
      user.plan = "Free";
      user.planExpiresAt = null;
      await user.save();
    }

    const isPremium = user.plan !== "Free";
    let daysRemaining = 0;
    if (user.planExpiresAt) {
      const diffMs = new Date(user.planExpiresAt) - new Date();
      daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    }

    return res.json({
      success: true,
      plan: user.plan || "Free",
      isPremium,
      expiresAt: user.planExpiresAt,
      daysRemaining
    });
  } catch (error) {
    return res.json({
      success: true,
      plan: "Free",
      isPremium: false,
      expiresAt: null,
      daysRemaining: 0
    });
  }
};
