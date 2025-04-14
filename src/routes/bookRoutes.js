import express from "express";
import {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getBook,
} from "../controllers/bookController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", protect, getBook);
router.post("/", protect, createBook);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

export default router;
