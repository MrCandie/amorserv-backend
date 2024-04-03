import express from "express";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  getUser,
  editProfile,
} from "../controllers/auth-controller";
import { protect } from "../middleware/middleware";

const router = express.Router();

router.get("/me", protect, getUser);
router.patch("/me", protect, editProfile);
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
