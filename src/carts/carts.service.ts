import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  ICart,
  ICreateCart,
  ICreateCartResponse,
} from 'src/database/carts/carts.interface';
import { CartRepository } from 'src/database/carts/carts.repository';
import { ProductsRepository } from 'src/database/products/products.repository';
import { UsersRepository } from 'src/database/users/users.repository';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productsRepository: ProductsRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  async addToCart(data: ICreateCart): Promise<ICreateCartResponse> {
    const { product_id, user_id, quantity } = data;

    const user = await this.userRepository.findUserById(user_id);
    if (!user) {
      throw new NotFoundException(`Product with ID ${user_id} not found`);
    }

    const product = await this.productsRepository.findProductById(product_id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${product_id} not found`);
    }

    if (product.stock < quantity) {
      throw new BadRequestException('Not enough stock available');
    }

    const existingCartItem = await this.cartRepository.findCartItem(
      user_id,
      product_id,
    );

    if (existingCartItem) {
      return this.updateCartItem(
        user_id,
        product_id,
        existingCartItem.quantity + quantity,
      );
    } else {
      await this.productsRepository.updateProductById(product_id, {
        stock: product.stock - quantity,
      });

      const cartItem = await this.cartRepository.addToCart(data);

      return {
        id: cartItem.id,
      };
    }
  }

  async updateCartItem(
    user_id: number,
    product_id: number,
    quantity: number,
  ): Promise<ICart> {
    const cartItem = await this.cartRepository.findCartItem(
      user_id,
      product_id,
    );
    if (!cartItem) {
      throw new NotFoundException(
        `Cart item with product ID ${product_id} not found`,
      );
    }

    const product = await this.productsRepository.findProductById(product_id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${product_id} not found`);
    }

    const quantityChange = quantity - cartItem.quantity;
    if (quantityChange > 0 && product.stock < quantityChange) {
      throw new BadRequestException('Not enough stock available');
    }

    await this.productsRepository.updateProductById(product_id, {
      stock: product.stock - quantityChange,
    });

    await this.cartRepository.updateCartItem({ user_id, product_id, quantity });

    return this.cartRepository.findCartItem(user_id, product_id);
  }

  async getCart(user_id: number): Promise<ICart[]> {
    return this.cartRepository.findCartByUserId(user_id);
  }

  async removeFromCart(user_id: number, product_id: number): Promise<void> {
    const cartItem = await this.cartRepository.findCartItem(
      user_id,
      product_id,
    );

    if (!cartItem) {
      throw new NotFoundException(
        `Cart item with product ID ${product_id} not found`,
      );
    }

    const product = await this.productsRepository.findProductById(product_id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${product_id} not found`);
    }

    await this.productsRepository.updateProductById(product_id, {
      stock: product.stock + cartItem.quantity,
    });

    await this.cartRepository.removeCartItem(user_id, product_id);
  }

  async clearCart(user_id: number): Promise<void> {
    await this.cartRepository.clearCart(user_id);
  }
}
