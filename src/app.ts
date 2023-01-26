import express,{Application,Request,Response,NextFunction} from "express";
import cors from "cors"
import router from "../routes/user.route";
import morgan from "morgan";
import { errorHandler } from "../middleWares/errorhandler";
import { AppError, HttpCode } from "../utils/AppError";


export default function appConfig(app:Application){
    // INITIALIZING OUR MIDDLEWARES
    app.use(express.json()).use(cors()).use(morgan("dev"))

    // ROUTES
    app.use("/api/auth",router)

    app.all("*",(req:Request,res:Response,next:NextFunction)=>{
        next(
            new AppError({
                message:`This Route ${req.originalUrl} does not exist`,
                httpCode:HttpCode.NOT_FOUND,
                isOperational:true,
            })
        )
    })


    // ERROR HABDLER SHOULD BE THE LAST THING IN YOUR APP
    app.use(errorHandler)
}