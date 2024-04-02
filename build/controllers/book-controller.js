"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editBook = exports.deleteBook = exports.listMyBooks = exports.listBooks = exports.createBook = exports.upload = void 0;
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
        data: { url: result.secure_url, pages: result.pages },
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
    const list = await book_model_1.default.find().select("name author url cover_url category createdAt updatedAt");
    return res.status(200).json({
        status: "Success",
        data: list,
    });
});
exports.listMyBooks = (0, catch_async_1.default)(async (req, res, next) => {
    const list = await book_model_1.default.find({ userId: req.user.id }).select("name author url cover_url category createdAt updatedAt status");
    return res.status(200).json({
        status: "Success",
        data: list,
    });
});
exports.deleteBook = (0, catch_async_1.default)(async (req, res, next) => {
    const { bookId } = req.params;
    const book = await book_model_1.default.findById(bookId);
    if (!book) {
        return next(new app_error_1.default("Book not found", 404));
    }
    if (book.userId !== req.user.id) {
        return next(new app_error_1.default("Unauthorized", 401));
    }
    await book_model_1.default.findByIdAndDelete(bookId);
    return res.status(204).json({
        status: "Success",
        data: null,
    });
});
exports.editBook = (0, catch_async_1.default)(async (req, res, next) => {
    const { bookId } = req.params;
    const { name, author, category } = req.body;
    const book = await book_model_1.default.findById(bookId);
    if (!book) {
        return next(new app_error_1.default("Book not found", 404));
    }
    if (book.userId !== req.user.id) {
        return next(new app_error_1.default("Unauthorized", 401));
    }
    const updated = await book_model_1.default.findByIdAndUpdate(bookId, { name, author, category }, {
        runValidators: true,
        new: true,
    });
    return res.status(200).json({
        status: "Success",
        data: updated,
    });
});
