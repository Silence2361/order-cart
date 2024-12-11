import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model';
import { ICreateProduct, IProduct, IUpdateProduct } from './products.interface';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product,
  ) {}

  async createProduct(data: ICreateProduct): Promise<IProduct> {
    return this.productModel.create(data);
  }

  async findProducts(): Promise<IProduct[]> {
    return this.productModel.findAll();
  }

  async findProductById(productId: number): Promise<IProduct | null> {
    return this.productModel.findByPk(productId);
  }

  async findProductByName(name: string): Promise<IProduct | null> {
    return this.productModel.findOne({ where: { name } });
  }

  async updateProductById(
    productId: number,
    data: IUpdateProduct,
  ): Promise<void> {
    await this.productModel.update(data, { where: { id: productId } });
  }

  async deleteProductById(productId: number): Promise<void> {
    await this.productModel.destroy({ where: { id: productId } });
  }
}
