export interface IProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

export interface ICreateProduct {
  name: string;
  price: number;
  category: string;
  stock: number;
}

export interface IProductResponse {
  id: number;
}

export interface IUpdateProduct {
  name?: string;
  price?: number;
  category?: string;
  stock?: number;
}
