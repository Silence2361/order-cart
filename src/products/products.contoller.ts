import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductResponseDto } from './dto/create-product-response.dto';
import { FindProductListResponseDto } from './dto/find-product-list-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(
    @Body() data: CreateProductDto,
  ): Promise<CreateProductResponseDto> {
    return this.productsService.createProduct(data);
  }

  @Get(':id')
  async findProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FindProductListResponseDto> {
    return this.productsService.findProductById(id);
  }

  @Get()
  async findAllProducts(): Promise<FindProductListResponseDto[]> {
    return this.productsService.findProducts();
  }

  @Put(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProductDto,
  ): Promise<void> {
    return this.productsService.updateProductById(id, data);
  }

  @Delete(':id')
  async deleteProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.productsService.deleteProductById(id);
  }
}
