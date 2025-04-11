import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 8000;
const app = express();

// Environment Variables SETUP
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
