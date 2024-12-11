import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsInt()
  stock: number;
}
