import mongoose,{Schema,model,Document} from "mongoose";


interface UserData{
    email:string;
    password:string;
    fullname:string;
    stack:string;
}

interface UserSchema extends UserData,Document{}

const userSchema = new Schema({
    email:{
        type:String,
        required:[true,"Please enter an email"],
        lowercase:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,"Please enter your Valid Password"],
        min:[6,"Please enter a password with 6 values"]
    },
    fullname:{
        type:String,
        required:[true,"Please enter your full name"]
    },
    stack:{
        type:String,
    }
},
{timestamps:true}
)

const UserModel = model<UserSchema>("User",userSchema)

export default UserModel;