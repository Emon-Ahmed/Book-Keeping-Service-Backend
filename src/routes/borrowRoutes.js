import express from "express";
import { borrowBook, returnBook } from "../controllers/borrowController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, borrowBook);
router.put("/return/:id", protect, returnBook);

export default router;
