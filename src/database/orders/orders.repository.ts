import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './orders.model';
import { ICreateOrder, IOrder } from './orders.interface';

@Injectable()
export class OrdersRepository {
  constructor(@InjectModel(Order) private readonly orderModel: typeof Order) {}

  async createOrder(data: ICreateOrder): Promise<IOrder> {
    return this.orderModel.create(data);
  }

  async findOrdersByUserId(user_id: number): Promise<IOrder[]> {
    return this.orderModel.findAll({ where: { user_id } });
  }
}
