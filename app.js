import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import bookRoutes from "./src/routes/bookRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import libraryRoutes from "./src/routes/libraryRoutes.js";
import borrowRoutes from "./src/routes/borrowRoutes.js";

const PORT = process.env.PORT || 8000;
const app = express();

// Environment Variables SETUP
dotenv.config();

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
app.use("/api/library", libraryRoutes);

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
