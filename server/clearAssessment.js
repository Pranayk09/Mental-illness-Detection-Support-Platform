import mongoose from "mongoose";
import dotenv from "dotenv";
import assessmentModel from "./models/assessmentModel.js"; // adjust path if different

dotenv.config(); // to load MONGO_URL from .env

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // Delete all data from assessment collection
    await assessmentModel.deleteMany({});
    console.log("🧹 All assessment data deleted successfully");

    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });