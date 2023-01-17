import UserModel from "../models/user.model";
import { Request,Response } from "express";


export const register =async (req:Request,res:Response):Promise<Response>=>{
//   TO GET ONE USER
    try {
    const {email,password,fullname,stack} = req.body
    const user = await UserModel.create({
        email,password,fullname,stack
    })
    return res.status(201).json({
        status:"success",
        data:user
    })
 } catch (error) {
    return res.status(404).json({
        message:"opps....an error just occured couldn't register  ",
        data:error
    })
 }   
}


export const login = async (req:Request,res:Response):Promise<Response>=>{
// TO SIGN IN
try {
    const {email,password,fullname} =req.body;
    // For wrong email input
    if(!email){
 return res.status(404).json({
            message:"Email not Found .....please enter an email",
        })    }
    const user =await UserModel.findOne({email});
    // If user not found

    if(!user){
        return res.status(404).json({
            message:"User not Found .....please Register",
        })
    }
    return res.status(202).json({
        status:"success",
        data:user
    })
} catch (error) {
    return res.status(401).json({
        message:"couldn't sign up in",
        data:error
    })
}
}
export const getUsers = async (req:Request,res:Response):Promise<Response>=>{
//  TO GET ALL USERS
    try {
        const users = await UserModel.find()
        return res.status(200).json({
            message:`${users.length}user(s)`,
            data:users,
        })
    } catch (error) {
        return res.status(401).json({
            message:"couldnt get all user",
            data:error
        })
    }
}