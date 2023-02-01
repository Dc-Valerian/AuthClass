import { Response, Request, NextFunction } from "express";
// import { IProduct } from "../interfaces/product.interface";
import UserModel from "../models/user.model";
import ProductModel from "../models/products.model";
import { AppError, HttpCode } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import { productData } from "../models/AllInterface";
import mongoose from "mongoose";



// TO GET ALL PRODUCTS
export const getProduct = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const product = await ProductModel.find().sort({createdAt:-1})
    if (!product)
      next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          isOperational: true,
          name: "Products not found",
          message:AppError.name,
        })
      );

    return res.status(HttpCode.OK).json({
      status: `Successfully got all ${product.length} products`,
      data: product,
    });
  }
);


// TO CREATE A PRODUCT
export const createProduct = asyncHandler(
  async (
    req: Request<{}, {}, productData>,
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
    const { name, price,  not_in_stock, category } = req.body;

    const product = await ProductModel.create({
      name,
       not_in_stock,
      category,
      price,
    
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


// TO ENTER A NEW PRODUCTS
export const getAllProducts = asyncHandler(
  async(
    req:Request,
    res:Response,
    next:NextFunction
  ):Promise<Response>=>{
    const {name,category,price,purchased,wishlist,not_in_stock} = req.body;

    const user = await UserModel.findById(req.params.userID)

    const newProducts = await ProductModel.create({
      name,category,price,purchased,wishlist,not_in_stock
    })
    await user?.product.push(new mongoose.Types.ObjectId(newProducts._id))

    user?.save();

    if(!newProducts){
      next(
        new AppError({
          message:"Unable to create the product",
          httpCode:HttpCode.BAD_REQUEST,
          isOperational:true,
          name:AppError.name
        })
      )
    }
   return res.status(200).json({
    message:"Successfully added more products",
    data:newProducts
   })
  }
)

// GET PRODUTS OF DIFFERENT CATEGORIES

export const getByCategory = asyncHandler(
  async(req:Request,res:Response,next:NextFunction):Promise<Response>=>{
    const {category} = req.body;

    const products = await ProductModel.findOne({category}).find();

    if(!products){
      next(
        new AppError({
          name:"Unable to find Product",
          httpCode:HttpCode.NOT_FOUND,
          message:AppError.name,
          isOperational:true,
        })
      )
    }
    return res.status(200).json({
      messgae:`Successfully got all ${products.length} products(s)`,
      data:products
    })
  }
)


// TO DELETE ALL PRODUCTS
// export const deleteAllProducts = asyncHandler(
//   async(req:Request,res:Response,next:NextFunction):Promise<Response>=>{
//     const deleteProducts = await ProductModel.deleteMany();

//     if(!deleteProducts){
//       next(
//         new AppError({
//           name:"unable to delete products",
//           httpCode:HttpCode.INTERNAL_SERVER_ERROR,
//         })
//       )
//     }
//   }
// )