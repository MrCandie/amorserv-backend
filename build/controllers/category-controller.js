"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCategories = exports.createCategory = void 0;
const app_error_1 = __importDefault(require("../utils/app-error"));
const catch_async_1 = __importDefault(require("../utils/catch-async"));
const category_model_1 = __importDefault(require("../models/category-model"));
exports.createCategory = (0, catch_async_1.default)(async (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return next(new app_error_1.default("Category must have a name", 400));
    }
    const data = {
        name,
        user: req.user.id,
        userId: req.user.id,
    };
    await category_model_1.default.create(data);
    return res.status(201).json({
        status: "Success",
        message: "New category created",
    });
});
exports.listCategories = (0, catch_async_1.default)(async (req, res, next) => {
    const list = await category_model_1.default.find().select("name");
    return res.status(200).json({
        status: "Success",
        data: list,
    });
});
