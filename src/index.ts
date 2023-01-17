import express from "express";
import DBconnect from "../Config/db";
import cors from "cors";
import router from "../routes/user.route";


// Naming our Port 
const PORT = 5050;

// INITIALIZING DB CONNECTION
DBconnect()

// INSTANTIATING THE APPLICATION
const app = express();


// INSTANTIATING MIDDLEWARES
app.use(express.json())
app.use(cors())

// INSTANTIATING OUR ROUTES
app.use("/api/auth",router)


app.listen(PORT,()=>{
console.log(`Server is listening to ${PORT}`);

})


