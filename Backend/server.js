import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import authRoutes from './routes/auth.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import errorHandler from "./middleware/errorMiddleware.js";
import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();
app.use(express.json()); // Parse JSON requests

app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/profile", userRoutes);
app.use('/api/user', userRoutes);
app.use('/api/appointments', appointmentRoutes);

// Serve React frontend in production
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Database Connection
connectDB();

// Global Error Handler (must be the last middleware)
app.use(errorHandler);

// Server Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
