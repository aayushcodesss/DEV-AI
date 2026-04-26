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

// Routes
app.use("/api", chatRoutes);

// ✅ DB + Server start together (best practice)
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database! ✅");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT} 🚀`);
    });

  } catch (err) {
    console.log("Failed to connect with DB ❌", err);
  }
};

startServer();