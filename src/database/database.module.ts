import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { Product } from './products/products.model';
import { Cart } from './carts/carts.model';
import { Order } from './orders/orders.model';
import { CartRepository } from './carts/carts.repository';
import { OrdersRepository } from './orders/orders.repository';
import { ProductsRepository } from './products/products.repository';
import { UsersRepository } from './users/users.repository';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([User, Product, Cart, Order])],
  providers: [
    UsersRepository,
    ProductsRepository,
    CartRepository,
    OrdersRepository,
  ],
  exports: [
    UsersRepository,
    ProductsRepository,
    CartRepository,
    OrdersRepository,
  ],
})
export class RepositoryModule {}
