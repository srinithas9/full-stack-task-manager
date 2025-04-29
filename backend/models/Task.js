const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["Incomplete", "Complete"], default: "Incomplete" },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Task", TaskSchema);