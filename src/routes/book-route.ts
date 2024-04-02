import express from "express";
import { upload, createBook, listBooks } from "../controllers/book-controller";
import { protect } from "../middleware/middleware";

const router = express.Router();

// router.get("/", listCategories);
router.get("/", listBooks);
router.post("/", protect, createBook);
router.post("/upload-file", protect, upload);

export default router;
