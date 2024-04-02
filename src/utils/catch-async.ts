import { NextFunction, Request, Response } from "express";
import AppError from "./app-error";

const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch((err: AppError) => next(err));
  };
};

export default catchAsync;
