import AppError from "../utils/app-error";
import catchAsync from "../utils/catch-async";
import Book from "../models/book-model";
import { NextFunction, Response, Request } from "express";
import { AuthRequest } from "../constants/interface/authRequestInterface";
import uploadFile from "../utils/file-upload";

export const upload = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result: any = await uploadFile(req, "milk", next);

    if (!result) {
      return next(new AppError("Upload a valid file", 400));
    }

    return res.status(201).json({
      status: "Success",
      data: { url: result.secure_url, pages: result.pages },
    });
  }
);

export const createBook = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { name, category, url, cover_url, author } = req.body;

    if (!name || !category || !url || !cover_url || !author) {
      return next(new AppError("Incomplete book details", 400));
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

    const book = await Book.create(data);

    return res.status(200).json({
      status: "Success",
      data: book,
    });
  }
);

export const listBooks = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const list = await Book.find().select(
      "name author url cover_url category createdAt updatedAt"
    );

    return res.status(200).json({
      status: "Success",
      data: list,
    });
  }
);
