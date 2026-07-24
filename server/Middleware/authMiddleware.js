import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import resourceModel from '../models/resourceModel.js';

// 1. Middleware: Verify JWT Authentication (401 Unauthorized if missing/invalid)
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in to access this feature.",
        code: "UNAUTHORIZED"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired session. Please log in again.",
        code: "INVALID_TOKEN"
      });
    }

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authenticated user profile not found.",
        code: "USER_NOT_FOUND"
      });
    }

    // Auto-check expired subscription
    if (user.plan !== "Free" && user.planExpiresAt && new Date(user.planExpiresAt) < new Date()) {
      user.plan = "Free";
      user.planExpiresAt = null;
      await user.save();
    }

    req.userId = user._id;
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Session verification failed: " + error.message,
      code: "AUTH_FAILED"
    });
  }
};

// 2. Middleware: Verify Active Premium Subscription (403 Forbidden if Free or Expired)
export const verifyPremium = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
        code: "UNAUTHORIZED"
      });
    }

    const isPremium = req.user.plan !== "Free";
    if (!isPremium) {
      return res.status(403).json({
        success: false,
        message: "Active Premium subscription required to access this resource.",
        code: "FORBIDDEN_PREMIUM_REQUIRED",
        locked: true
      });
    }

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Subscription validation failed: " + error.message
    });
  }
};

// 3. Middleware: Verify Resource Access Permission
export const verifyResourceAccess = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    if (!resourceId) return next();

    const resource = await resourceModel.findById(resourceId);
    if (!resource || !resource.isActive) {
      return res.status(404).json({ success: false, message: "Resource not found" });
    }

    req.resource = resource;

    // Crisis Support & Free resources are accessible to everyone
    if (resource.category === "Crisis Support" || !resource.isPremium) {
      return next();
    }

    // Premium resources require authentication & active subscription
    const token = req.cookies?.token || req.headers?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please log in to access this premium resource.",
        code: "UNAUTHORIZED"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User session not found.",
        code: "UNAUTHORIZED"
      });
    }

    // Auto-check expired subscription
    if (user.plan !== "Free" && user.planExpiresAt && new Date(user.planExpiresAt) < new Date()) {
      user.plan = "Free";
      user.planExpiresAt = null;
      await user.save();
    }

    if (user.plan === "Free") {
      return res.status(403).json({
        success: false,
        message: "Premium subscription required to access this resource.",
        code: "FORBIDDEN_PREMIUM_REQUIRED",
        locked: true
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Resource access verification error: " + error.message
    });
  }
};
