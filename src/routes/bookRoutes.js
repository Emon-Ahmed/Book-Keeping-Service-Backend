import express from "express";
import {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getBook,
} from "../controllers/bookController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", protect, getBook);
router.post("/", protect, upload.single("image"), createBook);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

export default router;
