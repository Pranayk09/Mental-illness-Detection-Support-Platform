import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, default: "" },
  category: {
    type: String,
    required: true,
    enum: [
      "Featured Articles",
      "Guided Exercises",
      "Meditation & Breathing",
      "Anxiety Support",
      "Depression Recovery",
      "Stress Management",
      "Mindfulness",
      "Self-Care",
      "Sleep Improvement",
      "Emotional Wellness",
      "CBT Worksheets",
      "Videos",
      "Podcasts",
      "Crisis Support"
    ]
  },
  resourceType: {
    type: String,
    required: true,
    enum: ["article", "video", "exercise", "worksheet", "podcast", "crisis"]
  },
  thumbnailUrl: { type: String, default: "" },
  externalUrl: { type: String, default: "" },
  youtubeUrl: { type: String, default: "" },
  duration: { type: String, default: "5 min read" },
  difficulty: { type: String, default: "Beginner" },
  isPremium: { type: Boolean, default: false },
  rating: { type: Number, default: 4.8 },
  author: { type: String, default: "Nirvanic Clinical Team" },
  source: { type: String, default: "Nirvanic Health" },
  tags: [{ type: String }],
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const resourceModel = mongoose.models.Resource || mongoose.model("Resource", resourceSchema);
export default resourceModel;
