import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.contoller';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
