import { Response, Request, NextFunction } from "express";
import { IProduct } from "../interfaces/product.interface";
import ProductModel from "../models/products.model";
import { AppError, HttpCode } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";

export const getProduct = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const product = await ProductModel.find();
    if (!product)
      next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          isOperational: true,
          message: "Products not found",
        })
      );

    return res.status(HttpCode.OK).json({
      status: "Success",
      data: product,
    });
  }
);

export const createProduct = asyncHandler(
  async (
    req: Request<{}, {}, IProduct>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    if (!req.body)
      next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          isOperational: true,
          message: "Enter valid inputs",
        })
      );
    const { name, price, no_In_Stock, category, shop } = req.body;

    const product = await ProductModel.create({
      name,
      no_In_Stock,
      category,
      price,
      shop,
    });
    if (!product)
      next(
        new AppError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          message: "Products not created",
          isOperational: true,
        })
      );

    return res.status(HttpCode.CREATED).json({
      status: "Success",
      data: product,
    });
  }
);
