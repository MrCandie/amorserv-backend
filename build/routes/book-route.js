"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book-controller");
const middleware_1 = require("../middleware/middleware");
const router = express_1.default.Router();
// router.get("/", listCategories);
router.get("/", book_controller_1.listBooks);
router.post("/", middleware_1.protect, book_controller_1.createBook);
router.post("/upload-file", middleware_1.protect, book_controller_1.upload);
exports.default = router;
