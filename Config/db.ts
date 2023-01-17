// import mongoose from "mongoose"

// const DB:string ="mongodb://0.0.0.0:27017/AuthClass"

// mongoose.connect(DB).then(()=>{
//     console.log(`DB connected`);
// }).catch(()=>{
//     `Unable to connect to database`
// })

// export default async function DBconnect(){
//     try {
//         const myConnection = await mongoose.connect(DB);
//         console.log(`DB is connected to ${myConnection.connection.host}`);
        
//     } catch (error) {
//         console.log("Unable to connect to database");
        
//     }
// }



// import mongoose from "mongoose";


// const DB:string = "mongodb://0.0.0.0:27017/AuthClass";

// export default async function DBconnect (){
//     try {
//         const DbConnection = await mongoose.connect(DB)
//         console.log(`Database is connected to ${DbConnection.connection.host}`);
//     } catch (error) {
//         console.log(`Unable to connect to Database`);
        
//     }
// }


// import mongoose from "mongoose";

// const DB :string = "mongodb://0.0.0.0:27017/AuthClass";

// export default async function DBconnect (){
//     try {
//         const myConnection = await mongoose.connect(DB);
//         console.log("DataBase is connected successfully");
        
//     } catch (error) {
//         console.log("Unable to connect to database");
        
//     }
// }


import mongoose from "mongoose";

const DB:string = "mongodb://0.0.0.0:27017/Authclass"

export default async function DBconnect(){
    try {
        const myConnection = await mongoose.connect(DB)
        console.log("Database is connected successfully");
        
    } catch (error) {
        console.log("unable to connect to database");
    }
}