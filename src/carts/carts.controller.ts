import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ICart } from '../database/carts/carts.interface';
import { CartService } from './carts.service';
import { CreateCartResponseDto } from './dto/create-cart-response.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { FindCartListResponseDto } from './dto/find-cart-list-response.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('carts')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(@Body() data: CreateCartDto): Promise<CreateCartResponseDto> {
    return this.cartService.addToCart(data);
  }

  @Put(':product_id')
  async updateCartItem(
    @Param('product_id', ParseIntPipe) product_id: number,
    @Body() updateData: UpdateCartDto,
  ): Promise<ICart> {
    const { user_id, quantity } = updateData;

    return this.cartService.updateCartItem(user_id, product_id, quantity);
  }

  @Get(':user_id')
  async getCart(
    @Param('user_id', ParseIntPipe) user_id: number,
  ): Promise<FindCartListResponseDto[]> {
    return this.cartService.getCart(user_id);
  }

  @Delete(':product_id')
  async removeFromCart(
    @Param('product_id', ParseIntPipe) product_id: number,
    @Body('user_id', ParseIntPipe) user_id: number,
  ): Promise<void> {
    return this.cartService.removeFromCart(user_id, product_id);
  }

  @Delete('clear/:user_id')
  async clearCart(
    @Param('user_id', ParseIntPipe) user_id: number,
  ): Promise<void> {
    return this.cartService.clearCart(user_id);
  }
}
