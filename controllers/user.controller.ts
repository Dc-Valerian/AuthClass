import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError, HttpCode } from "../utils/AppError";
import { IData } from "../interfaces/user.interface";

export const register = asyncHandler(
  async (
    req: Request<{}, {}, IData>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { name, email, password } = req.body;

    const salt: string = await bcrypt.genSalt(12);
    const hashed: string = await bcrypt.hash(password, salt);

    const user = await UserModel.create({ name, email, password: hashed });
    if (!user) {
      next(
        new AppError({
          message: "Account not Created",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );
    }
    return res.status(200).json({
      user,
    });
  }
);

export const login = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      next(
        new AppError({
          message: "User not found",
          httpCode: HttpCode.NOT_FOUND,
        })
      );
    }
    const checkpass = await bcrypt.compare(password, user!.password);
    if (!checkpass) {
      next(
        new AppError({
          message: "Email or password not correct",
          httpCode: HttpCode.UNAUTHORIZED,
        })
      );
    }

    return res.status(200).json({ message: `Welcome ${user!.name}` });
  }
);

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await UserModel.find();
    return res.status(200).json({
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
