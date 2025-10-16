import mongoose from "mongoose";

const taskTemplateSchema = new mongoose.Schema({
  condition: { type: String, required: true },  // e.g. "Stress"
  day: { type: Number, required: true },         // e.g. Day 1 to Day 10
  tasks: [{ type: String, required: true }]      // e.g. ["Do breathing exercise", "Walk 10 mins"]
});

const taskTemplateModel = mongoose.models.TaskTemplate || mongoose.model("TaskTemplate", taskTemplateSchema);
export default taskTemplateModel;
