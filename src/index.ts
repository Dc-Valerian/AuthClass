import express, { Application } from "express"
import appConfig from "./app";

import dbConnection from "../Config/db";

// NAMING OUR PORT NUMBER
const PORT:number = 5055;


// INITIALIZING OUR APP
const app:Application = express();

process.on("uncaughtException",(err:Error)=>{
    console.log("uncaughtException","server shutting down");
    console.log(err.name,err.message);
    process.exit(1);
})


appConfig(app)
dbConnection()



const server = app.listen(PORT,()=>{
console.log(`Server is listening to ${PORT}`);
});

process.on("unhandledRejection",(reason:any)=>{
    console.log("unhandledRejection","server is shutting down");
    console.log(reason.message,reason);
    server.close(()=>{
        process.exit(1)
    })
    
    
})