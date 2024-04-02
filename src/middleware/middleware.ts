import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catch-async";
import AppError from "../utils/app-error";
import jwt from "jsonwebtoken";
import User from "../models/user-model";
import { AuthRequest } from "../constants/interface/authRequestInterface";

// PROTECT ROUTE
export const protect = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("You are not logged in", 401));
    }

    let decoded: any;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
      // console.log(decoded);
    } catch (error) {
      return next(new AppError("Session expired", 401));
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError("user no longer exist", 404));
    }

    req.user = user;
    next();
  }
);
