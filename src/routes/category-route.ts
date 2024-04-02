import express from "express";
import {
  createCategory,
  listCategories,
} from "../controllers/category-controller";
import { protect } from "../middleware/middleware";

const router = express.Router();

router.get("/", listCategories);
router.post("/", protect, createCategory);

export default router;
