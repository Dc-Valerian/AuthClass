import Joi from "joi"
import { login } from "../controller/user.controller"
import { UserData } from "../interfaces/user.interface"



export const userDataValidation = (user:UserData)=>{
    const userSchema= Joi.object({
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(8).max(36).required(),
        isAdmin:Joi.string(),
        stack:Joi.string()
    })

    return userSchema.validate(user)
}


export const loginValidation =(email:string,password:string)=>{
    const loginSchema = Joi.object({
          email:Joi.string().email().required(),
        password:Joi.string().min(8).max(36).required(),
    })

    return loginSchema.validate(login)
}