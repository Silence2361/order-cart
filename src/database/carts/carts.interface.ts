import { IProduct } from '../products/products.interface';
import { IUser } from '../users/users.interface';

export interface ICart {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  product?: IProduct;
  user?: IUser;
}

export interface ICreateCart {
  user_id: number;
  product_id: number;
  quantity: number;
}

export interface ICreateCartResponse {
  id: number;
}

export interface IUpdateCart {
  user_id?: number;
  product_id?: number;
  quantity?: number;
}
