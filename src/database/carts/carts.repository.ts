import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './carts.model';
import {
  ICart,
  ICreateCart,
  ICreateCartResponse,
  IUpdateCart,
} from './carts.interface';
import { Product } from '../products/products.model';

@Injectable()
export class CartRepository {
  constructor(@InjectModel(Cart) private readonly cartModel: typeof Cart) {}

  async addToCart(data: ICreateCart): Promise<ICreateCartResponse> {
    return this.cartModel.create(data);
  }

  async findCartByUserId(user_id: number): Promise<ICart[]> {
    return this.cartModel.findAll({
      where: { user_id },
      include: [{ model: Product }],
    });
  }

  async findCartItem(
    user_id: number,
    product_id: number,
  ): Promise<ICart | null> {
    return this.cartModel.findOne({
      where: { user_id, product_id },
      include: { all: true },
    });
  }

  async updateCartItem(data: IUpdateCart): Promise<void> {
    const { quantity, user_id, product_id } = data;
    await this.cartModel.update(
      { quantity },
      { where: { user_id, product_id } },
    );
  }

  async removeCartItem(user_id: number, product_id: number): Promise<void> {
    await this.cartModel.destroy({ where: { user_id, product_id } });
  }

  async clearCart(user_id: number): Promise<void> {
    await this.cartModel.destroy({ where: { user_id } });
  }
}
