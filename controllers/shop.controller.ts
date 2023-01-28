import { Response, Request, NextFunction } from "express";
import { IShop } from "../interfaces/shop.interface";
import ShopModel from "../models/shop.model";
import { AppError, HttpCode } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";

export const getShop = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const shop = await ShopModel.find();
    if (!shop)
      next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          message: "Shop not found",
          isOperational: true,
        })
      );

    return res.status(HttpCode.OK).json({
      status: "Success",
      data: shop,
    });
  }
);

// export const createShop = asyncHandler(
//   async (
//     req: Request<{}, {}, IShop>,
//     res: Response,
//     next: NextFunction
//   ): Promise<Response> => {
//     if (req.body)
//       next(
//         new AppError({
//           httpCode: HttpCode.BAD_REQUEST,
//           isOperational: true,
//           message: "Enter values",
//         })
//       );
//     const { name, address, products } = req.body;
//     const shop = new ShopModel({
//       name,
//       address,
//       products,
//     });
//   }
// );
