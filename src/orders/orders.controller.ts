import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderResponseDto } from './dto/order-response.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout/:user_id')
  async checkout(
    @Param('user_id', ParseIntPipe) user_id: number,
  ): Promise<OrderResponseDto> {
    return this.ordersService.checkout(user_id);
  }

  @Get(':user_id')
  async getOrdersByUser(
    @Param('user_id', ParseIntPipe) user_id: number,
  ): Promise<OrderResponseDto[]> {
    return this.ordersService.getOrdersByUser(user_id);
  }
}
