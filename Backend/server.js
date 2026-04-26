console.log("=== SERVER SCRIPT STARTING ===");
import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(cors());

// 🔥 Test route (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// Routes
app.use("/api", chatRoutes);

// 🔥 Start server ALWAYS
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT} 🚀`);
});

// 🔥 Connect DB separately (server block nahi hoga)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database! ✅");
  } catch (err) {
    console.log("Failed to connect with DB ❌", err);
  }
};

connectDB();