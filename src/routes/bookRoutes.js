import express from "express";
import { createBook, getAllBooks } from "../controllers/bookController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// Get all books
router.get("/", getAllBooks);

// Create book
router.post("/", protect, createBook);

export default router;
