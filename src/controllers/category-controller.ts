import AppError from "../utils/app-error";
import catchAsync from "../utils/catch-async";
import Category from "../models/category-model";
import { NextFunction, Response } from "express";
import { AuthRequest } from "../constants/interface/authRequestInterface";

export const createCategory = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { name } = req.body;
    if (!name) {
      return next(new AppError("Category must have a name", 400));
    }

    const data = {
      name,
      user: req.user.id,
      userId: req.user.id,
    };

    await Category.create(data);

    return res.status(201).json({
      status: "Success",
      message: "New category created",
    });
  }
);

export const listCategories = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const list = await Category.find().select("name");

    return res.status(200).json({
      status: "Success",
      data: list,
    });
  }
);
