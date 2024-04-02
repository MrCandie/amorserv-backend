"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category-controller");
const middleware_1 = require("../middleware/middleware");
const router = express_1.default.Router();
router.get("/", category_controller_1.listCategories);
router.post("/", middleware_1.protect, category_controller_1.createCategory);
exports.default = router;
