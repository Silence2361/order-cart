export interface IOrder {
  id: number;
  total_price: number;
  user_id: number;
  status: string;
}

export interface ICreateOrder {
  total_price: number;
  user_id: number;
  status: string;
}
