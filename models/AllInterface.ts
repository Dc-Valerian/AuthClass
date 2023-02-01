export interface userData{
    name:string;
    email:string;
    password:string;
    wishlist:{}[];
    product:{}[];
}


export interface productData{
    name:string;
    category:String;
    price:string;
    not_in_stock:boolean;
    purchased:boolean;
    wishlist:{}[]
}


export interface wishListData{
    name:string;
}