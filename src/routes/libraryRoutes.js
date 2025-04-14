import express from "express";
import {
  getAllLibraries,
  getLibrary,
  createLibrary,
  updateLibrary,
  deleteLibrary,
  getLibraryInventory,
  addBookToInventory,
  removeBookFromInventory,
} from "../controllers/libraryController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getAllLibraries);
router.get("/:id", protect, getLibrary);
router.post("/", protect, createLibrary);
router.put("/:id", protect, updateLibrary);
router.delete("/:id", protect, deleteLibrary);
router.get("/:id/inventory", protect, getLibraryInventory);
router.post("/:id/inventory", protect, addBookToInventory);
router.delete("/:id/inventory/:bookId", protect, removeBookFromInventory);

export default router;
