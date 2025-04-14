import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import bookRoutes from "./src/routes/bookRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import libraryRoutes from "./src/routes/libraryRoutes.js";
import borrowRoutes from "./src/routes/borrowRoutes.js";
import { I18n } from "i18n";
import path from "path";
import { fileURLToPath } from "url";
import "./src/config/cloudinary.js";

const PORT = process.env.PORT || 8000;
const app = express();

// Environment Variables SETUP
dotenv.config();

// Database Connection
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// i18n Setup
const i18n = new I18n({
  locales: ["en", "hi"],
  directory: path.join(__dirname, "src/translation"),
  defaultLocale: "en",
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(i18n.init);

// Routes
app.use("/api/users", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
app.use("/api/library", libraryRoutes);

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
