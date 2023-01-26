import mongoose from "mongoose";

const DB_URL = "mongodb://0.0.0.0:27017/AuthClass"

const dbConnection = async():Promise<void>=>{
    try {
        const conn = await mongoose.connect(DB_URL)
        console.log(`DB is connectedto ${conn.connection.host}`);
        
    } catch (error) {
        console.log(error);
    }
}
export default dbConnection