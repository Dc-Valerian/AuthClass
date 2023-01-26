import { Response,Request,NextFunction } from "express";

export const asyncHandler = (fn:any)=>{
    return (req:Request,res:Response,next:NextFunction)=>
    Promise.resolve(fn(req,res,next)).catch(next);
};


// RESLOVE OR REJECTION .....IT'S MORE LIKE THE TRY AND CATCH METHOD RESOLVE IS FOR THE TRY WHILE REJECTION IS THE CATCH