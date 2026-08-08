import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    const db = await mongoose.connect(`${process.env.MONGODB_URI}/mental-health-platform`);
    isConnected = db.connections[0].readyState >= 1;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

export default connectDB;