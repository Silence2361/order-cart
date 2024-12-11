import { Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from 'src/database/carts/carts.repository';
import { IOrder } from 'src/database/orders/orders.interface';
import { OrdersRepository } from 'src/database/orders/orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly cartRepository: CartRepository,
  ) {}

  async checkout(user_id: number): Promise<IOrder> {
    const cartItems = await this.cartRepository.findCartByUserId(user_id);

    if (cartItems.length === 0) {
      throw new NotFoundException('Cart is empty');
    }

    const total_price = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    const order = await this.ordersRepository.createOrder({
      user_id,
      total_price,
      status: 'pending',
    });

    await this.cartRepository.clearCart(user_id);

    return order;
  }

  async getOrdersByUser(user_id: number): Promise<IOrder[]> {
    const orders = await this.ordersRepository.findOrdersByUserId(user_id);
    if (orders.length === 0) {
      throw new NotFoundException('No orders found');
    }
    return orders;
  }
}
