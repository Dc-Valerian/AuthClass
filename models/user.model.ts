import mongoose,{Document, model, Schema} from "mongoose";
import isEmail from "validator/lib/isEmail";

interface UserData{
    fullname:string;
    email:string;
    password:string;
    stack:string;
    isAdmin:Boolean;
}

interface DataSchema extends UserData ,Document{}

const userSchema = new Schema({
    fullname:{
        type:String,
        required:[true,"Please Enter your fullname"],
    },
    email:{
        type:String,
        required:[true,"Please Enter your email"],
        unique:true,
        lowercase:true,
        trim:true,
        validate:[isEmail,"Please Enter a Valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minlength:6,
    },
    stack:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
},{timestamps:true,
versionKey:false,
})


const UserModel =model<DataSchema>("User",userSchema)

export default UserModel;