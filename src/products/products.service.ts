import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ICreateProduct,
  IProduct,
  IProductResponse,
  IUpdateProduct,
} from 'src/database/products/products.interface';
import { ProductsRepository } from 'src/database/products/products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async createProduct(data: ICreateProduct): Promise<IProductResponse> {
    const { name } = data;

    const existingProduct =
      await this.productsRepository.findProductByName(name);

    if (existingProduct) {
      throw new ConflictException('Product already exists');
    }

    const product = await this.productsRepository.createProduct(data);
    return {
      id: product.id,
    };
  }

  async findProducts(): Promise<IProduct[]> {
    return this.productsRepository.findProducts();
  }

  async findProductById(productId: number): Promise<IProduct | null> {
    const product = await this.productsRepository.findProductById(productId);

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return product;
  }

  async updateProductById(
    productId: number,
    data: IUpdateProduct,
  ): Promise<void> {
    const product = await this.productsRepository.findProductById(productId);

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    await this.productsRepository.updateProductById(productId, data);
  }

  async deleteProductById(productId: number): Promise<void> {
    const product = await this.productsRepository.findProductById(productId);

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    await this.productsRepository.deleteProductById(productId);
  }
}
