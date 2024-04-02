"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listBooks = exports.createBook = exports.upload = void 0;
const app_error_1 = __importDefault(require("../utils/app-error"));
const catch_async_1 = __importDefault(require("../utils/catch-async"));
const book_model_1 = __importDefault(require("../models/book-model"));
const file_upload_1 = __importDefault(require("../utils/file-upload"));
exports.upload = (0, catch_async_1.default)(async (req, res, next) => {
    const result = await (0, file_upload_1.default)(req, "milk", next);
    if (!result) {
        return next(new app_error_1.default("Upload a valid file", 400));
    }
    return res.status(201).json({
        status: "Success",
        data: result.secure_url,
    });
});
exports.createBook = (0, catch_async_1.default)(async (req, res, next) => {
    const { name, category, url, cover_url, author } = req.body;
    if (!name || !category || !url || !cover_url || !author) {
        return next(new app_error_1.default("Incomplete book details", 400));
    }
    const data = {
        name,
        category,
        url,
        cover_url,
        author,
        user: req.user.id,
        userId: req.user.id,
    };
    const book = await book_model_1.default.create(data);
    return res.status(200).json({
        status: "Success",
        data: book,
    });
});
exports.listBooks = (0, catch_async_1.default)(async (req, res, next) => {
    const list = await book_model_1.default.find().select("name author url cover_url category");
    return res.status(200).json({
        status: "Success",
        data: list,
    });
});
