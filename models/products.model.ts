import mongoose, { Schema, model, Document } from "mongoose";
// import { IProduct } from "../interfaces/product.interface";
import {productData} from "./AllInterface"

// interface ProductSchema extends IProduct, Document {}
interface product extends productData,mongoose.Document{}

const productSchema = new Schema<productData>(
  {
    name: {
      type: String,
      required:[true,"Please Enter the Product Name"],
    },
    category: {
      type: String,
      required: [true,"Please enter the product category........"],
    },
    price: {
      type: String,
      required:[true,"please enter the product price you wish to buy"],
    },
     not_in_stock: {
        type: Boolean,
        required: [true, "Is the product available"]
    },
    purchased: {
      type: Boolean,
      default:false,
    },
    wishlist:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"WishListCollections"
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ProductModel = model<product>("productsCollections", productSchema);
export default ProductModel;
