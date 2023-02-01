import mongoose, { Schema, Document, model } from "mongoose";
// import { IData } from "../interfaces/user.interface";
import {userData} from "./AllInterface"
import isEmail from "validator/lib/isEmail";

// interface ISchema extends IData, Document {}
interface user extends userData,mongoose.Document{}

const userSchema = new Schema<userData>(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim:true
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
      lowercase: true,
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    wishlist:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"WishListCollections"
      }
    ],
    product:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"productsCollections"
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model<userData>("userCollections", userSchema);
export default UserModel;
