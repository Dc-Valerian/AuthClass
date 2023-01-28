import { IProduct } from "./product.interface";

export interface IShop {
  name: string;
  address: string;
  products: IProduct[];
}
