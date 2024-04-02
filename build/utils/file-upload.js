"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const app_error_1 = __importDefault(require("./app-error"));
async function uploadFile(req, folder, next) {
    let result;
    console.log(req.files);
    if (req.files) {
        if (!req.files.image) {
            return next(new app_error_1.default("Upload a valid image", 400));
        }
        result = await cloudinary_1.v2.uploader.upload(req.files.image.tempFilePath, {
            use_filename: true,
            pages: true,
            folder: folder,
        });
    }
    else {
        result = "";
    }
    return result;
}
exports.default = uploadFile;
