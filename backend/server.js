require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB Connection Error:", error));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));