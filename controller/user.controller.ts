import UserModel from "../models/user.model";
import {NextFunction, Request,Response} from "express"
import bcrypt from "bcrypt"
import { asyncHandler } from "../utils/asyncHandler";
import {UserData} from "../interfaces/user.interface"
import { AppError, HttpCode } from "../utils/AppError";
import { userDataValidation } from "../utils/validation";



// Register A user
export const Register = asyncHandler(
    async (
        req:Request <{},{},UserData>,
        res:Response,
        next:NextFunction
        ):Promise<Response>=>
{

    const {email,fullname,password,stack,isAdmin}= req.body || {};

    const vslidation = userDataValidation(req.body)

    const salt:string = await bcrypt.genSalt(10)

    const salt1:string = await  bcrypt.genSalt(10)

    const hashedname = await bcrypt.hash(fullname,salt1)


    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await UserModel.create({
        email,password :hashedPassword,fullname:hashedname,stack,isAdmin
    })
    if (!user){
        next(
            new AppError({
                message:"Account Not Created",
                httpCode:HttpCode.BAD_REQUEST,
               
            })
        );
    } 
    
    return res.status(200).json({
        user,
    });
});

// FOR THE  LOGIN
export const login = asyncHandler(
    async(req:Request,res:Response,next:NextFunction):Promise<Response>=>{

    const {email,password}= req.body;

    if(!email) return res.status(401).json({
        status:"Please login with an email"
    })
    const user = await UserModel.findOne({email})

    if(!user)
    {
        next(
            new AppError({
                message:"User Not Found",
                httpCode:HttpCode.NOT_FOUND,
               
            })
        );
    };
    const checkPassword = await bcrypt.compare(password,user!.password)
    if(!checkPassword){
        next(
            new AppError({
                message:"Email or Pasword Not Found",
                httpCode:HttpCode.UNAUTHORIZED,
             
            })
        );
    }
    return res.status(200).json({
        message:`Welcome ${user!.fullname}`
      
    })
}

);



// TO GET ALL 
export const getUsers = asyncHandler(
    async(req:Request,res:Response,next:NextFunction):Promise<Response>=>{

        const user = await UserModel.find()
       next(
        new AppError({
            message:"Oops.....an error has occurred {Couldn't get all users}",
            httpCode:HttpCode.UNAUTHORIZED,
          
        })
       )
  return res.status(201).json({
            message:`successfully got all user ${user.length} user(s)`,
            data:user
        })
      
    }
)




// TO GET A SINGLE USER

export const singleUser = async (req:Request,res:Response):Promise<Response>=>{
try {
    const {fullname,email} =req.body
    const user = await UserModel.findOne({fullname,email})
    return res.status(202).json({
        message:`successfully got the single user ${user}`,
        data:user
    })
} catch (error) {
    return res.status(404).json({
        message:"couldn't get the single user",
        data:error
    })
}
}

// export const singleUser = async(req:Request,res:Response):Promise<Response>=>{
//     try {
        
//     } catch (error) {
//         return res.status(404).json({
//             message:"oops....an error occurred couldn't "
//         })
//     }
// }