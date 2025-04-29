const express = require("express");
const Task = require("../models/Task");
const router = express.Router();
const authMiddleware = require("../middleware/auth"); // Import middleware

// 🔒 Create a task (Protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const task = new Task({ title, description, status, priority, userId: req.user.id });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔒 Get tasks for logged-in user with filtering
router.get("/", authMiddleware, async (req, res) => {
  try {
    const statusFilter = req.query.status ? { status: req.query.status } : {};
    const tasks = await Task.find({ userId: req.user.id, ...statusFilter });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔒 Mark a task as complete
router.put("/:id/complete", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { status: "Complete" }, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔒 Delete a task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;