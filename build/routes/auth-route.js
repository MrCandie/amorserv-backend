"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth-controller");
const middleware_1 = require("../middleware/middleware");
const router = express_1.default.Router();
router.get("/me", middleware_1.protect, auth_controller_1.getUser);
router.patch("/me", middleware_1.protect, auth_controller_1.editProfile);
router.post("/signup", auth_controller_1.signup);
router.post("/login", auth_controller_1.login);
router.post("/forgot-password", auth_controller_1.forgotPassword);
router.post("/reset-password", auth_controller_1.resetPassword);
exports.default = router;
