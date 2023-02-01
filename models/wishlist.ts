import mongoose, { Schema } from "mongoose";
import { type } from "os";
// import { wishListData } from "../interfaces/wishlistinterface";
import { wishListData } from "./AllInterface";

interface wishlist extends wishListData,mongoose.Document{};

const wishlistSchema = new Schema<wishListData>({
    name: {
      type: String,
      required: [true, "Please enter the Product  name"],
    },
},{timestamps:true})

const wishListmodel = mongoose.model<wishlist>("WishListCollections",wishlistSchema)

export default wishListmodel;