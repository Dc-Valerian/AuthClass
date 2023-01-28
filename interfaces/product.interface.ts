import { IShop } from "./shop.interface";

export interface IProduct {
  name: string;
  category: string;
  price: number;
  no_In_Stock: number;
  shop: IShop;
}
