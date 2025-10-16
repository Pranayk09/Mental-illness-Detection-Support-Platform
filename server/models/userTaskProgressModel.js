import mongoose from "mongoose";

const userTaskProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  day: { type: Number, required: true },
  tasks: [
    {
      text: String,
      completed: { type: Boolean, default: false }
    }
  ],
  isCompleted: { type: Boolean, default: false },
  dateAssigned: { type: Date, default: Date.now }
});

const userTaskProgressModel = mongoose.models.UserTaskProgress || mongoose.model("UserTaskProgress", userTaskProgressSchema);
export default userTaskProgressModel;