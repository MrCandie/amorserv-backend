import express from "express";
import {
  upload,
  createBook,
  listBooks,
  listMyBooks,
  deleteBook,
  editBook,
} from "../controllers/book-controller";
import { protect } from "../middleware/middleware";

const router = express.Router();

// router.get("/", listCategories);
router.get("/", listBooks);
router.get("/me", protect, listMyBooks);
router.post("/", protect, createBook);
router.post("/upload-file", protect, upload);
router.patch("/:bookId", protect, editBook);
router.delete("/:bookId", protect, deleteBook);

export default router;
