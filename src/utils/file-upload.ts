import { v2 as cloudinary } from "cloudinary";
import AppError from "./app-error";
import { NextFunction } from "express";

async function uploadFile(req: any, folder: string, next: NextFunction) {
  let result;
  console.log(req.files);
  if (req.files) {
    if (!req.files.image) {
      return next(new AppError("Upload a valid image", 400));
    }
    result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
      use_filename: true,
      folder: folder,
    });
  } else {
    result = "";
  }
  console.log(result);

  return result;
}

export default uploadFile;
